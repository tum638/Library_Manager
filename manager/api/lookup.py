from .scanners import runit
import requests
from django.http import JsonResponse, HttpResponse


def get_book(request):
    url = f"https://openlibrary.org/api/books?bibkeys=ISBN:{runit(request)}&jscmd=data&format=json"


    a = requests.get(url)

    return JsonResponse(a.json(), safe=False)

