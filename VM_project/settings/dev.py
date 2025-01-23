from .base import *

# Enable debug mode
DEBUG = True

# Allow localhost and 127.0.0.1 for development
ALLOWED_HOSTS = ['localhost', '127.0.0.1']

# Development database (e.g., SQLite)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Development CORS settings
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Frontend running locally
]

# Any other development-only settings can be added here
INSTALLED_APPS += [
    # Add any development-specific apps like debug toolbar here
]

MIDDLEWARE += [
    # Add development-specific middleware like debug toolbar middleware here
]
