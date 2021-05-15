from django.db import models
from django_countries.fields import CountryField

# this is the fucking book model .. incase you didnt know.

class Book(models.Model):
    title = models.CharField(max_length=50)
    acc_no = models.CharField(max_length=12)
    class_no = models.CharField(max_length=12)
    isbn = models.CharField(max_length=32)
    date = models.DateField(blank=True, auto_now=True)
    borrowed = models.BooleanField(default=False)
    days_left = models.IntegerField(default=14)
    subject = models.CharField(max_length=22)
    publisher = models.CharField(max_length=32)
    country = CountryField()

    def __str__(self):
        return self.title

HOUSES = [
    ("CHA", "CHAMPAGNAT"),
    ("CHI", "CHICHESTER"),
    ("MIC", "MICHEAL"),
    ("PAT", "PATRICK"),
]

class Student(models.Model):
    fullname = models.CharField(max_length=100)
    house = models.CharField(max_length=3, choices=HOUSES)
    ref_code = models.CharField(max_length=8)
    borrowed_book = models.ForeignKey(Book, on_delete=models.DO_NOTHING, blank=True, null=True)
    has_returned = models.BooleanField(default=False)

    def borrow_book(self, book):
        book.borrowed = True
        self.borrowed_book = book
        book.save()
        self.save()


    def __str__(self):
        return self.fullname
