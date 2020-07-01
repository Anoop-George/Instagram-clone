from rest_framework import serializers
from .models import Post,Comment

class CommentSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    isLoggedinuser = serializers.SerializerMethodField()
    class Meta:
        model = Comment
        exclude = ("post",)
        
    def get_isLoggedinuser(self,instance):
        request = self.context.get("request")
        if request.user.id == instance.author.pk:
            return True
        return False

class LikeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Post
        exclude = ("voters",'title','body','author','pic')

class PostSerializer(serializers.ModelSerializer):

    author = serializers.StringRelatedField(read_only=True)
    comment = CommentSerializer(many=True, read_only=True)
    likes_count = serializers.SerializerMethodField()
    user_has_voted = serializers.SerializerMethodField()
    isLoggedinuser = serializers.SerializerMethodField()
    
    class Meta:
        model = Post
        fields = "__all__"
    def get_likes_count(self, instance):
        return instance.voters.count()

    def get_user_has_voted(self, instance):
        request = self.context.get("request")
        return instance.voters.filter(pk=request.user.pk).exists()
    def get_isLoggedinuser(self,instance):
        request = self.context.get("request")
        if request.user.id == instance.author.pk:
            return True
        return False
         
