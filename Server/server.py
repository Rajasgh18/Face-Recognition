import os
from flask import Flask, Response, request, jsonify
from flask_cors import CORS, cross_origin
from PIL import Image
from io import StringIO
import cv2
import numpy as np
import face_recognition
import mysql.connector
import os
from datetime import datetime
import time


app = Flask(__name__)
CORS(app)

app.debug = True


@app.route('/process_video', methods=['POST'])
@cross_origin()
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
    video_path = os.path.join(
        "../Client/public/assets/videos", video_file.filename)
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


@app.route('/realtime', methods=["POST"])
def realtime():
    # Load the input image
    input_image = face_recognition.load_image_file(request.files['image'])

    # Encode the input image
    input_encoding = face_recognition.face_encodings(input_image)[0]

    # Initialize the video capture
    video_capture = cv2.VideoCapture(0)

    # Initialize the variables for tracking face entry and exit time
    face_enter_time = None
    face_exit_time = None

    resultList = []

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
            matches = face_recognition.compare_faces(
                [input_encoding], face_encoding)
            name = "Unknown"

            if matches[0]:
                if name == "Unknown":

                    start_time_found = time.time()

                name = "User"
                # Print entry time if the user is found
                if face_enter_time is None:
                    face_enter_time = time.ctime()
                    resultList.append("Face entered at:" + face_enter_time)

            # Draw a rectangle around the face
            cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)

            # Write the name of the user or "Unknown" on the frame
            cv2.putText(frame, name, (left, top - 10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 2)

        # Print exit time if the face is no longer detected
        if face_enter_time is not None and len(face_locations) == 0:
            if face_exit_time is None:
                face_exit_time = time.ctime()
                resultList.append("Face exited at:" + face_exit_time)
                face_enter_time = None
                face_exit_time = None

        # Display the resulting frame
        cv2.imshow('Video', frame)

        # Break the loop if 'q' is pressed
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    # Release the video capture and close all windows
    video_capture.release()
    cv2.destroyAllWindows()
    if len(resultList) != 0:
        response = {
            'message': "success",
            'timestamps': resultList
    }
    else:
        response = {'message': "failed"}
    return jsonify(response)

@app.route('/realtime-download', methods=["POST"])
def realtimedown():
    
    # Load the input image
    input_image = face_recognition.load_image_file(request.files['image'])

    # Encode the input image
    input_encoding = face_recognition.face_encodings(input_image)[0]

    # Initialize the video capture
    video_capture = cv2.VideoCapture(0)

    # Initialize the variables for tracking face entry and exit time
    face_enter_time = None
    face_exit_time = None
    framesList = []
    resultList = []

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
            result='face not matched'

            if matches[0]:
                name = "User"
                if face_enter_time is None:
                    face_enter_time = time.ctime()
                    resultList.append("Face entered at:" + face_enter_time)

            
            # Draw a rectangle around the face
            cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)

        # Write the name of the user or "Unknown" on the frame
            cv2.putText(frame, name, (left, top - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 2)
        if face_enter_time is not None and len(face_locations) == 0:
            if face_exit_time is None:
                face_exit_time = time.ctime()
                resultList.append("Face exited at:" + face_exit_time)
                face_enter_time = None
                face_exit_time = None
          
        # Print a message to the console if the user is found
            if name != "Unknown":
                result='user found'
            # Generate a unique filename using timestamp
                timestamp = int(time.time())
                filename = f"photo_{timestamp}.jpg"
            # Save the frame as an image file
                cv2.imwrite("../Client/public/assets/realtimeFrames/"+filename, frame)
                framesList.append(filename)
            #print(f"Photo saved as {filename}!")
            # Print exit time if the face is no longer detected
            
        
    
    # Display the resulting frame
        cv2.imshow('Video', frame)

    # Break the loop if 'q' is pressed
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

# Release the video capture and close all windows
    video_capture.release()
    cv2.destroyAllWindows()

    if len(resultList) != 0:
        response = {
            'message': 'success',
            'timestamps': resultList,
            'frames': framesList
    }
    else:
        response = {'message': 'failed'}
    return jsonify(response)

if __name__ == '__main__':
    app.run(host='localhost', port=5000)
