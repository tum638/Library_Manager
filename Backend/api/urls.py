from django.urls import path
from .views import BorrowedBooks, StudentsView, borrow, scan, BooksView
urlpatterns = [
    path('scan/', scan),
    path('books/', BooksView.as_view()),
    path('students/', StudentsView.as_view()),
    path('borrow/', borrow),
    path('books/borrowed/', BorrowedBooks.as_view()),
    
]
