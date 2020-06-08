from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializers import *

# Create your views here.
class AdditionView(viewsets.ModelViewSet):
    queryset = Addition.objects.all()
    serializer_class = AdditionSerializer

# get specific Id
class GetAddition(viewsets.ModelViewSet):
    serializer_class = AdditionSerializer

    def get_queryset(self):
        queryset = Addition.objects.filter(userid=self.kwargs["pk"])
        # print(self.kwargs["pk"])
        return queryset

class SubtractionView(viewsets.ModelViewSet):
    queryset = Subtraction.objects.all()
    serializer_class = SubtractionSerializer

# get specific Id
class GetSubtraction(viewsets.ModelViewSet):
    serializer_class = SubtractionSerializer

    def get_queryset(self):
        queryset = Subtraction.objects.filter(userid=self.kwargs["pk"])
        # print(self.kwargs["pk"])
        return queryset

class MultiplicationView(viewsets.ModelViewSet):
    queryset = Multiplication.objects.all()
    serializer_class = MultiplicationSerializer

# get specific Id
class GetMultiplication(viewsets.ModelViewSet):
    serializer_class = MultiplicationSerializer

    def get_queryset(self):
        queryset = Multiplication.objects.filter(userid=self.kwargs["pk"])
        # print(self.kwargs["pk"])
        return queryset
    
class DivisionView(viewsets.ModelViewSet):
    queryset = Division.objects.all()
    serializer_class = DivisionSerializer

# get specific Id
class GetDivision(viewsets.ModelViewSet):
    serializer_class = DivisionSerializer

    def get_queryset(self):
        queryset = Division.objects.filter(userid=self.kwargs["pk"])
        # print(self.kwargs["pk"])
        return queryset
    
