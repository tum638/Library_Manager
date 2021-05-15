from rest_framework.serializers import ModelSerializer
from .models import Book, Student


class BookSerializer(ModelSerializer):
    class Meta:
        model = Book
        queryset = Book.objects.all()
        fields = ['id', 'title', 'acc_no', 'class_no', 'isbn', 'date', 'borrowed', 'days_left', 'subject', 'publisher', 'country']

class StudentSerializer(ModelSerializer):
    class Meta:
        model = Student
        queryset = Student.objects.all()
        fields = ['id', 'fullname', 'house', 'ref_code', 'borrowed_book', 'has_returned']