from django.urls import path,include
from .views import PostListCreateview,PostDetailAPIView,CommentCreate,Commentdetail,LikeAPIView,servertest
urlpatterns = [
    
    path('post/',PostListCreateview.as_view(),name="post_list_create"),
    path('post/<int:pk>/',PostDetailAPIView.as_view(),name="post_detail"),
    path('post/<int:pk>/comment/',CommentCreate.as_view(),name="comment_create"),
    path('comment/<int:pk>/',Commentdetail.as_view(),name="comment_detail"),
    path('post/<int:pk>/like/',LikeAPIView.as_view(),name="like"),
    path('servertest/',servertest,name="servertest"),
]
