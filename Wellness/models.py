from django.db import models
from django.contrib.auth.models import User

# 💧 Water Intake Model
class WaterIntake(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=5, decimal_places=2)  # Liters of water
    timestamp = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    target_goal = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return f"{self.user.username} - {self.amount} liters on {self.timestamp.strftime('%Y-%m-%d')}"

# 🌙 Sleep Model
class Sleep(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=4, decimal_places=2)  # Hours slept
    quality = models.CharField(max_length=50, blank=True, null=True)  # Optional: Good, Average, Poor
    target_goal = models.DecimalField(max_digits=4, decimal_places=2, blank=True, null=True)  # Target hours

    def __str__(self):
        return f"{self.user.username} - {self.amount} hours on {self.timestamp.strftime('%Y-%m-%d')}"

# 🧘 Meditation Model
class Meditation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=4, decimal_places=2)  # Minutes of meditation
    insights = models.TextField(blank=True, null=True)  # Optional: Personal notes
    target_goal = models.DecimalField(max_digits=4, decimal_places=2, blank=True, null=True)  # Target minutes
    timestamp = models.DateTimeField(auto_now_add=True)  # ✅ Add this field

    def __str__(self):
        return f"{self.user.username} - {self.amount} minutes on {self.timestamp.strftime('%Y-%m-%d')}"


# 📊 Wellness Analysis Model
class WellnessAnalysis(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    analysis = models.TextField()  # The analysis text
    recommendations = models.TextField()  # The recommendations text
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Wellness Analysis for {self.user.username} on {self.created_at.strftime('%Y-%m-%d')}"

# 🏋️ Exercise Model
class Exercise(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)  # Exercise name (e.g., Running, Yoga)
    duration = models.DecimalField(max_digits=5, decimal_places=2)  # Minutes of exercise
    intensity = models.CharField(max_length=50)  # Low, Moderate, High
    timestamp = models.DateTimeField(auto_now_add=True)  # Automatically capture the exercise time
    target_goal = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)  # Target minutes

    def __str__(self):
        return f"{self.user.username} - {self.name} for {self.duration} minutes on {self.timestamp.strftime('%Y-%m-%d')}"
