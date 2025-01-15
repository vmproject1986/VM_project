from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin
from .models import GroceryList, Recipe, APIResponse


# Inline for Grocery Lists
class GroceryListInline(admin.TabularInline):
    model = GroceryList
    extra = 0  # No empty rows
    can_delete = True
    show_change_link = True


# Inline for Recipes
class RecipeInline(admin.TabularInline):
    model = Recipe
    extra = 0  # No empty rows
    can_delete = True
    show_change_link = True


# Customize the User Admin
class CustomUserAdmin(UserAdmin):
    inlines = [GroceryListInline, RecipeInline]

    def get_inline_instances(self, request, obj=None):
        if not obj:
            return []
        return super().get_inline_instances(request, obj)


# Unregister the default User admin and register the custom one
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)


@admin.register(GroceryList)
class GroceryListAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'timestamp')
    search_fields = ('name', 'user__username')
    list_filter = ('timestamp',)

@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'grocery_list')
    search_fields = ('name', 'user__username')
    list_filter = ('grocery_list',)

@admin.register(APIResponse)
class APIResponseAdmin(admin.ModelAdmin):
    list_display = ('user', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('user__username',)
