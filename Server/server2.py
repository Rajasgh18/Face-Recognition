from flask import Flask, request, jsonify
import cv2
import numpy as np
import face_recognition
import mysql.connector
import os
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173/",
]
app.debug = True

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


@app.route('/process_video', methods=['POST'])
@cross_origin()
def process_video():
    # read video file from request
    video_file = request.files['videoFile']
    video_path = os.path.join(os.getcwd(), video_file.filename)
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

    return 'Video processed successfully!'


@app.route('/detect', methods=['POST'])
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
    print(image_file)

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
            'message': 'The face was detected at the following timestamps:',
            'timestamps': timestamps
        }
    else:
        response = {'message': 'The face was not detected in the video.'}
    return jsonify(response)

@app.route('/hello', methods=['GET'])
def hello():
    # username = request.form['username']
    # password = request.form['password']
    data = {"firstName": "Raja", "lastName": "Singh"}
    return jsonify(data);


if __name__ == '__main__':
    app.run(host='localhost', port='5000')
