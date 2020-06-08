from rest_framework import serializers
from .models import *


# API 
class AdditionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Addition
        fields = "__all__"


class SubtractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subtraction
        fields = "__all__"


class MultiplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Multiplication
        fields = "__all__"


class DivisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Division
        fields = "__all__"