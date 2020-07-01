from rest_framework import generics,permissions,status
from .models import Post,Comment
from .serializers import PostSerializer,CommentSerializer,LikeSerializer
from .permissions import IsAuthorOrReadOnly
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import FileUploadParser
from django.http import JsonResponse
from django.contrib.auth.models import User
from rest_framework.parsers import MultiPartParser, FormParser



class PostListCreateview(generics.ListCreateAPIView):
    queryset = Post.objects.all().order_by('-publication_date')
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    parser_classes = (MultiPartParser, FormParser)

    def perform_create(self, serializer):
        
        serializer.save(author=self.request.user)
    
class PostDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,IsAuthorOrReadOnly]

class CommentCreate(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        id = self.kwargs.get('pk')
        post = get_object_or_404(Post,id=id)
        serializer.save(author=self.request.user,post=post)

class Commentdetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,IsAuthorOrReadOnly]

class LikeAPIView(APIView):
    """Allow users to add/remove a like to/from an post instance."""
    serializer_class = LikeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, pk):
        """Remove request.user from the voters queryset of an answer instance."""
        post = get_object_or_404(Post, pk=pk)
        user = request.user

        post.voters.remove(user)
        post.save()

        serializer_context = {"request": request}
        serializer = self.serializer_class(post, context=serializer_context)

        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, pk):
        """Add request.user to the voters queryset of an answer instance."""
        post = get_object_or_404(Post, pk=pk)
        user = request.user

        post.voters.add(user)
        post.save()

        serializer_context = {"request": request}
        serializer = self.serializer_class(post, context=serializer_context)

        return Response(serializer.data, status=status.HTTP_200_OK)



def servertest(request):
    
    if request.user.is_authenticated:
        return JsonResponse({'status':'true'})
    else:
        return JsonResponse({'status':'false'})
    