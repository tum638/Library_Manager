from django.shortcuts import render
from django.http import JsonResponse
from .models import Book, Student
from .serializers import *
from rest_framework.generics import ListCreateAPIView
from rest_framework.views import APIView


from .utils import scanner, lookup

def scan(request):
    return JsonResponse(lookup(scanner()))

class BooksView(ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    
    
class StudentsView(ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
   
def borrow(request):
    student = Student.objects.get(pk=request.GET['student_id'])
    book = Book.objects.get(pk=request.GET['book_id'])
    response = student.borrow(book)
    
    if response:
        return JsonResponse(response, safe=False)
    else:
        return JsonResponse({
            "Error": response,
        })
