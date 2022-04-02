from .scanners import runit
from django.http import JsonResponse
import isbnlib
from .models import Book
from .serializers import BookSerializer




def get_book(request):
    isbn = runit(request)
    a = isbnlib.meta(isbn, service='openl')
    print(type(a))
    return JsonResponse(a, safe=False)

def get_from_db(request):
    isbn = runit(request)
    book = Book.objects.get(isbn)


    serialized_book = BookSerializer(book)

    return JsonResponse(serialized_book.data, safe=False)




