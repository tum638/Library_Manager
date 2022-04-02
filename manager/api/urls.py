from django.urls import path
from .views import entry, BooksList, BorrowsList
from .lookup import get_book, get_from_db

urlpatterns = [
    path('entry/', entry),
    path('books/', BooksList.as_view()),
    path('borrows', BorrowsList.as_view())

]
