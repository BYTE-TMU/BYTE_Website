"""
Projects routes - CRUD operations for projects table
Authorization: Public read, Admin/Owner write
"""
from flask import Blueprint, request, g
from database import get_supabase_client
from middleware.auth import require_admin
from utils.responses import (
    success_response, error_response, created_response,
    not_found_response, bad_request_response, server_error_response
)
from utils.validators import validate_required_fields, validate_status, validate_url

projects_bp = Blueprint('projects', __name__)


@projects_bp.route('', methods=['GET'])
def get_projects():
    """
    Get all projects
    Authorization: Public (no authentication required)
    Optional query parameters:
    - type: Filter by type (current/past)
    - status: Filter by status (On-going/Completed)
    """
    try:
        supabase = get_supabase_client()
        query = supabase.table('projects').select('*')

        # Filter by type if provided
        project_type = request.args.get('type')
        if project_type:
            query = query.eq('type', project_type)

        # Filter by status if provided
        status = request.args.get('status')
        if status:
            query = query.eq('status', status)

        # Order by updated_at (most recent first)
        query = query.order('updated_at', desc=True)

        response = query.execute()

        return success_response(data=response.data)

    except Exception as e:
        return server_error_response(f"Failed to fetch projects: {str(e)}")


@projects_bp.route('/<project_id>', methods=['GET'])
def get_project(project_id):
    """
    Get a specific project by ID
    Authorization: Public (no authentication required)
    """
    try:
        supabase = get_supabase_client()
        response = supabase.table('projects').select('*').eq('id', project_id).execute()

        if not response.data or len(response.data) == 0:
            return not_found_response("Project not found")

        return success_response(data=response.data[0])

    except Exception as e:
        return server_error_response(f"Failed to fetch project: {str(e)}")


@projects_bp.route('/type/<project_type>', methods=['GET'])
def get_projects_by_type(project_type):
    """
    Get projects by type (current/past)
    Authorization: Public (no authentication required)
    """
    try:
        if project_type not in ['current', 'past']:
            return bad_request_response("Invalid project type. Must be 'current' or 'past'")

        supabase = get_supabase_client()
        response = supabase.table('projects').select('*').eq('type', project_type).order('updated_at', desc=True).execute()

        return success_response(data=response.data)

    except Exception as e:
        return server_error_response(f"Failed to fetch projects by type: {str(e)}")


@projects_bp.route('', methods=['POST'])
@require_admin
def create_project():
    """
    Create a new project
    Authorization: Admin or Owner only

    Required fields: id, title, status, description, technologies, github_url, type
    Optional fields: image_url
    """
    try:
        data = request.get_json()

        # Validate required fields
        required_fields = ['id', 'title', 'status', 'description', 'technologies', 'github_url', 'type']
        is_valid, error_msg = validate_required_fields(data, required_fields)
        if not is_valid:
            return bad_request_response(error_msg)

        # Validate status
        if not validate_status(data['status'], ['On-going', 'Completed']):
            return bad_request_response("status must be 'On-going' or 'Completed'")

        # Validate type
        if not validate_status(data['type'], ['current', 'past']):
            return bad_request_response("type must be 'current' or 'past'")

        # Validate technologies is a list
        if not isinstance(data['technologies'], list):
            return bad_request_response("technologies must be an array")

        # Validate github_url
        if not validate_url(data['github_url']):
            return bad_request_response("github_url must be a valid URL")

        # Build project data
        project_data = {
            'id': data['id'],
            'title': data['title'],
            'status': data['status'],
            'description': data['description'],
            'technologies': data['technologies'],
            'github_url': data['github_url'],
            'type': data['type'],
            'image_url': data.get('image_url'),
            'created_by': g.current_user['uid']
        }

        supabase = get_supabase_client()
        response = supabase.table('projects').insert(project_data).execute()

        if not response.data:
            return error_response("Failed to create project", status_code=500)

        return created_response(data=response.data[0], message="Project created successfully")

    except Exception as e:
        return server_error_response(f"Failed to create project: {str(e)}")


@projects_bp.route('/<project_id>', methods=['PUT', 'PATCH'])
@require_admin
def update_project(project_id):
    """
    Update a project
    Authorization: Admin or Owner only

    Updatable fields: title, status, description, technologies, github_url, image_url, type
    """
    try:
        data = request.get_json()

        if not data:
            return bad_request_response("No data provided")

        # Build update data
        update_data = {}
        allowed_fields = ['title', 'status', 'description', 'technologies', 'github_url', 'image_url', 'type']

        for field in allowed_fields:
            if field in data:
                update_data[field] = data[field]

        if not update_data:
            return bad_request_response("No valid fields to update")

        # Validate status if provided
        if 'status' in update_data and not validate_status(update_data['status'], ['On-going', 'Completed']):
            return bad_request_response("status must be 'On-going' or 'Completed'")

        # Validate type if provided
        if 'type' in update_data and not validate_status(update_data['type'], ['current', 'past']):
            return bad_request_response("type must be 'current' or 'past'")

        # Validate technologies if provided
        if 'technologies' in update_data and not isinstance(update_data['technologies'], list):
            return bad_request_response("technologies must be an array")

        # Validate github_url if provided
        if 'github_url' in update_data and not validate_url(update_data['github_url']):
            return bad_request_response("github_url must be a valid URL")

        supabase = get_supabase_client()

        # Check if project exists
        check_response = supabase.table('projects').select('id').eq('id', project_id).execute()
        if not check_response.data or len(check_response.data) == 0:
            return not_found_response("Project not found")

        # Update project
        response = supabase.table('projects').update(update_data).eq('id', project_id).execute()

        if not response.data:
            return error_response("Failed to update project", status_code=500)

        return success_response(data=response.data[0], message="Project updated successfully")

    except Exception as e:
        return server_error_response(f"Failed to update project: {str(e)}")


@projects_bp.route('/<project_id>', methods=['DELETE'])
@require_admin
def delete_project(project_id):
    """
    Delete a project
    Authorization: Admin or Owner only
    """
    try:
        supabase = get_supabase_client()

        # Check if project exists
        check_response = supabase.table('projects').select('id').eq('id', project_id).execute()
        if not check_response.data or len(check_response.data) == 0:
            return not_found_response("Project not found")

        # Delete project
        response = supabase.table('projects').delete().eq('id', project_id).execute()

        return success_response(message="Project deleted successfully")

    except Exception as e:
        return server_error_response(f"Failed to delete project: {str(e)}")
