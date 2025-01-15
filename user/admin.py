from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin
from .models import Profile


# Inline for Profile
class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    verbose_name_plural = 'Profile'
    fk_name = 'user'


# Customize the User Admin
class CustomUserAdmin(UserAdmin):
    inlines = [ProfileInline]
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff')
    search_fields = ('username', 'email')
    ordering = ('username',)

    def get_inline_instances(self, request, obj=None):
        if not obj:
            return []
        return super().get_inline_instances(request, obj)


# Unregister the default User admin and register the custom one
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)


# Register the Profile model with the new fields
@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = (
        'user',
        'water_intake_goal',
        'sleep_goal',
        'meditation_goal',
        'exercise_goal',
        'wellness_goal',
        'habit1_goal',
        'habit2_goal',
        'habit3_goal',
    )
    search_fields = ('user__username', 'user__email')
    list_filter = ('user__is_active',)
    fieldsets = (
        ("User Info", {
            'fields': ('user', 'avatar')
        }),
        ("Dietary Preferences", {
            'fields': ('allergies', 'dietary_restrictions', 'dietary_preferences', 'preferred_foods')
        }),
        ("Lifestyle & Health Goals", {
            'fields': ('lifestyle', 'health_goals', 'budget', 'additional_info')
        }),
        ("Wellness Target Goals", {
            'fields': ('water_intake_goal', 'sleep_goal', 'meditation_goal', 'exercise_goal', 'wellness_goal')
        }),
        ("Habit Target Goals", {
            'fields': ('habit1_goal', 'habit2_goal', 'habit3_goal')
        }),
    )
