# Food/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import GroceryList, Recipe, APIResponse
from .serializers import GroceryListSerializer, RecipeSerializer, APIResponseSerializer

# Grocery List Views
@api_view(['POST'])
def create_grocery_list(request):
    if request.method == 'POST':
        serializer = GroceryListSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)  # Debugging line
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_user_grocery_lists(request):
    if request.method == 'GET':
        grocery_lists = GroceryList.objects.filter(user=request.user)
        serializer = GroceryListSerializer(grocery_lists, many=True)
        return Response(serializer.data)

@api_view(['GET', 'PUT', 'DELETE'])
def grocery_list_detail(request, pk):
    try:
        grocery_list = GroceryList.objects.get(pk=pk, user=request.user)
    except GroceryList.DoesNotExist:
        return Response({'error': 'Grocery List not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = GroceryListSerializer(grocery_list)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = GroceryListSerializer(grocery_list, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        grocery_list.delete()
        return Response({'message': 'Grocery List deleted'}, status=status.HTTP_204_NO_CONTENT)

# Recipe Views
@api_view(['POST'])
def create_recipe(request):
    if request.method == 'POST':
        serializer = RecipeSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)  # Debugging line
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_user_recipes(request):
    if request.method == 'GET':
        recipes = Recipe.objects.filter(user=request.user)
        serializer = RecipeSerializer(recipes, many=True)
        return Response(serializer.data)

@api_view(['GET', 'PUT', 'DELETE'])
def recipe_detail(request, pk):
    try:
        recipe = Recipe.objects.get(pk=pk, user=request.user)
    except Recipe.DoesNotExist:
        return Response({'error': 'Recipe not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = RecipeSerializer(recipe)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = RecipeSerializer(recipe, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        recipe.delete()
        return Response({'message': 'Recipe deleted'}, status=status.HTTP_204_NO_CONTENT)

# API Response Views
@api_view(['GET'])
def list_api_responses(request):
    if request.method == 'GET':
        responses = APIResponse.objects.filter(user=request.user)
        serializer = APIResponseSerializer(responses, many=True)
        return Response(serializer.data)
