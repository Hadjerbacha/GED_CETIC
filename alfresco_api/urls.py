from django.urls import path
from .views import alfresco_login

urlpatterns = [
    path("login/", alfresco_login, name="alfresco_login"),
]
