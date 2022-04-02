from django.contrib import admin
from .models import Book, Student, Borrow


admin.site.register(Book)
admin.site.register(Student)
admin.site.register(Borrow)
