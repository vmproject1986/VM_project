from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from .models import Profile
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
import json

# Create a new user and profile
@csrf_exempt
def create_user(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
            email = data.get('email')

            # Ensure all fields are provided
            if not username or not password or not email:
                return JsonResponse({'error': 'Username, password, and email are required.'}, status=400)

            # Check if the username already exists
            if User.objects.filter(username=username).exists():
                return JsonResponse({'error': 'User already exists.'}, status=400)

            # Create the user
            user = User.objects.create_user(username=username, password=password, email=email)

            # Optionally, create an empty Profile for the user
            Profile.objects.create(user=user)

            return JsonResponse({'success': 'User created successfully.'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Invalid request method.'}, status=405)


# Retrieve the list of users (Protected by JWT)
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_list(request):
    users = User.objects.all()
    data = [{"id": user.id, "username": user.username, "email": user.email} for user in users]
    return JsonResponse(data, safe=False)


# Retrieve, update, or delete a user and profile (Protected by JWT)
@api_view(["GET", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def user_detail(request, user_id):
    try:
        user = User.objects.get(pk=user_id)

        # Check if the user has an associated Profile
        try:
            profile = user.profile
        except Profile.DoesNotExist:
            # Return a placeholder profile or handle the missing profile gracefully
            profile = None

        if request.method == "GET":
            # Return user and profile data
            data = {
                "username": user.username,
                "email": user.email,
                "profile": {
                    "avatar": profile.avatar.url if profile and profile.avatar else None,
                    "allergies": profile.allergies if profile else None,
                    "dietary_restrictions": profile.dietary_restrictions if profile else None,
                    "dietary_preferences": profile.dietary_preferences if profile else None,
                    "preferred_foods": profile.preferred_foods if profile else None,
                    "lifestyle": profile.lifestyle if profile else None,
                    "health_goals": profile.health_goals if profile else None,
                    "budget": profile.budget if profile else None,
                    "additional_info": profile.additional_info if profile else None,
                } if profile else None,
            }
            return JsonResponse(data, safe=False)

        elif request.method == "PUT":
            # Update user and profile
            content = json.loads(request.body)
            profile_data = content.pop("profile", {})

            for attr, value in content.items():
                setattr(user, attr, value)
            user.save()

            # Update profile only if it exists
            if profile:
                for attr, value in profile_data.items():
                    setattr(profile, attr, value)
                profile.save()

            return JsonResponse({"message": "User updated successfully"})

        elif request.method == "DELETE":
            # Delete user and profile
            if profile:
                profile.delete()
            user.delete()
            return JsonResponse({"message": "User deleted successfully"})

    except User.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)
