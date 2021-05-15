from django.urls import path
from .views import GetBook, ListBooks, ListStudents, UpdateStudent
from .lookup import get_book

urlpatterns = [
    path('books/', ListBooks.as_view()),
    path('books/<int:pk>/', GetBook.as_view()),
    path('scan/', get_book),
    path('students/', ListStudents.as_view()),
    path('student/<int:pk>/', UpdateStudent.as_view())

]
