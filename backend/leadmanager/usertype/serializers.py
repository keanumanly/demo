from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User


# API 
class UsertypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usertype
        fields = "__all__"


# List of Account 
class AccountsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # fields = "__all__"
        fields = ("id","username","password","first_name","last_name")

# Update the List of Account 
class UpdateAccountsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # fields = "__all__"
        fields = ("id","username","password","first_name","last_name")

        def update(self, instance, validated_data):
            instance.password = validated_data.get("password", instance.password)
            instance.save()
            print(instance)
            return instance
