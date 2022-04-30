import cv2
from pyzbar.pyzbar import decode
from isbnlib import meta, cover, desc
from isbnlib.dev._exceptions import DataNotFoundAtServiceError
from isbnlib._exceptions import NotValidISBNError

def scanner():
    cap = cv2.VideoCapture(0)
    a = True
    
    while a:
        success, frame = cap.read()
        
        for code in decode(frame):
            data = code.data.decode('utf-8')
            if len(data) != 0:
                a = False
                return data
                
        cv2.waitKey(1)

def lookup(code):
    try:
        book_data = meta(code, service='openl')
        book_data['description'] = desc(code)
        try:
            book_data['cover_url_list'] = cover(code)
            book_data['cover_url'] = book_data['cover_url_list']['thumbnail']
        except:
            book_data['cover_url'] = "https://image.pngaaa.com/732/909732-middle.png"
        book_data['parsed_isbn'] = book_data['ISBN-13']
        book_data['Author'] = book_data['Authors'][0]
    except DataNotFoundAtServiceError:
        book_data = {}
        book_data['err_stat'] = True
        book_data['error'] = 'Book not found'
    except NotValidISBNError:
        book_data = {}
        book_data['err_stat'] = True
        book_data['error'] = 'Code not Valid'
        
    if len(book_data) == 0:
        print("book cannot be added")
        
        #
        #cover_url = cover(code)
    return book_data
        
        