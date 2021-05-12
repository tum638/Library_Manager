from .scanners import runit
import requests
from django.http import JsonResponse, HttpResponse
import isbnlib
import json


def get_book(request):
    a = isbnlib.meta(runit(request), service='openl')
    print(type(a))
    return JsonResponse(a, safe=False)

