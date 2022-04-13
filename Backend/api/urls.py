from django.urls import path
from .views import StudentsView, borrow, scan, BooksView
urlpatterns = [
    path('scan/', scan),
    path('books/', BooksView.as_view()),
    path('students/', StudentsView.as_view()),
    path('borrow/', borrow)
    
]
