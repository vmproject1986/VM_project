from django.contrib.auth.models import User
from django.db import models


# Profile model to extend the built-in User model
class Profile(models.Model):
    # Existing fields
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

    # New target goals for Wellness app
    water_intake_goal = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)  # in liters
    sleep_goal = models.DecimalField(max_digits=4, decimal_places=2, blank=True, null=True)  # in hours
    meditation_goal = models.DecimalField(max_digits=4, decimal_places=2, blank=True, null=True)  # in minutes
    exercise_goal = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)  # in minutes
    wellness_goal = models.TextField(blank=True, null=True)  # Custom wellness goals

    # New target goals for Habit app (for future implementation)
    habit1_goal = models.TextField(blank=True, null=True)
    habit2_goal = models.TextField(blank=True, null=True)
    habit3_goal = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.user.username
