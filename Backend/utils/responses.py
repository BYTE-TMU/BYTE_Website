"""
Response utility functions for consistent API responses
"""
from flask import jsonify


def success_response(data=None, message=None, status_code=200):
    """
    Generate a successful response

    Args:
        data: Response data
        message (str): Optional success message
        status_code (int): HTTP status code (default: 200)

    Returns:
        tuple: (response, status_code)
    """
    response = {}

    if message:
        response['message'] = message

    if data is not None:
        response['data'] = data

    return jsonify(response), status_code


def error_response(message, error=None, status_code=400):
    """
    Generate an error response

    Args:
        message (str): Error message
        error (str): Optional error type/code
        status_code (int): HTTP status code (default: 400)

    Returns:
        tuple: (response, status_code)
    """
    response = {
        'message': message
    }

    if error:
        response['error'] = error

    return jsonify(response), status_code


def created_response(data, message="Resource created successfully"):
    """
    Generate a 201 Created response

    Args:
        data: Created resource data
        message (str): Success message

    Returns:
        tuple: (response, 201)
    """
    return success_response(data=data, message=message, status_code=201)


def no_content_response():
    """
    Generate a 204 No Content response

    Returns:
        tuple: ('', 204)
    """
    return '', 204


def not_found_response(message="Resource not found"):
    """
    Generate a 404 Not Found response

    Args:
        message (str): Error message

    Returns:
        tuple: (response, 404)
    """
    return error_response(message=message, error="Not Found", status_code=404)


def unauthorized_response(message="Unauthorized"):
    """
    Generate a 401 Unauthorized response

    Args:
        message (str): Error message

    Returns:
        tuple: (response, 401)
    """
    return error_response(message=message, error="Unauthorized", status_code=401)


def forbidden_response(message="Forbidden"):
    """
    Generate a 403 Forbidden response

    Args:
        message (str): Error message

    Returns:
        tuple: (response, 403)
    """
    return error_response(message=message, error="Forbidden", status_code=403)


def bad_request_response(message="Bad request", error=None):
    """
    Generate a 400 Bad Request response

    Args:
        message (str): Error message
        error (str): Optional error details

    Returns:
        tuple: (response, 400)
    """
    return error_response(message=message, error=error or "Bad Request", status_code=400)


def server_error_response(message="Internal server error"):
    """
    Generate a 500 Internal Server Error response

    Args:
        message (str): Error message

    Returns:
        tuple: (response, 500)
    """
    return error_response(message=message, error="Internal Server Error", status_code=500)
