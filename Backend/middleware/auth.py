"""
Authentication and authorization middleware
Handles JWT token verification and user authorization checks
"""
from functools import wraps
from flask import request, jsonify, g
from database import get_supabase_client
import jwt
from config import Config


def get_auth_token():
    """
    Extract JWT token from Authorization header

    Returns:
        str: JWT token or None
    """
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return None

    # Expected format: "Bearer <token>"
    parts = auth_header.split()
    if len(parts) != 2 or parts[0].lower() != 'bearer':
        return None

    return parts[1]


def verify_token(token):
    """
    Verify JWT token and extract user information

    Args:
        token (str): JWT token

    Returns:
        dict: Decoded token payload or None if invalid
    """
    try:
        # Supabase uses JWT tokens - verify with Supabase
        supabase = get_supabase_client()

        # Get user from token
        response = supabase.auth.get_user(token)

        if response and response.user:
            return {
                'uid': response.user.id,
                'email': response.user.email
            }
        return None
    except Exception as e:
        print(f"Token verification error: {str(e)}")
        return None


def get_user_from_db(uid):
    """
    Fetch user details from database

    Args:
        uid (str): User ID

    Returns:
        dict: User data with is_admin and is_owner fields
    """
    try:
        supabase = get_supabase_client()
        response = supabase.table('users').select('*').eq('uid', uid).execute()

        if response.data and len(response.data) > 0:
            return response.data[0]
        return None
    except Exception as e:
        print(f"Database error fetching user: {str(e)}")
        return None


def require_auth(f):
    """
    Decorator to require authentication for a route

    Usage:
        @require_auth
        def protected_route():
            # Access current user via g.current_user
            pass
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = get_auth_token()

        if not token:
            return jsonify({
                'error': 'Unauthorized',
                'message': 'Authentication token is required'
            }), 401

        # Verify token
        user_info = verify_token(token)
        if not user_info:
            return jsonify({
                'error': 'Unauthorized',
                'message': 'Invalid or expired token'
            }), 401

        # Get full user details from database
        user = get_user_from_db(user_info['uid'])
        if not user:
            return jsonify({
                'error': 'Unauthorized',
                'message': 'User not found'
            }), 401

        # Store user in Flask's g object for access in route handlers
        g.current_user = user

        return f(*args, **kwargs)

    return decorated_function


def require_admin(f):
    """
    Decorator to require admin privileges (is_admin=True or is_owner=True)

    Usage:
        @require_admin
        def admin_route():
            # Access current user via g.current_user
            pass
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # First check authentication
        token = get_auth_token()

        if not token:
            return jsonify({
                'error': 'Unauthorized',
                'message': 'Authentication token is required'
            }), 401

        user_info = verify_token(token)
        if not user_info:
            return jsonify({
                'error': 'Unauthorized',
                'message': 'Invalid or expired token'
            }), 401

        # Get full user details
        user = get_user_from_db(user_info['uid'])
        if not user:
            return jsonify({
                'error': 'Unauthorized',
                'message': 'User not found'
            }), 401

        # Check admin or owner privileges
        if not user.get('is_admin') and not user.get('is_owner'):
            return jsonify({
                'error': 'Forbidden',
                'message': 'Admin privileges required'
            }), 403

        g.current_user = user

        return f(*args, **kwargs)

    return decorated_function


def require_owner(f):
    """
    Decorator to require owner privileges (is_owner=True)

    Usage:
        @require_owner
        def owner_route():
            # Access current user via g.current_user
            pass
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # First check authentication
        token = get_auth_token()

        if not token:
            return jsonify({
                'error': 'Unauthorized',
                'message': 'Authentication token is required'
            }), 401

        user_info = verify_token(token)
        if not user_info:
            return jsonify({
                'error': 'Unauthorized',
                'message': 'Invalid or expired token'
            }), 401

        # Get full user details
        user = get_user_from_db(user_info['uid'])
        if not user:
            return jsonify({
                'error': 'Unauthorized',
                'message': 'User not found'
            }), 401

        # Check owner privileges
        if not user.get('is_owner'):
            return jsonify({
                'error': 'Forbidden',
                'message': 'Owner privileges required'
            }), 403

        g.current_user = user

        return f(*args, **kwargs)

    return decorated_function


def optional_auth(f):
    """
    Decorator for routes where authentication is optional
    If authenticated, user info is available in g.current_user

    Usage:
        @optional_auth
        def public_route():
            if hasattr(g, 'current_user'):
                # User is authenticated
                pass
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = get_auth_token()

        if token:
            user_info = verify_token(token)
            if user_info:
                user = get_user_from_db(user_info['uid'])
                if user:
                    g.current_user = user

        return f(*args, **kwargs)

    return decorated_function
