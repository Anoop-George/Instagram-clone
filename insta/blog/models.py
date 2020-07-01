from django.db import models
from django.conf import settings
from PIL import Image

class Post(models.Model):
    title = models.CharField(max_length=20)
    body = models.CharField(max_length=60)
    author = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    publication_date = models.DateField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    voters = models.ManyToManyField(settings.AUTH_USER_MODEL,
                                    related_name="votes",blank=True)
    pic = models.ImageField(upload_to='pics', blank=True,null=True)


    def __str__(self):
        return self.title

    def save(self,*args, **kwargs):
        super().save()

        pic = Image.open(self.pic.path)

        if pic.height > 400 or pic.width > 400:
            output_size = (400, 400)
            pic.thumbnail(output_size)
            pic.save(self.pic.path)

class Comment(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    body = models.CharField(max_length=40,blank=True,null=True)
    
    post = models.ForeignKey(Post,
                              on_delete=models.CASCADE,
                              related_name="comment")
    
    def __str__(self):
        return str(self.body)
    
