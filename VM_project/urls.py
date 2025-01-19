"""
URL configuration for VM_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# from django.urls import path, include

# urlpatterns = [
    # path('admin/', admin.site.urls),
    # path('api/user/', include('user.urls')),
# ]

from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse  # Use JsonResponse for structured responses
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# Root API handler
def api_root_view(request):
    return JsonResponse({"message": "API is live!"})


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/', include('user.urls')),
    path('api/food/', include('Food.urls')),
    path('api/wellness/', include('Wellness.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', api_root_view, name='api-root'),  # Use /api/ as the root path
]
