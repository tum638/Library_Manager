import cv2
from pyzbar.pyzbar import decode
from isbnlib import meta, cover, desc
from isbnlib.dev._exceptions import DataNotFoundAtServiceError

def scanner():
    cap = cv2.VideoCapture(0)
    a = True
    
    while a:
        success, frame = cap.read()
        
        for code in decode(frame):
            data = code.data.decode('utf-8')
            if len(data) != 0:
                return data
                a = False
                break
        cv2.waitKey(1)

def lookup(code):
    try:
        book_data = meta(code, service='openl')
    except DataNotFoundAtServiceError:
        book_data = {}
        
    if len(book_data) == 0:
        print("book cannot be added")
        
        #description = desc(code)
        #cover_url = cover(code)
        #print(book_data)
        #print(description)
        #print(cover_url)
    return book_data
        
        