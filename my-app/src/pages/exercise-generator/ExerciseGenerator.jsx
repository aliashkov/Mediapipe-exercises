import { useEffect, useState } from "react";
import { Camera } from "@mediapipe/camera_utils";
import mp from '@mediapipe/pose';
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import './exerciseGenerator.css'
import { saveAs } from 'file-saver';
import uuid from 'react-uuid';

const CONNECTION_ARRAY = [[11, 12], [11, 13], [13, 15], [15, 17], [12, 14], [14, 16], [16, 18]]

export default function ExerciseGenerator() {

    const [bodyPoints, setBodyPoints] = useState([])
    const [exampleBodyPoints, setExampleBodyPoints] = useState([])
    const similarityArray = []

    const drawPoints = () => {

        const jsonString = JSON.stringify(bodyPoints, null, 2);

        const blobFile = new Blob([jsonString], { type: 'application/json;charset=utf-8' });

        saveAs(blobFile, `${uuid()}.task`);

    }

    const calculateVectors = (bodyPoints, connectionArray) => {

        const x1 = bodyPoints[connectionArray[0]].x
        const x2 = bodyPoints[connectionArray[1]].x

        const y1 = bodyPoints[connectionArray[0]].y
        const y2 = bodyPoints[connectionArray[1]].y

        const delta_x = x1 - x2
        const delta_y = y1 - y2

        const angleInRadians = Math.atan2(delta_y, delta_x);

        // Convert radians to degrees
        const angleInDegrees = (angleInRadians * 180) / Math.PI;

        return angleInDegrees

    }


    const calculateAverageSimilarity = (arr) => {

        if (arr.length === 0) {
            return 0;
        }

        const sum = arr.reduce((acc, value) => acc + value, 0);

        // Calculate the average
        const average = sum / arr.length;

        return average;
    }

    useEffect(() => {

        if (exampleBodyPoints.length > 0 && bodyPoints.length > 0) {

            for (let i = 0; i < CONNECTION_ARRAY.length; i++) {

                let bodyVectorDegree = calculateVectors(bodyPoints, CONNECTION_ARRAY[i])
                let exampleVectorDegree = calculateVectors(exampleBodyPoints, CONNECTION_ARRAY[i])
                const differenceDegree = Math.abs(exampleVectorDegree - bodyVectorDegree)
                similarityArray.push(100 - differenceDegree)

            }

        }

        const similarityObjects = calculateAverageSimilarity(similarityArray);

        console.log(`The average  similarity between two poses: ${similarityObjects}`);


    }, [exampleBodyPoints, bodyPoints]);


    useEffect(() => {
        const videoElement = document.getElementsByClassName("input_video")[0];
        const canvasElement = document.getElementsByClassName("output_canvas")[0];
        const canvasCtx = canvasElement.getContext("2d");

        function onResults(results) {
            if (!canvasCtx) {
                return;
            }

            canvasCtx.save();
            canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
            if (results.poseLandmarks) {

                setBodyPoints(results.poseLandmarks)

                drawConnectors(
                    canvasCtx,
                    results.poseLandmarks,
                    [[11, 12]
                        , [11, 13]
                        , [13, 15]
                        , [15, 17]
                        , [15, 19]
                        , [15, 21]
                        , [17, 19]
                        , [12, 14]
                        , [14, 16]
                        , [16, 18]
                        , [16, 20]
                        , [16, 22]
                        , [18, 20]
                        , [11, 23]
                        , [12, 24]
                        , [23, 24]
                        , [23, 25]
                        , [24, 26]
                        , [25, 27]
                        , [26, 28]
                        , [27, 29]
                        , [28, 30]
                        , [29, 31]
                        , [30, 32]
                        , [27, 31]
                        , [28, 32]
                    ],
                    {
                        color: '#FFFFFF',
                        lineWidth: 3,
                    }
                );
                drawLandmarks(canvasCtx, results.poseLandmarks, {
                    color: 'rgba(255, 255, 255, 0.6)',
                    lineWidth: 0,
                    radius: 3,
                });
                drawLandmarks(canvasCtx, results.poseLandmarks, {
                    color: '#000000',
                    lineWidth: 3,
                    radius: 2,
                });


            }

            canvasCtx.restore();
        }

        const pose = new mp.Pose({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@${mp.VERSION}/${file}`;
            },
        });
        pose.setOptions({
            selfieMode: true,
            modelComplexity: 1,
            smoothLandmarks: true,
            enableSegmentation: true,
            smoothSegmentation: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5,
        });


        const camera = new Camera(videoElement, {
            onFrame: async () => {
                await pose.send({ image: videoElement });
            },
            width: 1280,
            height: 720
        });

        camera.start();
        pose.onResults(onResults);

    }, [exampleBodyPoints]);

    return (
        <div className="container">
            <video hidden className="input_video"></video>
            <div className="container-canvas">
                <canvas className="output_canvas" width="1280px" height="720px"></canvas>
                <button id="snapshotButton" onClick={drawPoints} className="snapshotButton">Snapshot</button>
            </div>

        </div>
    );
}