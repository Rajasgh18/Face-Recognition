import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const Realtime = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const startVideoStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                videoRef.current.srcObject = stream;
            } catch (error) {
                console.error('Error accessing webcam:', error);
            }
        };

        startVideoStream();
    }, []);

    const sendFrameToServer = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const frameData = canvas.toDataURL('image/jpeg', 0.8);

        socket.emit('video_frame', { frame: frameData });

        requestAnimationFrame(sendFrameToServer);
    };

    useEffect(() => {
        sendFrameToServer();

        // return () => {
        //     socket.disconnect();
        // };
    }, []);

    useEffect(() => {
        socket.on('face_detected', (data) => {
            const { timestamps } = data;
            console.log('Face detected at:', Date(timestamps));
        });
    }, [socket]);

    return (
        <div>
            <video ref={videoRef} autoPlay playsInline />
            <canvas ref={canvasRef} width={640} height={480} style={{ display: 'none' }} />
        </div>
    );
};
export default Realtime;
