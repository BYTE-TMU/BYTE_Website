"""
Announcements routes - CRUD operations for announcements table
Authorization: Public read, Admin/Owner write
"""
from flask import Blueprint, request, g
from database import get_supabase_client
from middleware.auth import require_admin
from utils.responses import (
    success_response, error_response, created_response,
    not_found_response, bad_request_response, server_error_response
)
from utils.validators import validate_required_fields

announcements_bp = Blueprint('announcements', __name__)


@announcements_bp.route('', methods=['GET'])
def get_announcements():
    """
    Get all announcements
    Authorization: Public (no authentication required)
    Ordered by created_at (most recent first)
    """
    try:
        supabase = get_supabase_client()
        response = supabase.table('announcements').select('*').order('created_at', desc=True).execute()

        return success_response(data=response.data)

    except Exception as e:
        return server_error_response(f"Failed to fetch announcements: {str(e)}")


@announcements_bp.route('/<announcement_id>', methods=['GET'])
def get_announcement(announcement_id):
    """
    Get a specific announcement by ID
    Authorization: Public (no authentication required)
    """
    try:
        supabase = get_supabase_client()
        response = supabase.table('announcements').select('*').eq('id', announcement_id).execute()

        if not response.data or len(response.data) == 0:
            return not_found_response("Announcement not found")

        return success_response(data=response.data[0])

    except Exception as e:
        return server_error_response(f"Failed to fetch announcement: {str(e)}")


@announcements_bp.route('/recent', methods=['GET'])
def get_recent_announcements():
    """
    Get recent announcements (limit can be specified)
    Authorization: Public (no authentication required)
    Query parameter: limit (default: 10)
    """
    try:
        limit = request.args.get('limit', 10, type=int)

        if limit < 1 or limit > 100:
            return bad_request_response("limit must be between 1 and 100")

        supabase = get_supabase_client()
        response = supabase.table('announcements').select('*').order('created_at', desc=True).limit(limit).execute()

        return success_response(data=response.data)

    except Exception as e:
        return server_error_response(f"Failed to fetch recent announcements: {str(e)}")


@announcements_bp.route('', methods=['POST'])
@require_admin
def create_announcement():
    """
    Create a new announcement
    Authorization: Admin or Owner only

    Required fields: id, date, title, description
    Optional fields: image_url
    """
    try:
        data = request.get_json()

        # Validate required fields
        required_fields = ['id', 'date', 'title', 'description']
        is_valid, error_msg = validate_required_fields(data, required_fields)
        if not is_valid:
            return bad_request_response(error_msg)

        # Build announcement data
        announcement_data = {
            'id': data['id'],
            'date': data['date'],  # Display date string (e.g., 'Sep 12, 2025')
            'title': data['title'],
            'description': data['description'],
            'image_url': data.get('image_url'),
            'updated_by': g.current_user['uid']
        }

        supabase = get_supabase_client()
        response = supabase.table('announcements').insert(announcement_data).execute()

        if not response.data:
            return error_response("Failed to create announcement", status_code=500)

        return created_response(data=response.data[0], message="Announcement created successfully")

    except Exception as e:
        return server_error_response(f"Failed to create announcement: {str(e)}")


@announcements_bp.route('/<announcement_id>', methods=['PUT', 'PATCH'])
@require_admin
def update_announcement(announcement_id):
    """
    Update an announcement
    Authorization: Admin or Owner only

    Updatable fields: date, title, description, image_url
    """
    try:
        data = request.get_json()

        if not data:
            return bad_request_response("No data provided")

        # Build update data
        update_data = {}
        allowed_fields = ['date', 'title', 'description', 'image_url']

        for field in allowed_fields:
            if field in data:
                update_data[field] = data[field]

        if not update_data:
            return bad_request_response("No valid fields to update")

        # Add updated_by
        update_data['updated_by'] = g.current_user['uid']

        supabase = get_supabase_client()

        # Check if announcement exists
        check_response = supabase.table('announcements').select('id').eq('id', announcement_id).execute()
        if not check_response.data or len(check_response.data) == 0:
            return not_found_response("Announcement not found")

        # Update announcement
        response = supabase.table('announcements').update(update_data).eq('id', announcement_id).execute()

        if not response.data:
            return error_response("Failed to update announcement", status_code=500)

        return success_response(data=response.data[0], message="Announcement updated successfully")

    except Exception as e:
        return server_error_response(f"Failed to update announcement: {str(e)}")


@announcements_bp.route('/<announcement_id>', methods=['DELETE'])
@require_admin
def delete_announcement(announcement_id):
    """
    Delete an announcement
    Authorization: Admin or Owner only
    """
    try:
        supabase = get_supabase_client()

        # Check if announcement exists
        check_response = supabase.table('announcements').select('id').eq('id', announcement_id).execute()
        if not check_response.data or len(check_response.data) == 0:
            return not_found_response("Announcement not found")

        # Delete announcement
        response = supabase.table('announcements').delete().eq('id', announcement_id).execute()

        return success_response(message="Announcement deleted successfully")

    except Exception as e:
        return server_error_response(f"Failed to delete announcement: {str(e)}")
