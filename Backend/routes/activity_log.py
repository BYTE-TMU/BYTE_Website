"""
Activity Log routes - CRUD operations for activity_log table
Authorization: Admin/Owner read and insert, Owner only for updates and deletes
"""
from flask import Blueprint, request, g
from database import get_supabase_client
from middleware.auth import require_admin, require_owner
from utils.responses import (
    success_response, error_response, created_response,
    not_found_response, bad_request_response, server_error_response
)
from utils.validators import validate_required_fields

activity_log_bp = Blueprint('activity_log', __name__)


@activity_log_bp.route('', methods=['GET'])
@require_admin
def get_activity_logs():
    """
    Get all activity logs
    Authorization: Admin or Owner only
    Optional query parameters:
    - user_id: Filter by user ID
    - collection: Filter by collection (table name)
    - action: Filter by action type
    - limit: Limit number of results (default: 100)
    """
    try:
        supabase = get_supabase_client()
        query = supabase.table('activity_log').select('*')

        # Filter by user_id if provided
        user_id = request.args.get('user_id')
        if user_id:
            query = query.eq('user_id', user_id)

        # Filter by collection if provided
        collection = request.args.get('collection')
        if collection:
            query = query.eq('collection', collection)

        # Filter by action if provided
        action = request.args.get('action')
        if action:
            query = query.eq('action', action)

        # Apply limit
        limit = request.args.get('limit', 100, type=int)
        if limit < 1 or limit > 1000:
            return bad_request_response("limit must be between 1 and 1000")

        # Order by timestamp (most recent first)
        query = query.order('timestamp', desc=True).limit(limit)

        response = query.execute()

        return success_response(data=response.data)

    except Exception as e:
        return server_error_response(f"Failed to fetch activity logs: {str(e)}")


@activity_log_bp.route('/<log_id>', methods=['GET'])
@require_admin
def get_activity_log(log_id):
    """
    Get a specific activity log by ID
    Authorization: Admin or Owner only
    """
    try:
        supabase = get_supabase_client()
        response = supabase.table('activity_log').select('*').eq('id', log_id).execute()

        if not response.data or len(response.data) == 0:
            return not_found_response("Activity log not found")

        return success_response(data=response.data[0])

    except Exception as e:
        return server_error_response(f"Failed to fetch activity log: {str(e)}")


@activity_log_bp.route('/user/<user_id>', methods=['GET'])
@require_admin
def get_user_activity_logs(user_id):
    """
    Get activity logs for a specific user
    Authorization: Admin or Owner only
    Optional query parameter: limit (default: 50)
    """
    try:
        limit = request.args.get('limit', 50, type=int)
        if limit < 1 or limit > 500:
            return bad_request_response("limit must be between 1 and 500")

        supabase = get_supabase_client()
        response = supabase.table('activity_log').select('*').eq('user_id', user_id).order('timestamp', desc=True).limit(limit).execute()

        return success_response(data=response.data)

    except Exception as e:
        return server_error_response(f"Failed to fetch user activity logs: {str(e)}")


@activity_log_bp.route('/collection/<collection_name>', methods=['GET'])
@require_admin
def get_collection_activity_logs(collection_name):
    """
    Get activity logs for a specific collection (table)
    Authorization: Admin or Owner only
    Optional query parameter: limit (default: 100)
    """
    try:
        limit = request.args.get('limit', 100, type=int)
        if limit < 1 or limit > 1000:
            return bad_request_response("limit must be between 1 and 1000")

        supabase = get_supabase_client()
        response = supabase.table('activity_log').select('*').eq('collection', collection_name).order('timestamp', desc=True).limit(limit).execute()

        return success_response(data=response.data)

    except Exception as e:
        return server_error_response(f"Failed to fetch collection activity logs: {str(e)}")


@activity_log_bp.route('/document/<collection_name>/<document_id>', methods=['GET'])
@require_admin
def get_document_activity_logs(collection_name, document_id):
    """
    Get activity logs for a specific document in a collection
    Authorization: Admin or Owner only
    """
    try:
        supabase = get_supabase_client()
        response = supabase.table('activity_log').select('*').eq('collection', collection_name).eq('document_id', document_id).order('timestamp', desc=True).execute()

        return success_response(data=response.data)

    except Exception as e:
        return server_error_response(f"Failed to fetch document activity logs: {str(e)}")


@activity_log_bp.route('', methods=['POST'])
@require_admin
def create_activity_log():
    """
    Create a new activity log entry
    Authorization: Admin or Owner only

    Required fields: action, collection, document_id
    Optional fields: changes, metadata
    Note: user_id is automatically set to current user
    """
    try:
        data = request.get_json()

        # Validate required fields
        required_fields = ['action', 'collection', 'document_id']
        is_valid, error_msg = validate_required_fields(data, required_fields)
        if not is_valid:
            return bad_request_response(error_msg)

        # Build log data
        log_data = {
            'user_id': g.current_user['uid'],  # Automatically set to current user
            'action': data['action'],
            'collection': data['collection'],
            'document_id': data['document_id'],
            'changes': data.get('changes'),
            'metadata': data.get('metadata')
        }

        supabase = get_supabase_client()
        response = supabase.table('activity_log').insert(log_data).execute()

        if not response.data:
            return error_response("Failed to create activity log", status_code=500)

        return created_response(data=response.data[0], message="Activity log created successfully")

    except Exception as e:
        return server_error_response(f"Failed to create activity log: {str(e)}")


@activity_log_bp.route('/<log_id>', methods=['PUT', 'PATCH'])
@require_owner
def update_activity_log(log_id):
    """
    Update an activity log entry
    Authorization: Owner only

    Updatable fields: action, collection, document_id, changes, metadata
    Note: This should rarely be used. Activity logs are typically immutable.
    """
    try:
        data = request.get_json()

        if not data:
            return bad_request_response("No data provided")

        # Build update data
        update_data = {}
        allowed_fields = ['action', 'collection', 'document_id', 'changes', 'metadata']

        for field in allowed_fields:
            if field in data:
                update_data[field] = data[field]

        if not update_data:
            return bad_request_response("No valid fields to update")

        supabase = get_supabase_client()

        # Check if log exists
        check_response = supabase.table('activity_log').select('id').eq('id', log_id).execute()
        if not check_response.data or len(check_response.data) == 0:
            return not_found_response("Activity log not found")

        # Update log
        response = supabase.table('activity_log').update(update_data).eq('id', log_id).execute()

        if not response.data:
            return error_response("Failed to update activity log", status_code=500)

        return success_response(data=response.data[0], message="Activity log updated successfully")

    except Exception as e:
        return server_error_response(f"Failed to update activity log: {str(e)}")


@activity_log_bp.route('/<log_id>', methods=['DELETE'])
@require_owner
def delete_activity_log(log_id):
    """
    Delete an activity log entry
    Authorization: Owner only
    Note: This should rarely be used. Activity logs are typically immutable.
    """
    try:
        supabase = get_supabase_client()

        # Check if log exists
        check_response = supabase.table('activity_log').select('id').eq('id', log_id).execute()
        if not check_response.data or len(check_response.data) == 0:
            return not_found_response("Activity log not found")

        # Delete log
        response = supabase.table('activity_log').delete().eq('id', log_id).execute()

        return success_response(message="Activity log deleted successfully")

    except Exception as e:
        return server_error_response(f"Failed to delete activity log: {str(e)}")
