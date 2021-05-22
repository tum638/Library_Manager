from django.urls import path
from .views import GetBook, ListBooks, ListStudents, UpdateStudent
from .views import borrow_book
from .lookup import get_book, get_from_db

urlpatterns = [
    path('books/', ListBooks.as_view()),
    path('books/<int:pk>/', GetBook.as_view()),
    path('scan/', get_book),
    path('scandb/', get_from_db),

    path('students/', ListStudents.as_view()),
    path('student/<int:pk>/', UpdateStudent.as_view()),
    path('book/borrow/', borrow_book, )

]
