"""
Team Members routes - CRUD operations for team_members table
Authorization: Public read, Admin/Owner write
"""
from flask import Blueprint, request, g
from database import get_supabase_client
from middleware.auth import require_admin, optional_auth
from utils.responses import (
    success_response, error_response, created_response,
    not_found_response, bad_request_response, server_error_response
)
from utils.validators import validate_required_fields

team_members_bp = Blueprint('team_members', __name__)


@team_members_bp.route('', methods=['GET'])
def get_team_members():
    """
    Get all team members
    Authorization: Public (no authentication required)
    Optional query parameters:
    - category: Filter by category
    - rank: Order by rank
    """
    try:
        supabase = get_supabase_client()
        query = supabase.table('team_members').select('*')

        # Filter by category if provided
        category = request.args.get('category')
        if category:
            # Use contains for array field
            query = query.contains('categories', [category])

        # Order by rank (descending by default)
        query = query.order('rank', desc=True)

        response = query.execute()

        return success_response(data=response.data)

    except Exception as e:
        return server_error_response(f"Failed to fetch team members: {str(e)}")


@team_members_bp.route('/<member_id>', methods=['GET'])
def get_team_member(member_id):
    """
    Get a specific team member by ID
    Authorization: Public (no authentication required)
    """
    try:
        supabase = get_supabase_client()
        response = supabase.table('team_members').select('*').eq('id', member_id).execute()

        if not response.data or len(response.data) == 0:
            return not_found_response("Team member not found")

        return success_response(data=response.data[0])

    except Exception as e:
        return server_error_response(f"Failed to fetch team member: {str(e)}")


@team_members_bp.route('/category/<category_name>', methods=['GET'])
def get_team_members_by_category(category_name):
    """
    Get team members by category
    Authorization: Public (no authentication required)
    """
    try:
        supabase = get_supabase_client()
        response = supabase.table('team_members').select('*').contains('categories', [category_name]).order('rank', desc=True).execute()

        return success_response(data=response.data)

    except Exception as e:
        return server_error_response(f"Failed to fetch team members by category: {str(e)}")


@team_members_bp.route('', methods=['POST'])
@require_admin
def create_team_member():
    """
    Create a new team member
    Authorization: Admin or Owner only

    Required fields: id, name, position, profile_pic_url, rank, categories
    Optional fields: connections
    """
    try:
        data = request.get_json()

        # Validate required fields
        required_fields = ['id', 'name', 'position', 'profile_pic_url', 'rank', 'categories']
        is_valid, error_msg = validate_required_fields(data, required_fields)
        if not is_valid:
            return bad_request_response(error_msg)

        # Validate categories is a list
        if not isinstance(data['categories'], list) or len(data['categories']) == 0:
            return bad_request_response("categories must be a non-empty array")

        # Build member data
        member_data = {
            'id': data['id'],
            'name': data['name'],
            'position': data['position'],
            'profile_pic_url': data['profile_pic_url'],
            'rank': data['rank'],
            'categories': data['categories'],
            'connections': data.get('connections', []),
            'updated_by': g.current_user['uid']
        }

        supabase = get_supabase_client()
        response = supabase.table('team_members').insert(member_data).execute()

        if not response.data:
            return error_response("Failed to create team member", status_code=500)

        return created_response(data=response.data[0], message="Team member created successfully")

    except Exception as e:
        return server_error_response(f"Failed to create team member: {str(e)}")


@team_members_bp.route('/<member_id>', methods=['PUT', 'PATCH'])
@require_admin
def update_team_member(member_id):
    """
    Update a team member
    Authorization: Admin or Owner only

    Updatable fields: name, position, profile_pic_url, rank, categories, connections
    """
    try:
        data = request.get_json()

        if not data:
            return bad_request_response("No data provided")

        # Build update data
        update_data = {}
        allowed_fields = ['name', 'position', 'profile_pic_url', 'rank', 'categories', 'connections']

        for field in allowed_fields:
            if field in data:
                update_data[field] = data[field]

        if not update_data:
            return bad_request_response("No valid fields to update")

        # Validate categories if provided
        if 'categories' in update_data:
            if not isinstance(update_data['categories'], list) or len(update_data['categories']) == 0:
                return bad_request_response("categories must be a non-empty array")

        # Add updated_by
        update_data['updated_by'] = g.current_user['uid']

        supabase = get_supabase_client()

        # Check if member exists
        check_response = supabase.table('team_members').select('id').eq('id', member_id).execute()
        if not check_response.data or len(check_response.data) == 0:
            return not_found_response("Team member not found")

        # Update member
        response = supabase.table('team_members').update(update_data).eq('id', member_id).execute()

        if not response.data:
            return error_response("Failed to update team member", status_code=500)

        return success_response(data=response.data[0], message="Team member updated successfully")

    except Exception as e:
        return server_error_response(f"Failed to update team member: {str(e)}")


@team_members_bp.route('/<member_id>', methods=['DELETE'])
@require_admin
def delete_team_member(member_id):
    """
    Delete a team member
    Authorization: Admin or Owner only
    """
    try:
        supabase = get_supabase_client()

        # Check if member exists
        check_response = supabase.table('team_members').select('id').eq('id', member_id).execute()
        if not check_response.data or len(check_response.data) == 0:
            return not_found_response("Team member not found")

        # Delete member
        response = supabase.table('team_members').delete().eq('id', member_id).execute()

        return success_response(message="Team member deleted successfully")

    except Exception as e:
        return server_error_response(f"Failed to delete team member: {str(e)}")
