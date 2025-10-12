"""
Global error handlers for Flask application
"""
from flask import jsonify
from werkzeug.exceptions import HTTPException


def register_error_handlers(app):
    """
    Register error handlers with Flask application

    Args:
        app: Flask application instance
    """

    @app.errorhandler(400)
    def bad_request(e):
        """Handle 400 Bad Request errors"""
        return jsonify({
            'error': 'Bad Request',
            'message': str(e.description) if hasattr(e, 'description') else 'Bad request'
        }), 400

    @app.errorhandler(401)
    def unauthorized(e):
        """Handle 401 Unauthorized errors"""
        return jsonify({
            'error': 'Unauthorized',
            'message': str(e.description) if hasattr(e, 'description') else 'Authentication required'
        }), 401

    @app.errorhandler(403)
    def forbidden(e):
        """Handle 403 Forbidden errors"""
        return jsonify({
            'error': 'Forbidden',
            'message': str(e.description) if hasattr(e, 'description') else 'Access forbidden'
        }), 403

    @app.errorhandler(404)
    def not_found(e):
        """Handle 404 Not Found errors"""
        return jsonify({
            'error': 'Not Found',
            'message': str(e.description) if hasattr(e, 'description') else 'Resource not found'
        }), 404

    @app.errorhandler(405)
    def method_not_allowed(e):
        """Handle 405 Method Not Allowed errors"""
        return jsonify({
            'error': 'Method Not Allowed',
            'message': str(e.description) if hasattr(e, 'description') else 'Method not allowed for this endpoint'
        }), 405

    @app.errorhandler(500)
    def internal_server_error(e):
        """Handle 500 Internal Server Error"""
        return jsonify({
            'error': 'Internal Server Error',
            'message': 'An unexpected error occurred'
        }), 500

    @app.errorhandler(HTTPException)
    def handle_http_exception(e):
        """Handle all HTTP exceptions with JSON responses"""
        return jsonify({
            'error': e.name,
            'message': e.description,
            'code': e.code
        }), e.code

    @app.errorhandler(Exception)
    def handle_generic_exception(e):
        """Handle all unhandled exceptions"""
        app.logger.error(f'Unhandled exception: {str(e)}')
        return jsonify({
            'error': 'Internal Server Error',
            'message': 'An unexpected error occurred'
        }), 500
