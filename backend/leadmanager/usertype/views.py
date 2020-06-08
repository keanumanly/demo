from django.shortcuts import render
from rest_framework import viewsets,generics,status
from .models import *
from .serializers import *
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated  
from rest_framework.views import APIView
from django.contrib.auth.hashers import make_password

# Create your views here.
class UsertypeView(viewsets.ModelViewSet):
    queryset = Usertype.objects.all()
    serializer_class = UsertypeSerializer


class Accounts(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = AccountsSerializer

# get specific Id
class Accesscontrol(viewsets.ModelViewSet):
    serializer_class = UsertypeSerializer

    def get_queryset(self):
        queryset = Usertype.objects.filter(userid=self.kwargs["pk"])
        # print(self.kwargs["pk"])
        return queryset
        

class UpdateAccount(APIView):

    serializer_class = UpdateAccountsSerializer

    def get_object(self, id):
        try:
            return User.objects.get(id=id)
        except User.DoesNotExist as e:
            return Response({"error": "No Data"}, status=404 )

    def get(self, request, id=None):
        instance = self.get_object(id)
        serailizer = UpdateAccountsSerializer(instance)
        return Response(serailizer.data)

    def put(self, request, id=None):
        data = request.data
        instance = self.get_object(id)
        serializer = UpdateAccountsSerializer(instance, data=data)
        if serializer.is_valid():
            print(instance.password == data['password'])
            if instance.password != data['password']:
                serializer.validated_data['password']=make_password(data['password'])
                
            serializer.save()
            return Response (serializer.data, status=200)
        return Response (serializer.data, status=400)
