from rest_framework.serializers import ModelSerializer
from .models import Book, Student


class BookSerializer(ModelSerializer):
    class Meta:
        model = Book
        queryset = Book.objects.all()
        fields = ['id', 'Title', 'acc_no', 'class_no', 'isbn', 'Date', 'borrowed', 'days_left', 'subject', 'Publisher', 'borrowed_by', 'Country']

class StudentSerializer(ModelSerializer):
    class Meta:
        model = Student
        queryset = Student.objects.all()
        fields = ['id', 'fullname', 'house', 'ref_code', 'has_returned']