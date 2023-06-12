from flask import Flask

from flask_cors import CORS
from flask_socketio import SocketIO
import cv2
import face_recognition
import numpy as np
import time
app = Flask(__name__)
app.debug = True
CORS(app)

socketio = SocketIO(app, cors_allowed_origins="http://localhost:5173")

@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

@socketio.on('image')
def handle_image(data):
    # Convert the base64 image data to a NumPy array
    image_data = np.frombuffer(data, np.uint8)
    image = cv2.imdecode(image_data, cv2.IMREAD_COLOR)

    # Perform face detection on the received image
    rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    face_locations = face_recognition.face_locations(rgb_image)

    if len(face_locations) > 0:
        timestamp = int(time.time())
        socketio.emit('face_detected', {'timestamp': timestamp})

if __name__ == '__main__':
    socketio.run(app, host='localhost', port=8000)