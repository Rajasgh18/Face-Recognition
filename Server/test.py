from deepface import DeepFace
import cv2
import pickle
import numpy as np
models = [
  "VGG-Face", 
  "Facenet", 
  "Facenet512", 
  "OpenFace", 
  "DeepFace", 
  "DeepID", 
  "ArcFace", 
  "Dlib", 
  "SFace",
]
image = cv2.imread("contructed.png")
image2 = cv2.imread("JDS02792.JPG")
detector = DeepFace.extract_faces(image, detector_backend= 'retinaface')
print(detector)
face_encoding = detector[0]["face"]
obj = DeepFace.verify(img1_path = image, 
        img2_path = image2, 
        detector_backend = 'retinaface'
)
# dfs = DeepFace.find(img_path = image, 
#         db_path = "uploads", 
#         model_name=models[2],
#         detector_backend = 'retinaface'
# )
print(obj)
# with open("uploads/face_encoding.pkl", "wb") as f:
#    pickle.dump(face_encoding, f)
