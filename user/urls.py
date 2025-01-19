from django.urls import path
from .views import create_user, user_detail, user_list, send_email,

urlpatterns = [
    path('create/', create_user, name='create-user'),
    path('<int:user_id>/', user_detail, name='user-detail'),
    path('user_list/', user_list, name='user-list'),

    path('send-email/', send_email, name='send_email'),
]
