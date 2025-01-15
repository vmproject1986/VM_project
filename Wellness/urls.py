from django.urls import path
from .views import (
    create_water_intake,
    get_user_water_intake,
    water_intake_detail,
    create_sleep,
    get_user_sleep,
    sleep_detail,
    create_meditation,
    get_user_meditation,
    meditation_detail,
    create_wellness_analysis,
    get_user_wellness_analysis,
    wellness_analysis_detail,
    create_exercise,
    get_user_exercises,
    exercise_detail,
    create_mood,
    get_user_moods,
    mood_detail,

)

urlpatterns = [
    # Water Intake URLs
    path('water-intake/', create_water_intake, name='create-water-intake'),
    path('water-intake/all/', get_user_water_intake, name='get-user-water-intake'),
    path('water-intake/<int:pk>/', water_intake_detail, name='water-intake-detail'),

    # Sleep URLs
    path('sleep/', create_sleep, name='create-sleep'),
    path('sleep/all/', get_user_sleep, name='get-user-sleep'),
    path('sleep/<int:pk>/', sleep_detail, name='sleep-detail'),

    # Meditation URLs
    path('meditation/', create_meditation, name='create-meditation'),
    path('meditation/all/', get_user_meditation, name='get-user-meditation'),
    path('meditation/<int:pk>/', meditation_detail, name='meditation-detail'),

    # Wellness Analysis URLs
    path('wellness-analysis/', create_wellness_analysis, name='create-wellness-analysis'),
    path('wellness-analysis/all/', get_user_wellness_analysis, name='get-user-wellness-analysis'),
    path('wellness-analysis/<int:pk>/', wellness_analysis_detail, name='wellness-analysis-detail'),

    # Exercise URLs
    path('exercise/', create_exercise, name='create-exercise'),
    path('exercise/all/', get_user_exercises, name='get-user-exercises'),
    path('exercise/<int:pk>/', exercise_detail, name='exercise-detail'),

    # Mood Endpoints
    path('mood/', create_mood, name='create_mood'),
    path('mood/all/', get_user_moods, name='get_user_moods'),
    path('mood/<int:pk>/', mood_detail, name='mood_detail'),
]
