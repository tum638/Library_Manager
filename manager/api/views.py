from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, DestroyAPIView, RetrieveUpdateDestroyAPIView
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


