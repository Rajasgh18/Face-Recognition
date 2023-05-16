import cv2
import face_recognition

# Load the known face image and encode it
known_face_image = face_recognition.load_image_file("shubham1.jpeg")
known_face_encoding = face_recognition.face_encodings(known_face_image)[0]
print(known_face_image)

# Set the tolerance for face matching
face_match_tolerance = 0.6

# Open the video file
video_file = "42162.MP4"
cap = cv2.VideoCapture(video_file)

# Get the video frame rate
fps = cap.get(cv2.CAP_PROP_FPS) * 60

# Set the frame skip interval
frame_interval = 30

# Set the face detection model
face_detection_model = "hog"

# Loop through the video frames
frame_count = 0
while True:
    # Read a frame from the video
    ret, frame = cap.read()
    if not ret:
        break
    
    # Resize the frame
    frame = cv2.resize(frame, (0, 0), fx=0.5, fy=0.5)
    
    # Process every nth frame
    frame_count += 1
    if frame_count % frame_interval != 0:
        continue
    
    # Convert the frame to RGB
    #rgb_frame = frame[:, :, ::-1]
    
    # Detect faces in the frame
    face_locations = face_recognition.face_locations(frame, model=face_detection_model)
    
    # Draw a rectangle around each face and match it with the known face
    for face_location in face_locations:
        top, right, bottom, left = face_location
        
        # Get the face encoding
        face_encoding = face_recognition.face_encodings(frame, [face_location])[0]
        
        # Compare the face encoding with the known face encoding
        face_match = face_recognition.compare_faces([known_face_encoding], face_encoding, tolerance=face_match_tolerance)
        
        # Draw a rectangle around the face
        color = (0, 0, 255) if not face_match[0] else (0, 255, 0)
        cv2.rectangle(frame, (left, top), (right, bottom), color, 2)
        
        # Save the frame to disk with the timestamp if there's a match
        if face_match[0]:
            timestamp = cap.get(cv2.CAP_PROP_POS_MSEC) // 1000
            print(timestamp)
            #cv2.imwrite(f"frame_{timestamp}.jpg", frame)
    
    # Display the frame
    #cv2.imshow("Video", frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

    # Set the video playback speed
    delay = int(1000 / (fps * frame_interval))
    cv2.waitKey(delay)

# Release the video file and close the window
cap.release()
cv2.destroyAllWindows()