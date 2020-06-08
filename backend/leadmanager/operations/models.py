from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Addition(models.Model):
    userid = models.ForeignKey(User, on_delete=models.CASCADE, default="")
    
    first_number = models.CharField(max_length=255, default=None)
    
    second_number = models.CharField(max_length=255, default=None)
    total = models.CharField(max_length=255, default=None)

    def __str__(self):
        return str(self.total)

class Subtraction(models.Model):
    userid = models.ForeignKey(User, on_delete=models.CASCADE, default="")
    first_number = models.CharField(max_length=255, default=None)
    second_number = models.CharField(max_length=255, default=None)
    total = models.CharField(max_length=255, default=None)

    def __str__(self):
        return str(self.total)

class Multiplication(models.Model):
    userid = models.ForeignKey(User, on_delete=models.CASCADE, default="")
    first_number = models.CharField(max_length=255, default=None)
    second_number = models.CharField(max_length=255, default=None)
    total = models.CharField(max_length=255, default=None)

    def __str__(self):
        return str(self.total)

class Division(models.Model):
    userid = models.ForeignKey(User, on_delete=models.CASCADE, default="")
    first_number = models.CharField(max_length=255, default=None)
    second_number = models.CharField(max_length=255, default=None)
    total = models.CharField(max_length=255, default=None)

    def __str__(self):
        return str(self.total)