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
    "http://localhost:3000", "http://127.0.0.1:8000",  # Frontend running locally
]

# Any other development-only settings can be added here
INSTALLED_APPS += [
    # Add any development-specific apps like debug toolbar here
]

MIDDLEWARE += [
    # Add development-specific middleware like debug toolbar middleware here
]

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'  # Replace with your email provider's SMTP server
EMAIL_PORT = 587  # Typically 587 for TLS
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER')  # Ensure this is set in .env
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD')  # Ensure this is set in .env
