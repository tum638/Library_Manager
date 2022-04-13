from rest_framework.serializers import ModelSerializer
from .models import Book, Student

class BookSerializer(ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'
        
class StudentSerializer(ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'