# Food/urls.py
from django.urls import path
from .views import (
    create_grocery_list,
    get_user_grocery_lists,
    grocery_list_detail,
    create_recipe,
    get_user_recipes,
    recipe_detail,
    list_api_responses,
    generate_grocery_list,
)

urlpatterns = [
    # Grocery List URLs
    path('grocery-lists/', create_grocery_list, name='grocery-list-create'),
    path('grocery-lists/all/', get_user_grocery_lists, name='grocery-lists-all'),
    path('grocery-lists/<int:pk>/', grocery_list_detail, name='grocery-list-detail'),

    # Recipe URLs
    path('recipes/', create_recipe, name='recipe-create'),
    path('recipes/all/', get_user_recipes, name='recipes-all'),
    path('recipes/<int:pk>/', recipe_detail, name='recipe-detail'),

    # API Response URLs
    path('api-responses/', list_api_responses, name='api-response-list'),

    # OpenAI API URL
    path('generate-grocery-list/', generate_grocery_list, name='generate-grocery-list'),
]
