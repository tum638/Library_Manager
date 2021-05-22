from django.db import models
from django_countries.fields import CountryField

# this is the fucking book model .. incase you didnt know.
HOUSES = [
    ("CHA", "CHAMPAGNAT"),
    ("CHI", "CHICHESTER"),
    ("MIC", "MICHEAL"),
    ("PAT", "PATRICK"),
]


class Student(models.Model):
    fullname = models.CharField(max_length=100, null=True)
    house = models.CharField(max_length=3, choices=HOUSES)
    ref_code = models.CharField(max_length=8)
    has_returned = models.BooleanField(default=False)




    def __str__(self):
        return self.fullname

class Book(models.Model):
    Title = models.CharField(max_length=50)
    acc_no = models.CharField(max_length=12)
    class_no = models.CharField(max_length=12)
    isbn = models.CharField(max_length=32)
    Date = models.DateField(blank=True, auto_now=True)
    borrowed = models.BooleanField(default=False)
    days_left = models.IntegerField(default=14)
    subject = models.CharField(max_length=22)
    Publisher = models.CharField(max_length=32)
    Country = CountryField()
    borrowed_by = models.ForeignKey(Student, on_delete=models.DO_NOTHING, null=True)

    def borrow(self, student):
        self.borrowed = True
        borrowed_by = student
        self.save()

    def __str__(self):
        return self.Title


