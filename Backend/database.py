"""
Supabase database client configuration and initialization
"""
from supabase import create_client, Client
from config import Config

# Validate configuration
Config.validate()

# Initialize Supabase client
supabase: Client = create_client(Config.SUPABASE_URL, Config.SUPABASE_KEY)


def get_supabase_client() -> Client:
    """
    Get the Supabase client instance

    Returns:
        Client: Configured Supabase client
    """
    return supabase
