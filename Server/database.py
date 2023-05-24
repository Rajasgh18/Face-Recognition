
import face_recognition
import cv2
import numpy as np
import mysql.connector
import base64
# Connect to the MySQL database
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Vipin2510@",
    database="shubham"
)

# Create a cursor object to execute SQL queries
cursor = db.cursor()

# Load the input image
input_image = face_recognition.load_image_file("shubham1.png")

# Detect faces in the input image
input_face_locations = face_recognition.face_locations(input_image)
input_face_encodings = face_recognition.face_encodings(input_image, input_face_locations)

# Retrieve known face encodings from the database
cursor.execute("SELECT encoding, timestamp FROM face_encodings")
rows = cursor.fetchall()

known_encodings = []
timestamps = []

for row in rows:
    encoding_base64 = row[0]
    timestamp = row[1]
    
    # Decode the base64 string and convert it to face encoding
    face_encoding = np.frombuffer(base64.b64decode(encoding_base64), dtype=np.float64)
    
    # Add the face encoding and timestamp to the lists
    known_encodings.append(face_encoding)
    timestamps.append(timestamp)

# Compare the input face with known faces
for input_face_encoding in input_face_encodings:
    # Compare the input face encoding with all known face encodings
    matches = face_recognition.compare_faces(known_encodings, input_face_encoding)
    
    # Find the indexes of matching faces
    matching_indexes = [i for i, match in enumerate(matches) if match]
    
    for matching_index in matching_indexes:
        # Retrieve the timestamp for the matching face
        matching_timestamp = timestamps[matching_index]
        
        print("Matching face found at:", matching_timestamp)

# Close the database connection
cursor.close()
db.close()