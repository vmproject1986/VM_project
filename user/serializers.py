from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile


# Profile Serializer
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            'avatar',
            'allergies',
            'dietary_restrictions',
            'dietary_preferences',
            'preferred_foods',
            'lifestyle',
            'health_goals',
            'budget',
            'additional_info',
        ]


# User Serializer
class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'profile']
        extra_kwargs = {'password': {'write_only': True}}

    # Create or update user and profile
    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user = User.objects.create_user(**validated_data)
        Profile.objects.update_or_create(user=user, defaults=profile_data)
        return user

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if profile_data:
            Profile.objects.update_or_create(user=instance, defaults=profile_data)

        return instance
