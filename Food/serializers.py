# Food/serializers.py
from rest_framework import serializers
from .models import GroceryList, Recipe, APIResponse

class GroceryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroceryList
        fields = ['id', 'name', 'items', 'timestamp', 'info', 'user_feedback']

    def create(self, validated_data):
        # Automatically set the user from the request context
        user = self.context['request'].user
        return GroceryList.objects.create(user=user, **validated_data)

class RecipeSerializer(serializers.ModelSerializer):
    grocery_list_name = serializers.SerializerMethodField()

    class Meta:
        model = Recipe
        fields = ['id', 'grocery_list', 'grocery_list_name', 'name', 'ingredients', 'instructions', 'user_feedback']

    def get_grocery_list_name(self, obj):
        return obj.grocery_list.name if obj.grocery_list else None

    def create(self, validated_data):
        # Automatically set the user from the request context
        user = self.context['request'].user
        return Recipe.objects.create(user=user, **validated_data)

class APIResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = APIResponse
        fields = ['id', 'user', 'response', 'created_at']
