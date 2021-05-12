from .views import index
from django.urls import path

urlpatterns = [
    path('', index),
    path('borrow/', index),
    path('return/', index),
    path('enter-book/', index),
    path('enter-student/', index),
    path('book-list/', index)
]
