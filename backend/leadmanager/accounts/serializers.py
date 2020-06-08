
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
        

# Register Serializer For User
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','password','first_name','last_name')
        extra_kwargs = {'password':{'write_only':True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username = validated_data['username'],
            password = validated_data['password'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'])
        return user


# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','first_name','last_name')

# User full Serializer
class UserFullDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','password','first_name','last_name')

# Login Serializer
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self,data):
        user = authenticate(**data)
        if user and user.is_active:

            return user
        raise serializers.ValidationError("Incorrect Credentials")