from ast import Mod
from rest_framework.serializers import ModelSerializer
from .models import Book, Student, Borrow

class BookSerializer(ModelSerializer):
    class Meta:
        model = Book
        queryset = Book.objects.all()
        fields = ['id', 'Title','isbn', 'borrowed','Publisher']

class StudentSerializer(ModelSerializer):
    class Meta:
        model = Student
        queryset = Student.objects.all()
        fields = ['id', 'fullname']
        