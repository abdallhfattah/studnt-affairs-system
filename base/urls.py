from django.urls import path
from . import views

app_name = 'base'

urlpatterns = [
    path('home/', views.home, name="home"),
    path('about/', views.about, name="about"),
    path('edit/', views.edit, name="edit"),
    path('show/', views.getallstudents , name="show"),
    path('check_existing/', views.check_existing, name="check_existing"),
    path('select/<int:id>/', views.select, name="select"),
    path('search/', views.getallstudents2, name="search"),
    path('add/', views.add, name="add"),
    path('user_login/', views.user_login, name="login"),
    path('deactivate/<int:id>', views.deactivate),
    path('edit/<str:pk>/', views.edit, name="edit"),
    path('delete/<str:pk>/', views.delete, name='delete'),
    
]

