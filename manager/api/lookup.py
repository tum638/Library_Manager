from .scanners import runit
import requests
from django.http import JsonResponse, HttpResponse
import isbnlib
import json
from .models import Book
from .serializers import BookSerializer


def get_book(request):
    a = isbnlib.meta(runit(request), service='openl')
    print(type(a))
    return JsonResponse(a, safe=False)

def get_from_db(request):
    book = Book.objects.get(isbn=runit(request))


    serialized_book = BookSerializer(book)

    return JsonResponse(serialized_book.data, safe=False)




