from django.shortcuts import render
from .models import Book, Student, Borrow
from .serializers import *
from django.http import HttpResponse, JsonResponse
from rest_framework.generics import ListAPIView

class BooksList(ListAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    
class BorrowsList(ListAPIView):
    queryset = Borrow.objects.all()
    serializer_class = BorrowSerializer

def entry(request):
    if request.method == 'POST':
        title = request.POST['title']
        isbn = request.POST['isbn']
        author = request.POST['author']
        publisher = request.POST['publisher']
        
        book = Book(Title=title, isbn=isbn, Publisher=publisher, author=author)
        book.save()
    return JsonResponse({'success': 'true'})

def delete(request):
    book = Book.objects.get(id=request.POST['id'])
    book.delete()
    
def borrow(request):
    student_name = request.POST['student_name']
    book_id = request.POST['bookid']
    
    book = Book.objects.get(id=book_id)
    student = Student.objects.get(fullname=student_name)
    
    student.total_books += 1
    book.borrowed = True
    
    student.save()
    book.save()
    
    borrow = Borrow(book=book, student=student)
    
    borrow.save()