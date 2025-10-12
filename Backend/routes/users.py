"""
Users routes - CRUD operations for users table
Authorization: Admin/Owner access only for all operations
"""
from flask import Blueprint, request, g
from database import get_supabase_client
from middleware.auth import require_admin, require_owner
from utils.responses import (
    success_response, error_response, created_response,
    not_found_response, bad_request_response, server_error_response
)
from utils.validators import validate_required_fields, validate_email

users_bp = Blueprint('users', __name__)


@users_bp.route('', methods=['GET'])
@require_admin
def get_users():
    """
    Get all users
    Authorization: Admin or Owner only
    """
    try:
        supabase = get_supabase_client()
        response = supabase.table('users').select('*').execute()

        return success_response(data=response.data)

    except Exception as e:
        return server_error_response(f"Failed to fetch users: {str(e)}")


@users_bp.route('/<uid>', methods=['GET'])
@require_admin
def get_user(uid):
    """
    Get a specific user by UID
    Authorization: Admin or Owner only
    """
    try:
        supabase = get_supabase_client()
        response = supabase.table('users').select('*').eq('uid', uid).execute()

        if not response.data or len(response.data) == 0:
            return not_found_response("User not found")

        return success_response(data=response.data[0])

    except Exception as e:
        return server_error_response(f"Failed to fetch user: {str(e)}")


@users_bp.route('', methods=['POST'])
@require_admin
def create_user():
    """
    Create a new user
    Authorization: Admin or Owner only

    Required fields: username, email
    Optional fields: role, is_admin, is_owner, status
    """
    try:
        data = request.get_json()

        # Validate required fields
        is_valid, error_msg = validate_required_fields(data, ['username', 'email'])
        if not is_valid:
            return bad_request_response(error_msg)

        # Validate email format
        if not validate_email(data['email']):
            return bad_request_response("Invalid email format")

        # Set defaults
        user_data = {
            'username': data['username'],
            'email': data['email'],
            'role': data.get('role', 'member'),
            'is_admin': data.get('is_admin', False),
            'is_owner': data.get('is_owner', False),
            'status': data.get('status', 'active'),
            'email_verified': data.get('email_verified', False)
        }

        # Note: uid should be handled by Supabase Auth
        # This endpoint is for creating user records after Auth user is created
        if 'uid' in data:
            user_data['uid'] = data['uid']

        supabase = get_supabase_client()
        response = supabase.table('users').insert(user_data).execute()

        if not response.data:
            return error_response("Failed to create user", status_code=500)

        return created_response(data=response.data[0], message="User created successfully")

    except Exception as e:
        return server_error_response(f"Failed to create user: {str(e)}")


@users_bp.route('/<uid>', methods=['PUT', 'PATCH'])
@require_owner
def update_user(uid):
    """
    Update a user
    Authorization: Owner only (for role changes)
    Users can update their own profile (handled by separate endpoint if needed)

    Updatable fields: username, email, role, is_admin, is_owner, status, email_verified
    """
    try:
        data = request.get_json()

        if not data:
            return bad_request_response("No data provided")

        # Build update data
        update_data = {}
        allowed_fields = ['username', 'email', 'role', 'is_admin', 'is_owner', 'status', 'email_verified']

        for field in allowed_fields:
            if field in data:
                update_data[field] = data[field]

        if not update_data:
            return bad_request_response("No valid fields to update")

        # Validate email if provided
        if 'email' in update_data and not validate_email(update_data['email']):
            return bad_request_response("Invalid email format")

        supabase = get_supabase_client()

        # Check if user exists
        check_response = supabase.table('users').select('uid').eq('uid', uid).execute()
        if not check_response.data or len(check_response.data) == 0:
            return not_found_response("User not found")

        # Update user
        response = supabase.table('users').update(update_data).eq('uid', uid).execute()

        if not response.data:
            return error_response("Failed to update user", status_code=500)

        return success_response(data=response.data[0], message="User updated successfully")

    except Exception as e:
        return server_error_response(f"Failed to update user: {str(e)}")


@users_bp.route('/<uid>', methods=['DELETE'])
@require_owner
def delete_user(uid):
    """
    Delete a user
    Authorization: Owner only
    """
    try:
        supabase = get_supabase_client()

        # Check if user exists
        check_response = supabase.table('users').select('uid').eq('uid', uid).execute()
        if not check_response.data or len(check_response.data) == 0:
            return not_found_response("User not found")

        # Delete user
        response = supabase.table('users').delete().eq('uid', uid).execute()

        return success_response(message="User deleted successfully")

    except Exception as e:
        return server_error_response(f"Failed to delete user: {str(e)}")


@users_bp.route('/me', methods=['GET'])
@require_admin
def get_current_user():
    """
    Get current authenticated user's profile
    Authorization: Any authenticated user
    """
    try:
        # Current user is already loaded by require_auth decorator
        user = g.current_user

        return success_response(data=user)

    except Exception as e:
        return server_error_response(f"Failed to fetch user profile: {str(e)}")
