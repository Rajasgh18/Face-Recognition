import cv2
import face_recognition
import datetime

# Load the known face image
known_image = face_recognition.load_image_file("shubham1.jpeg")
known_encoding = face_recognition.face_encodings(known_image)[0]

# Open the video file
video_capture = cv2.VideoCapture("42162.MP4")

# Set the frame rate and the number of frames to capture per second
fps = video_capture.get(cv2.CAP_PROP_FPS)
frames_to_capture = int(fps / 2)  # Capture one frame every half second

# Get the total number of frames in the video
total_frames = int(video_capture.get(cv2.CAP_PROP_FRAME_COUNT))

# Loop through each frame of the video
for i in range(total_frames):
    # Set the video capture position to the current frame
    video_capture.set(cv2.CAP_PROP_POS_FRAMES, i)

    # Read a single frame from the video
    ret, frame = video_capture.read()

    # If the frame is empty, we've reached the end of the video
    if not ret:
        break

    # Resize the frame to a smaller size for faster face detection
    small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)

    # Convert the color scheme from BGR to RGB
     #rgb_small_frame = small_frame[:, :, ::-1]

    # Detect all faces in the frame
    face_locations = face_recognition.face_locations(small_frame)

    # If there are no faces, move to the next frame
    if len(face_locations) == 0:
        continue

    # Get the face encodings for all faces in the frame
    face_encodings = face_recognition.face_encodings(small_frame, face_locations)

    # Loop through each face in the frame
    for (top, right, bottom, left), face_encoding in zip(face_locations, face_encodings):
        # Compare the face encoding with the known face encoding
        results = face_recognition.compare_faces([known_encoding], face_encoding)
        print(results)
        # If the face matches the known face, save the frame with a timestamp
        if results[0]:
            timestamp = str(datetime.timedelta(seconds=i/fps))  # Calculate the timestamp
            filename = f"match_{timestamp}.jpg"  # Set the filename for the saved image
            cv2.imwrite(filename, frame)  # Save the image