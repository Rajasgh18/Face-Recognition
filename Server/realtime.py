import face_recognition
import cv2
import numpy as np
import base64
from datetime import datetime
import mysql.connector

# Connect to the MySQL database
db = mysql.connector.connect(
    host="localhost",
    user="raja",
    password="1234",
    database="shubham"
)

# Create a cursor object to execute SQL queries
cursor = db.cursor()

# Create a table to store face encodings and timestamps
cursor.execute("CREATE TABLE IF NOT EXISTS face_encodings (id INT AUTO_INCREMENT PRIMARY KEY, encoding TEXT, timestamp DATETIME)")

# Initialize variables
face_encodings = []
timestamps = []

# Load a sample image for face comparison (optional)
# known_image = face_recognition.load_image_file("known_face.jpg")
# known_encoding = face_recognition.face_encodings(known_image)[0]

# Start video capture
video_capture = cv2.VideoCapture(0)

# Run the loop until 'q' is pressed
while True:
    # Read each frame of the video
    ret, frame = video_capture.read()
    
    # Resize the frame to improve processing speed (optional)
    small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
    
    # Convert the frame from BGR to RGB
    # rgb_frame = small_frame[:, :, ::-1]
    
    # Detect faces in the frame
    face_locations = face_recognition.face_locations(small_frame)
    
    # Encode the faces in the frame
    face_encodings = face_recognition.face_encodings(small_frame, face_locations)
    
    # Get the current timestamp
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    for face_encoding in face_encodings:
        # Convert the encoding to a base64 string
        encoding_base64 = base64.b64encode(face_encoding.tobytes()).decode("utf-8")
        
        # Check if the same face is found within a certain threshold (optional)
        # match = face_recognition.compare_faces([known_encoding], face_encoding)
        
        # Store the face encoding and timestamp in the database
        sql = "INSERT INTO face_encodings (encoding, timestamp) VALUES (%s, %s)"
        val = (encoding_base64, current_time)
        cursor.execute(sql, val)
        db.commit()
        
        # Add the timestamp to the timestamps array
        timestamps.append(current_time)
    
    # Display the resulting image with face rectangles
    for (top, right, bottom, left) in face_locations:
        # Scale back the face locations to the original size
        top *= 4
        right *= 4
        bottom *= 4
        left *= 4
        
        # Draw a rectangle around the face
        cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)
    
    # Display the resulting image
    cv2.imshow('Video', frame)
    
    # Break the loop when 'q' is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the video capture and close the windows
video_capture.release()
cv2.destroyAllWindows()

# Close the database connection
cursor.close()
db.close()