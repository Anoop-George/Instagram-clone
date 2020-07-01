from django.db import models
from django.contrib.auth.models import AbstractUser
from PIL import Image

class User(AbstractUser):
    email = models.EmailField(verbose_name='email' ,max_length=223,unique=True)
    photo = models.ImageField(upload_to='prof_pic', blank=True,null=True)
    phone=models.CharField(null=True,max_length=11)
    REQUIRED_FIELDS = [ 'email','phone','photo']
    #USERNAME_FIELD = 'email'
    
   # def get_username(self):
    #    return self.email
    def save(self,*args, **kwargs):
        super().save()

        pic = Image.open(self.photo.path)

        if pic.height > 300 or pic.width > 300:
            output_size = (300, 300)
            pic.thumbnail(output_size)
            pic.save(self.photo.path)