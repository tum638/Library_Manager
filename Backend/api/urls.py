from django.urls import path, include
from .views import BookViewSet, BorrowedBooks, StudentsView, scan, BooksView, StudentViewSet
from rest_framework import routers
router = routers.DefaultRouter()
router.register('makstudents', StudentViewSet)
router.register('makbooks', BookViewSet)
urlpatterns = [
    path("", include(router.urls)),
    path('scan/', scan),

    path('students/', StudentsView.as_view()),

    path('books/borrowed/', BorrowedBooks.as_view()),

]
