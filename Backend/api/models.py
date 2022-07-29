
from django.db import models
import datetime


class Book(models.Model):
    title = models.CharField(max_length=256)
    isbn = models.CharField(max_length=13)
    author = models.CharField(max_length=128)
    description = models.TextField(
        default="Book Description", null=True, blank=True)
    publisher = models.CharField(max_length=200, null=True, blank=True)
    year = models.CharField(max_length=4, null=True, blank=True)
    in_library = models.BooleanField(default=True)
    cover_url = models.URLField(blank=True)
    date_borrowed = models.DateField(get_date_borrowed)

    def __str__(self):
        return self.title


class Student(models.Model):
    name = models.CharField(max_length=100)
    number_of_books_read = models.IntegerField(default=0)
    current_book = models.OneToOneField(
        Book, on_delete=models.DO_NOTHING, null=True, blank=True, related_name='student_with_book')

    def borrow(self, book):
        if not self.current_book:
            book = book
            if book.in_library:
                book.in_library = False
                book.save()
                self.current_book = book
                self.number_of_books_read += 1
                self.save()
                return True
            else:
                error = "Book is not available for borrowing"
                return error
        else:
            error = "cannot borrow more than one book at once"
            return error

    def return_book(self, book):
        if not self.current_book:

            return False
        else:
            book.in_library = True
            book.save()
            self.current_book = None
            self.save()
            return True

    def __str__(self):
        return self.name
