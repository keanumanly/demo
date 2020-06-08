from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register("api/addition", views.AdditionView)
router.register("api/subtraction", views.SubtractionView)
router.register("api/multiplication", views.MultiplicationView)
router.register("api/division", views.DivisionView)

urlpatterns = [
    path("", include(router.urls)),
    path(
        "api/getaddition/<int:pk>/",
        views.GetAddition.as_view({"get": "list"}),
    ),
    path(
        "api/getsubtraction/<int:pk>/",
        views.GetSubtraction.as_view({"get": "list"}),
    ),
    path(
        "api/getmultiplication/<int:pk>/",
        views.GetMultiplication.as_view({"get": "list"}),
    ),
    path(
        "api/getdivision/<int:pk>/",
        views.GetDivision.as_view({"get": "list"}),
    ),
]