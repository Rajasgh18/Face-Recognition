import os
from flask import Flask, Response, request, abort, render_template_string, send_from_directory, jsonify
from flask_cors import CORS, cross_origin
from PIL import Image
from io import StringIO
import cv2
import numpy as np
import face_recognition
import mysql.connector
import os
from datetime import datetime
import base64


app = Flask(__name__)
CORS(app)

app.debug = True

@app.route('/process_video', methods=['POST'])
def process_video():
    # connect to database
    mydb = mysql.connector.connect(
        host="localhost",
        user="raja",
        password="1234",
        database="shubham"
    )
    mycursor = mydb.cursor()

    # create table to store face encodings and timestamps
    mycursor.execute(
        "CREATE TABLE IF NOT EXISTS faces (id INT AUTO_INCREMENT PRIMARY KEY, encoding TEXT, timestamps TEXT)")

    # read video file from request
    video_file = request.files['videoFile']
    video_path = os.path.join("../Client/public/assets/videos", video_file.filename)
    video_file.save(video_path)

    cap = cv2.VideoCapture(video_path)

    # set parameters
    frame_count = 0
    skip_frames = 10
    resize_factor = 0.25

    # loop through frames
    while cap.isOpened():
        # read frame
        ret, frame = cap.read()

        # check if end of video
        if not ret:
            break

        # skip frames
        if frame_count % skip_frames != 0:
            frame_count += 1
            continue

        # resize frame
        resized_frame = cv2.resize(
            frame, None, fx=resize_factor, fy=resize_factor)

        # detect faces
        face_locations = face_recognition.face_locations(
            resized_frame, model='hog')

        # encode faces
        face_encodings = face_recognition.face_encodings(
            resized_frame, face_locations)

        # write face encodings and timestamps to database
        if len(face_encodings) > 0:
            timestamps = str(int(cap.get(cv2.CAP_PROP_POS_MSEC) // 1000))
            for face_encoding in face_encodings:
                encoding_str = ','.join([str(val) for val in face_encoding])
                sql = "INSERT INTO faces (encoding, timestamps) VALUES (%s, %s)"
                val = (encoding_str, ''.join(timestamps))
                mycursor.execute(sql, val)

        # increment frame count
        frame_count += 1

        # speed up video playback
        cv2.waitKey(1)

    # release video capture and close database connection
    cap.release()
    mydb.commit()
    mycursor.close()
    mydb.close()

    # delete video file from disk
    # os.remove(video_path)

    return 'success'

@app.route('/detect', methods=['POST'])
@cross_origin()
def detect_face():
    # connect to database
    mydb = mysql.connector.connect(
        host="localhost",
        user="raja",
        password="1234",
        database="shubham"
    )
    mycursor = mydb.cursor()

    # get image file from request
    image_file = request.files['image']

    # load known face
    known_image = face_recognition.load_image_file(image_file)
    known_encoding = face_recognition.face_encodings(known_image)[0]

    # search for known face in database
    mycursor.execute("SELECT * FROM faces")
    results = mycursor.fetchall()
    timestamps = []
    for result in results:
        encoding = result[1].split(',')
        encoding = [float(val) for val in encoding]
        face_encoding = [encoding[i:i+128]
                         for i in range(0, len(encoding), 128)][0]
        distance = face_recognition.face_distance(
            [face_encoding], known_encoding)[0]
        if distance < 0.6:
            timestamps += [int(timestamp)
                           for timestamp in result[2].split(',')]

    # close database connection
    mycursor.close()
    mydb.close()

    # return timestamps in JSON format
    if timestamps:
        response = {
            'message': "success",
            'timestamps': timestamps
        }
    else:
        response = {'message': "failed"}
    return jsonify(response)

@app.route('/realtime', methods=["GET"])
def realtime():
    # connect to database
    mydb = mysql.connector.connect(
        host="localhost",
        user="raja",
        password="1234",
        database="shubham"
    )
    # Create a mycursor object to execute SQL queries
    mycursor = mydb.cursor()

    # Create a table to store face encodings and timestamps
    mycursor.execute("CREATE TABLE IF NOT EXISTS face_encodings (id INT AUTO_INCREMENT PRIMARY KEY, encoding TEXT, timestamp DATETIME)")

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
            mycursor.execute(sql, val)
            mydb.commit()
            
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
    mycursor.close()
    mydb.close()
    return "success"

@app.route('/realtime_detection', methods=['POST'])
def realtimeDetection():
    # connect to database
    mydb = mysql.connector.connect(
        host="localhost",
        user="raja",
        password="1234",
        database="shubham"
    )
    # Create a mycursor object to execute SQL queries
    mycursor = mydb.cursor()

    # Load the input image
    input_image = face_recognition.load_image_file(request.files['image'])

    # Detect faces in the input image
    input_face_locations = face_recognition.face_locations(input_image)
    input_face_encodings = face_recognition.face_encodings(
        input_image, input_face_locations)

    # Retrieve known face encodings from the database
    mycursor.execute("SELECT encoding, timestamp FROM face_encodings")
    rows = mycursor.fetchall()

    known_encodings = []
    timestamps = []
    matchedTimestamps = []

    for row in rows:
        encoding_base64 = row[0]
        timestamp = row[1]

        # Decode the base64 string and convert it to face encoding
        face_encoding = np.frombuffer(
            base64.b64decode(encoding_base64), dtype=np.float64)

        # Add the face encoding and timestamp to the lists
        known_encodings.append(face_encoding)
        timestamps.append(timestamp)

    # Compare the input face with known faces
    for input_face_encoding in input_face_encodings:
        # Compare the input face encoding with all known face encodings
        matches = face_recognition.compare_faces(
            known_encodings, input_face_encoding)

        # Find the indexes of matching faces
        matching_indexes = [i for i, match in enumerate(matches) if match]

        for matching_index in matching_indexes:
            # Retrieve the timestamp for the matching face
            matching_timestamp = timestamps[matching_index]
            matchedTimestamps.append((str(timestamps[matching_index])))

    print(matchedTimestamps)
    # Close the database connection
    mycursor.close()
    mydb.close()
    if matching_indexes:
        response = {
            'message': "success",
            'timestamps': matchedTimestamps
        }
    else:
        response = {'message': "failed"}
    return jsonify(response)


if __name__ == '__main__':
    app.run(host='localhost', port=5000)