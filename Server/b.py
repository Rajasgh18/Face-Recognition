import cv2
import face_recognition

# Load the input image
input_image = face_recognition.load_image_file("shubham1.png")

# Encode the input image
input_encoding = face_recognition.face_encodings(input_image)[0]

# Initialize the video capture
video_capture = cv2.VideoCapture(0)

# Iterate over frames from the video stream
while True:
    # Capture frame-by-frame
    ret, frame = video_capture.read()

    # Convert the frame from BGR color (OpenCV default) to RGB color
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)


    # Find all face locations and encodings in the current frame
    face_locations = face_recognition.face_locations(rgb_frame)
    face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)

    # Iterate over the detected faces
    for (top, right, bottom, left), face_encoding in zip(face_locations, face_encodings):
        # Compare the face encoding with the input image encoding
        matches = face_recognition.compare_faces([input_encoding], face_encoding)
        name = "Unknown"

        if matches[0]:
            name = "User"

        # Draw a rectangle around the face
        cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)

        # Write the name of the user or "Unknown" on the frame
        cv2.putText(frame, name, (left, top - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 2)

        # Print a message to the console if the user is found
        if name != "Unknown":
            print("User found!")

    # Display the resulting frame
    cv2.imshow('Video', frame)

    # Break the loop if 'q' is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the video capture and close all windows
video_capture.release()
cv2.destroyAllWindows()