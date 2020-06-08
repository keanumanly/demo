from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register("api/usertype", views.UsertypeView)
router.register("api/accounts", views.Accounts)
# router.register("api/changepassword", views.UpdateAccount)

urlpatterns = [
    path("", include(router.urls)),
    path(
        "api/access/<int:pk>/",
        views.Accesscontrol.as_view({"get": "list"}),
    ),
]