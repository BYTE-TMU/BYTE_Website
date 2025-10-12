"""
Events routes - CRUD operations for events table
Authorization: Public read, Admin/Owner write
"""
from flask import Blueprint, request, g
from database import get_supabase_client
from middleware.auth import require_admin
from utils.responses import (
    success_response, error_response, created_response,
    not_found_response, bad_request_response, server_error_response
)
from utils.validators import validate_required_fields, validate_date_format, validate_url

events_bp = Blueprint('events', __name__)


@events_bp.route('', methods=['GET'])
def get_events():
    """
    Get all events
    Authorization: Public (no authentication required)
    Optional query parameters:
    - is_past: Filter by is_past (true/false)
    - type: Filter by event type
    """
    try:
        supabase = get_supabase_client()
        query = supabase.table('events').select('*')

        # Filter by is_past if provided
        is_past = request.args.get('is_past')
        if is_past is not None:
            is_past_bool = is_past.lower() == 'true'
            query = query.eq('is_past', is_past_bool)

        # Filter by type if provided
        event_type = request.args.get('type')
        if event_type:
            query = query.eq('type', event_type)

        # Order by date (most recent first for past, soonest first for upcoming)
        query = query.order('date', desc=True)

        response = query.execute()

        return success_response(data=response.data)

    except Exception as e:
        return server_error_response(f"Failed to fetch events: {str(e)}")


@events_bp.route('/<event_id>', methods=['GET'])
def get_event(event_id):
    """
    Get a specific event by ID
    Authorization: Public (no authentication required)
    """
    try:
        supabase = get_supabase_client()
        response = supabase.table('events').select('*').eq('id', event_id).execute()

        if not response.data or len(response.data) == 0:
            return not_found_response("Event not found")

        return success_response(data=response.data[0])

    except Exception as e:
        return server_error_response(f"Failed to fetch event: {str(e)}")


@events_bp.route('/upcoming', methods=['GET'])
def get_upcoming_events():
    """
    Get upcoming events (is_past = false)
    Authorization: Public (no authentication required)
    """
    try:
        supabase = get_supabase_client()
        response = supabase.table('events').select('*').eq('is_past', False).order('date', desc=False).execute()

        return success_response(data=response.data)

    except Exception as e:
        return server_error_response(f"Failed to fetch upcoming events: {str(e)}")


@events_bp.route('/past', methods=['GET'])
def get_past_events():
    """
    Get past events (is_past = true)
    Authorization: Public (no authentication required)
    """
    try:
        supabase = get_supabase_client()
        response = supabase.table('events').select('*').eq('is_past', True).order('date', desc=True).execute()

        return success_response(data=response.data)

    except Exception as e:
        return server_error_response(f"Failed to fetch past events: {str(e)}")


@events_bp.route('', methods=['POST'])
@require_admin
def create_event():
    """
    Create a new event
    Authorization: Admin or Owner only

    Required fields: id, title, date, description
    Optional fields: image_url, location, type, registration_url, recap_url, recap
    """
    try:
        data = request.get_json()

        # Validate required fields
        required_fields = ['id', 'title', 'date', 'description']
        is_valid, error_msg = validate_required_fields(data, required_fields)
        if not is_valid:
            return bad_request_response(error_msg)

        # Validate date format (YYYY-MM-DD)
        if not validate_date_format(data['date']):
            return bad_request_response("date must be in YYYY-MM-DD format")

        # Validate type if provided
        valid_types = ['workshop', 'hackathon', 'networking', 'social', 'competition']
        if 'type' in data and data['type'] and data['type'] not in valid_types:
            return bad_request_response(f"type must be one of: {', '.join(valid_types)}")

        # Validate URLs if provided
        if 'registration_url' in data and data['registration_url'] and not validate_url(data['registration_url']):
            return bad_request_response("registration_url must be a valid URL")

        if 'recap_url' in data and data['recap_url'] and not validate_url(data['recap_url']):
            return bad_request_response("recap_url must be a valid URL")

        # Build event data
        event_data = {
            'id': data['id'],
            'title': data['title'],
            'date': data['date'],
            'description': data['description'],
            'image_url': data.get('image_url'),
            'location': data.get('location'),
            'type': data.get('type'),
            'registration_url': data.get('registration_url'),
            'recap_url': data.get('recap_url'),
            'recap': data.get('recap'),
            'updated_by': g.current_user['uid']
        }

        # Note: is_past is automatically set by database trigger

        supabase = get_supabase_client()
        response = supabase.table('events').insert(event_data).execute()

        if not response.data:
            return error_response("Failed to create event", status_code=500)

        return created_response(data=response.data[0], message="Event created successfully")

    except Exception as e:
        return server_error_response(f"Failed to create event: {str(e)}")


@events_bp.route('/<event_id>', methods=['PUT', 'PATCH'])
@require_admin
def update_event(event_id):
    """
    Update an event
    Authorization: Admin or Owner only

    Updatable fields: title, date, description, image_url, location, type,
                     registration_url, recap_url, recap
    """
    try:
        data = request.get_json()

        if not data:
            return bad_request_response("No data provided")

        # Build update data
        update_data = {}
        allowed_fields = ['title', 'date', 'description', 'image_url', 'location',
                         'type', 'registration_url', 'recap_url', 'recap']

        for field in allowed_fields:
            if field in data:
                update_data[field] = data[field]

        if not update_data:
            return bad_request_response("No valid fields to update")

        # Validate date if provided
        if 'date' in update_data and not validate_date_format(update_data['date']):
            return bad_request_response("date must be in YYYY-MM-DD format")

        # Validate type if provided
        valid_types = ['workshop', 'hackathon', 'networking', 'social', 'competition']
        if 'type' in update_data and update_data['type'] and update_data['type'] not in valid_types:
            return bad_request_response(f"type must be one of: {', '.join(valid_types)}")

        # Validate URLs if provided
        if 'registration_url' in update_data and update_data['registration_url'] and not validate_url(update_data['registration_url']):
            return bad_request_response("registration_url must be a valid URL")

        if 'recap_url' in update_data and update_data['recap_url'] and not validate_url(update_data['recap_url']):
            return bad_request_response("recap_url must be a valid URL")

        # Add updated_by
        update_data['updated_by'] = g.current_user['uid']

        supabase = get_supabase_client()

        # Check if event exists
        check_response = supabase.table('events').select('id').eq('id', event_id).execute()
        if not check_response.data or len(check_response.data) == 0:
            return not_found_response("Event not found")

        # Update event (is_past will be automatically updated by trigger)
        response = supabase.table('events').update(update_data).eq('id', event_id).execute()

        if not response.data:
            return error_response("Failed to update event", status_code=500)

        return success_response(data=response.data[0], message="Event updated successfully")

    except Exception as e:
        return server_error_response(f"Failed to update event: {str(e)}")


@events_bp.route('/<event_id>', methods=['DELETE'])
@require_admin
def delete_event(event_id):
    """
    Delete an event
    Authorization: Admin or Owner only
    """
    try:
        supabase = get_supabase_client()

        # Check if event exists
        check_response = supabase.table('events').select('id').eq('id', event_id).execute()
        if not check_response.data or len(check_response.data) == 0:
            return not_found_response("Event not found")

        # Delete event
        response = supabase.table('events').delete().eq('id', event_id).execute()

        return success_response(message="Event deleted successfully")

    except Exception as e:
        return server_error_response(f"Failed to delete event: {str(e)}")
