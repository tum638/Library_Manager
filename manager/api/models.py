from django.db import models

class Student(models.Model):
    fullname = models.CharField(max_length=200, null=True, blank=True)
    total_books = models.IntegerField(default=0)
    
    def __str__(self):
        return self.fullname
    
class Book(models.Model):
    Title = models.CharField(max_length=300)
    isbn = models.CharField(max_length=32)
    Publisher = models.CharField(max_length=100)
    borrowed = models.BooleanField(default=False)
    author = models.CharField(max_length=100)
    
    def __str__(self):
        return self.Title
    
class Borrow(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.SET_NULL, null=True)
    returned = models.BooleanField(default=False)
    overdue = models.BooleanField(default=False)
    date_borrowed = models.DateField(auto_now_add=True)
    
    def __str__(self):
        return self.book.Title + ' borrowed by ' + self.student.fullname
    
    