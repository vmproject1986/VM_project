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
@require_http_methods(["POST"])
def create_user(request):
    try:
        content = json.loads(request.body)
        profile_data = content.pop("profile", {})

        # Check if the user already exists by username or email
        if User.objects.filter(username=content["username"]).exists() or User.objects.filter(email=content["email"]).exists():
            return JsonResponse({"error": "User already exists"}, status=400)

        # Create the user
        user = User.objects.create_user(**content)

        # Create or update the profile
        Profile.objects.update_or_create(user=user, defaults=profile_data)

        return JsonResponse({"success": "User created successfully"}, status=201)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)


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
        profile = user.profile

        if request.method == "GET":
            # Return user and profile data
            data = {
                "username": user.username,
                "email": user.email,
                "profile": {
                    "avatar": profile.avatar.url if profile.avatar else None,
                    "allergies": profile.allergies,
                    "dietary_restrictions": profile.dietary_restrictions,
                    "dietary_preferences": profile.dietary_preferences,
                    "preferred_foods": profile.preferred_foods,
                    "lifestyle": profile.lifestyle,
                    "health_goals": profile.health_goals,
                    "budget": profile.budget,
                    "additional_info": profile.additional_info,
                },
            }
            return JsonResponse(data, safe=False)

        elif request.method == "PUT":
            # Update user and profile
            content = json.loads(request.body)
            profile_data = content.pop("profile", {})

            for attr, value in content.items():
                setattr(user, attr, value)
            user.save()

            for attr, value in profile_data.items():
                setattr(profile, attr, value)
            profile.save()

            return JsonResponse({"message": "User updated successfully"})

        elif request.method == "DELETE":
            # Delete user and profile
            user.delete()
            return JsonResponse({"message": "User deleted successfully"})

    except User.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)
