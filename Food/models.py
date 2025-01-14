# Food/models.py
from django.db import models
from django.contrib.auth.models import User

# Grocery List Model
class GroceryList(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    items = models.TextField()  # JSON or comma-separated grocery items
    timestamp = models.DateTimeField(auto_now_add=True)
    info = models.TextField(blank=True, null=True)  # Additional information about the grocery list
    user_feedback = models.TextField(blank=True, null=True)  # Optional field for user feedback

    def __str__(self):
        return f"Grocery List for {self.user.username} on {self.timestamp.strftime('%Y-%m-%d')}"

# Recipe Model
class Recipe(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    grocery_list = models.ForeignKey(GroceryList, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    ingredients = models.TextField()  # JSON format or comma-separated list of ingredients
    instructions = models.TextField()  # Detailed cooking instructions
    user_feedback = models.TextField(blank=True, null=True)  # Optional field for user feedback

    def __str__(self):
        return f"Recipe: {self.name}"

# API Response Model
class APIResponse(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    response = models.JSONField()  # Stores the raw JSON response from OpenAI
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"API Response for {self.user.username} on {self.created_at.strftime('%Y-%m-%d')}"
