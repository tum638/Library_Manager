from django.db import models


class Book(models.Model):
    title = models.CharField(max_length=256)
    isbn = models.CharField(max_length=13)
    author = models.CharField(max_length=128)
    description = models.TextField(default="Book Description", null=True, blank=True)
    publisher = models.CharField(max_length=200, null=True, blank=True)
    year = models.CharField(max_length=4, null=True, blank=True)
    in_library = models.BooleanField(default=True)
    
    def __str__(self):
        return self.title
    
    def borrow(self):
        if self.in_library:
            self.in_library = False
            self.save()
            return True
        else:
            return False
        
    def return_book(self):
        if not self.in_library:
            self.in_library = True
            self.save()
            return True
        else:
            return False
        
class Student(models.Model):
    name = models.CharField(max_length=100)
    number_of_books_read = models.IntegerField(default=0)
    current_book = models.ForeignKey(Book, on_delete=models.DO_NOTHING, null=True, blank=True)
    
    def __str__(self):
        return self.name
        
    
