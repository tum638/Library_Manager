from django.urls import path
from .views import entry, BooksList, BorrowsList, borrow
from .lookup import get_book, get_from_db

urlpatterns = [
    path('entry/', entry),
    path('books/', BooksList.as_view()),
    path('borrows-list', BorrowsList.as_view()),
    path('borrow', borrow)

]
