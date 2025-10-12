"""
BYTE Website Backend API
Main application entry point
"""
from flask import Flask
from flask_cors import CORS
from config import Config
from utils.error_handlers import register_error_handlers

# Import blueprints
from routes.users import users_bp
from routes.team_members import team_members_bp
from routes.projects import projects_bp
from routes.events import events_bp
from routes.announcements import announcements_bp
from routes.activity_log import activity_log_bp


def create_app(config_class=Config):
    """Application factory pattern"""
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Enable CORS for frontend and admin access
    CORS(app, resources={
        r"/api/*": {
            "origins": ["http://localhost:3000", "http://localhost:5173"],
            "methods": ["GET", "POST", "PUT", "PATCH", "DELETE"],
            "allow_headers": ["Content-Type", "Authorization"]
        }
    })

    # Register error handlers
    register_error_handlers(app)

    # Register blueprints
    app.register_blueprint(users_bp, url_prefix='/api/users')
    app.register_blueprint(team_members_bp, url_prefix='/api/team-members')
    app.register_blueprint(projects_bp, url_prefix='/api/projects')
    app.register_blueprint(events_bp, url_prefix='/api/events')
    app.register_blueprint(announcements_bp, url_prefix='/api/announcements')
    app.register_blueprint(activity_log_bp, url_prefix='/api/activity-log')

    @app.route('/')
    def index():
        return {
            "message": "BYTE Website Backend API",
            "version": "1.0.0",
            "status": "running"
        }, 200

    @app.route('/api/health')
    def health():
        return {"status": "healthy"}, 200

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5000)
