from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, DestroyAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from .models import Book, Student
from .serializers import *

class GetBook(RetrieveUpdateDestroyAPIView):
    model = Book
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class ListBooks(ListCreateAPIView):
    model = Book
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class ListStudents(ListCreateAPIView):
    model = Student
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
class UpdateStudent(RetrieveUpdateDestroyAPIView):
    model = Student
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
