import cv2
import face_recognition
import time

def realtime(input_image_path,name):
    # Load the input image
    input_image = face_recognition.load_image_file(input_image_path)

    # Encode the input image
    input_encoding = face_recognition.face_encodings(input_image)[0]

    # Initialize the video capture
    video_capture = cv2.VideoCapture(0)

    # Initialize the variables for tracking face entry and exit time
    face_enter_time = None
    face_exit_time = None
    
    result='face not detected'

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
                if name == "Unknown":
                    
                    start_time_found = time.time()
                      
                name = "User"
                # Print entry time if the user is found
                if face_enter_time is None:
                    face_enter_time = time.ctime()
                    print("Face entered at:", face_enter_time)


            # Draw a rectangle around the face
            cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)

            # Write the name of the user or "Unknown" on the frame
            cv2.putText(frame, name, (left, top - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 2)
        
                    
        # Print exit time if the face is no longer detected
        if face_enter_time is not None and len(face_locations) == 0:
            if face_exit_time is None:
                face_exit_time = time.ctime()
                print("Face exited at:", face_exit_time)
                face_enter_time = None
                face_exit_time = None


        # Display the resulting frame
        cv2.imshow('Video', frame)

        # Break the loop if 'q' is pressed
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    print(result)
    # Release the video capture and close all windows
    video_capture.release()
    cv2.destroyAllWindows()

# Call the function with the path to the input imager
name=str(input('Enter the name of person'))
realtime("shubham1.png",name)
