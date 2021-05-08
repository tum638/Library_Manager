import cv2
from django.http import JsonResponse
from django.shortcuts import redirect

from pyzbar.pyzbar import decode

from playsound import playsound
import time

def runit(request):


	cap = cv2.VideoCapture(0)

	camera = True

	while camera:
		success, frame = cap.read()





		for code in decode(frame):
			code_type = code.type
			data = code.data.decode('utf-8')
			if len(data) != 0:
				return data
				camera = False
				

				break

		cv2.waitKey(1)
		





	
