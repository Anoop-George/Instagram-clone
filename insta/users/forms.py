from django import forms
from .models import User
from django.contrib.auth.forms import UserCreationForm


class UserRegisterForm(UserCreationForm):
    #email = forms.EmailField()
    #phone = forms.IntegerField(max_value=100000000000)
    class Meta:
        model = User
        fields = ['username', 'email','phone', 'password1', 'password2']
        #fields = '__all__'
