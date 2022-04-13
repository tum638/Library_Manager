
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
    

        

        
class Student(models.Model):
    name = models.CharField(max_length=100)
    number_of_books_read = models.IntegerField(default=0)
    current_book = models.ForeignKey(Book, on_delete=models.DO_NOTHING, null=True, blank=True)
    
    def borrow(self, book):
        if not self.current_book:
            book = book
            if book.in_library:
                book.in_library = False
                book.save()
                self.current_book = book
                self.number_of_books_read += 1
                self.save()
            else:
                print("Book is not available for borrowing")
        else:
            print("cannot borrow more than one book at once")
    def return_book(self, book):
        if not self.current_book:
            print("student does not have book to return")
        else:
            book = book
            book.in_library = True
            book.save()
            self.current_book = None
            self.save()
    def __str__(self):
        return self.name
        
    
