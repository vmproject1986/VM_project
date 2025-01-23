from .base import *

# Disable debug mode
DEBUG = False

# Allowed hosts for production
ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', '').split(',')

# Production database (e.g., PostgreSQL on Render)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME'),
        'USER': os.getenv('DB_USER'),
        'PASSWORD': os.getenv('DB_PASSWORD'),
        'HOST': os.getenv('DB_HOST'),
        'PORT': os.getenv('DB_PORT', '5432'),
    }
}

# Production CORS settings
CORS_ALLOWED_ORIGINS = [
    "https://remarkable-jalebi-0f1b49.netlify.app",  # Replace with Netlify domain
    "https://vm-project-6kcc.onrender.com",  # Replace with Render domain
]

# Security settings
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

# Optional advanced settings (commented out for now)
SECURE_HSTS_SECONDS = 3600
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_SSL_REDIRECT = True


LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'DEBUG',
    },
}
