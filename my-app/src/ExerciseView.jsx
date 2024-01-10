import { useEffect, useState } from "react";
import { Camera } from "@mediapipe/camera_utils";
import mp from '@mediapipe/pose';
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import './exerciseView.css'

export default function ExerciseView() {

    const drawPoints = () => {
        setSnapshotPoints(points)
    }

    const [points, setPoints] = useState([])
    const [snapshotPoints , setSnapshotPoints] = useState([])

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

                setPoints(results.poseLandmarks)



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


            if (snapshotPoints) {

                
                drawConnectors(
                    canvasCtx,
                    snapshotPoints,
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
                        color: '#ff0000',
                        lineWidth: 3,
                    }
                );
                drawLandmarks(canvasCtx, snapshotPoints, {
                    color: '#ff0000',
                    lineWidth: 0,
                    radius: 3,
                });
                drawLandmarks(canvasCtx, snapshotPoints, {
                    color: '#ff0000',
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
        pose.onResults(onResults);

        const camera = new Camera(videoElement, {
            onFrame: async () => {
                await pose.send({ image: videoElement });
            },
            width: 1280,
            height: 720
        });
        camera.start();
    }, [snapshotPoints]);

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