from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import Book, Student
from .serializers import *
from rest_framework.generics import ListCreateAPIView
from rest_framework.views import APIView


from .utils import scanner, lookup

def scan(request):
    book_data = lookup(scanner())
    return JsonResponse(book_data, safe=False)

class BooksView(ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class BorrowedBooks(ListCreateAPIView):
    queryset = Book.objects.filter(in_library=False)
    serializer_class = BookSerializer    
    
class StudentsView(ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
   
def borrow(request):
    student = Student.objects.get(pk=request.POST['student_id'])
    book = Book.objects.get(pk=request.POST['book_id'])
    response = student.borrow(book)
    
    if response:
        return JsonResponse(response, safe=False)
    else:
        return JsonResponse({
            "Error": response,
        })
