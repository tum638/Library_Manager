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

def borrow_book(request, isbn, refcode):
    isbn = request.POST.get('isbn')

    refcode = request.POST.get('ref_code')

    book = Book.objects.get(isbn=isbn)
    student = Student.objects.get(ref_code=refcode)

    book.borrow(student)