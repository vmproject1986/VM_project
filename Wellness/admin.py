from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin
from .models import WaterIntake, Sleep, Meditation, WellnessAnalysis, Exercise, Mood

# Inline for Water Intake
class WaterIntakeInline(admin.TabularInline):
    model = WaterIntake
    extra = 0

# Inline for Sleep
class SleepInline(admin.TabularInline):
    model = Sleep
    extra = 0

# Inline for Meditation
class MeditationInline(admin.TabularInline):
    model = Meditation
    extra = 0

# Inline for Wellness Analysis
class WellnessAnalysisInline(admin.TabularInline):
    model = WellnessAnalysis
    extra = 0

# Inline for Exercise
class ExerciseInline(admin.TabularInline):
    model = Exercise
    extra = 0

# Inline for Mood
class MoodInline(admin.TabularInline):
    model = Mood
    extra = 0

# Customize the User Admin to show Wellness data
class CustomUserAdmin(UserAdmin):
    inlines = [
        WaterIntakeInline,
        SleepInline,
        MeditationInline,
        WellnessAnalysisInline,
        ExerciseInline,
        MoodInline
    ]

    def get_inline_instances(self, request, obj=None):
        if not obj:
            return []
        return super().get_inline_instances(request, obj)

# Unregister the default User admin and register the custom one
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)

# Register individual Wellness models for admin interface
@admin.register(WaterIntake)
class WaterIntakeAdmin(admin.ModelAdmin):
    list_display = ('user', 'amount', 'timestamp', 'target_goal')
    search_fields = ('user__username',)
    list_filter = ('timestamp',)

@admin.register(Sleep)
class SleepAdmin(admin.ModelAdmin):
    list_display = ('user', 'amount', 'quality', 'target_goal')
    search_fields = ('user__username',)
    list_filter = ('amount', 'quality')

@admin.register(Meditation)
class MeditationAdmin(admin.ModelAdmin):
    list_display = ('user', 'amount', 'target_goal', 'timestamp')
    search_fields = ('user__username',)
    list_filter = ('timestamp',)

@admin.register(WellnessAnalysis)
class WellnessAnalysisAdmin(admin.ModelAdmin):
    list_display = ('user', 'created_at')
    search_fields = ('user__username',)
    list_filter = ('created_at',)

@admin.register(Exercise)
class ExerciseAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'duration', 'intensity', 'target_goal', 'timestamp')
    search_fields = ('user__username', 'name')
    list_filter = ('intensity', 'timestamp')

@admin.register(Mood)
class MoodAdmin(admin.ModelAdmin):
    list_display = ('user', 'mood', 'timestamp', 'notes')
    search_fields = ('user__username', 'mood')
    list_filter = ('timestamp', 'mood')
