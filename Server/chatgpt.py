from flask import Flask, request, jsonify
import cv2
import numpy as np
import face_recognition
import mysql.connector
import os

app = Flask(__name__)

# connect to database
mydb = mysql.connector.connect(
  host="localhost",
  user="raja",
  password="12344321",
  database="shubham"
)
mycursor = mydb.cursor()

# create table to store face encodings and timestamps
mycursor.execute("CREATE TABLE IF NOT EXISTS faces (id INT AUTO_INCREMENT PRIMARY KEY, encoding TEXT, timestamps TEXT)")

@app.route('/detect', methods=['POST'])
def detect_face():
    # connect to database
    mydb = mysql.connector.connect(
      host="localhost",
      user="raja",
      password="12344321",
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
        face_encoding = [encoding[i:i+128] for i in range(0, len(encoding), 128)][0]
        distance = face_recognition.face_distance([face_encoding], known_encoding)[0]
        if distance < 0.6:
            timestamps += [int(timestamp) for timestamp in result[2].split(',')]

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


if __name__ == '__main__':
    app.run(host='localhost', port='5000')
