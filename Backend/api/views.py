from re import X
from urllib import response
from django.shortcuts import render, redirect
from django.http import JsonResponse
from .models import Book, Student
from .serializers import *
from rest_framework.generics import ListCreateAPIView
from rest_framework.views import APIView
from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response


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


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    @action(detail=False, methods=["POST"])
    def borrow(self, request, pk=None):
        students = Student.objects.filter(name=request.data['student'])
        if not students.exists():
            return Response({"message": "The student you entered cannot borrow book as they are not part of our records"}, status=status.HTTP_404_NOT_FOUND)
        student = students[0]
        books = Book.objects.filter(pk=request.data['book_id'])
        if not books.exists():
            return Response({"message": "The book is not part of our library"}, status=status.HTTP_400_BAD_REQUEST)
        book = books[0]
        response = student.borrow(book)
        if response:
            return Response({'response': response}, status=status.HTTP_200_OK)
        return Response({"message": "something went wrong :( , not sure what it is"})

    @action(detail=False, methods=['POST'])
    def return_book(self, request, pk=None):
        if (request.data['student'] == "") or (request.data['student'] == None):
            return Response({'failure': 'Please enter a valid student name'})
        students = Student.objects.filter(name=request.data['student'])
        if not students.exists():
            response = {
                "failure": "The student you entered cannot return a book as they are not part of our records"}
            return Response(response)
        student = students[0]

        if not (student.current_book):
            response = {'failure': "The student has no book to return"}
            return Response(response)

        books = Book.objects.filter(pk=student.current_book.id)
        if not books.exists():
            return Response({'failure': "An error occured"})

        book = books[0]

        response = student.return_book(book)
        if response:
            response = {
                "success": "The book has been successfully returned to the library"}
            return Response(response, status=status.HTTP_200_OK)
        return Response({"failure": "Something went wrong, probably the student had not borrowed any book before"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    @action(detail=False, methods=['POST'])
    def savebook(self, request, pk=None):
        bookinfo = request.data
        books = Book.objects.filter(isbn=request.data['isbn'])
        if books.exists():
            response = {
                'failure': 'Seems like the book is already in the library, try another book'}
            return Response(response, status=status.HTTP_403_FORBIDDEN)
        inlibrary = str(request.data['in_library'])
        book = Book(
            title=bookinfo['title'], isbn=bookinfo['isbn'], author=bookinfo['author'], description=bookinfo['description'], publisher=bookinfo['publisher'], year=bookinfo['year'], in_library=inlibrary.capitalize(), cover_url=bookinfo['cover_url'])
        book.save()

        response = {'success': "Book has been saved sucessfully"}
        return Response(response, status=status.HTTP_201_CREATED)
