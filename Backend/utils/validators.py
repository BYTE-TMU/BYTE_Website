"""
Input validation utilities
"""
from datetime import datetime


def validate_required_fields(data, required_fields):
    """
    Validate that required fields are present in data

    Args:
        data (dict): Input data
        required_fields (list): List of required field names

    Returns:
        tuple: (is_valid, error_message)
    """
    missing_fields = [field for field in required_fields if field not in data or data[field] is None or data[field] == '']

    if missing_fields:
        return False, f"Missing required fields: {', '.join(missing_fields)}"

    return True, None


def validate_email(email):
    """
    Basic email validation

    Args:
        email (str): Email address to validate

    Returns:
        bool: True if valid, False otherwise
    """
    if not email or '@' not in email:
        return False
    return True


def validate_date_format(date_string, format='%Y-%m-%d'):
    """
    Validate date string format

    Args:
        date_string (str): Date string
        format (str): Expected date format (default: '%Y-%m-%d')

    Returns:
        bool: True if valid, False otherwise
    """
    try:
        datetime.strptime(date_string, format)
        return True
    except (ValueError, TypeError):
        return False


def validate_status(status, valid_statuses):
    """
    Validate that status is one of the valid options

    Args:
        status (str): Status to validate
        valid_statuses (list): List of valid status values

    Returns:
        bool: True if valid, False otherwise
    """
    return status in valid_statuses


def validate_url(url):
    """
    Basic URL validation

    Args:
        url (str): URL to validate

    Returns:
        bool: True if valid, False otherwise
    """
    if not url:
        return False
    return url.startswith('http://') or url.startswith('https://')
