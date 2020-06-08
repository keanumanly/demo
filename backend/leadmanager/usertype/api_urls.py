from django.urls import path, include
from . import views

urlpatterns = [
    path(
        "api/changepassword/<int:id>/",views.UpdateAccount.as_view(),
    ),
]