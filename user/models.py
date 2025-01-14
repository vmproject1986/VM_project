from django.contrib.auth.models import User
from django.db import models


# Profile model to extend the built-in User model
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    allergies = models.TextField(blank=True, null=True)
    dietary_restrictions = models.TextField(blank=True, null=True)
    dietary_preferences = models.TextField(blank=True, null=True)
    preferred_foods = models.TextField(blank=True, null=True)
    lifestyle = models.TextField(blank=True, null=True)
    health_goals = models.TextField(blank=True, null=True)
    budget = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    additional_info = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.user.username
