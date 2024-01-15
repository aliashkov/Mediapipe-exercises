import { useEffect, useState, useRef, useMemo } from "react";
import { Camera } from "@mediapipe/camera_utils";
import mp from '@mediapipe/pose';
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import './exerciseQueue.css'
import jsonTasks from '../../tasks/exercises.json';
import { calculateVectors } from "../../utils/calculateVectors";
import { calculateAverageSimilarity } from "../../utils/calculateAverageSimilarity";

const CONNECTION_ARRAY = [[11, 12], [11, 13], [13, 15], [15, 17], [12, 14], [14, 16], [16, 18]]
const DELAY_TASKS = 5000
const INITIAL_ACCURACY = 100

export default function ExerciseQueue() {

    const [bodyPoints, setBodyPoints] = useState([])
    const [exampleBodyPoints, setExampleBodyPoints] = useState([])
    const [dataTasks, setDataTasks] = useState(null);
    const [queueTasks, setQueueTasks] = useState([])
    const [accuracyTask, setAccuracyTask] = useState(null)
    const [isExerciseFinished, setIsExerciseFinished] = useState(false)
    const [arrayAccuracy , setArrayAccuracy] = useState([])


    const [displayResults, setDisplayResults] = useState(false)
    const similarityArray = []
    const counterRef = useRef(0);
    const poseInstanceRef = useRef(null);


    const shuffleIndexes = (jsonData) => {
        const indices = Array.from({ length: jsonData.length }, (_, index) => index);

        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }

        return indices
    }

    useEffect(() => {
        const fetchData = () => {
            try {
                const jsonData = JSON.parse(JSON.stringify(jsonTasks));
                if (jsonData) {
                    const indexes = shuffleIndexes(jsonData)
                    setQueueTasks(indexes)

                }
                setDataTasks(jsonData)
            } catch (error) {
                alert('Error fetching JSON:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {

        if (queueTasks && dataTasks) {
            const refreshExercise = setInterval(() => {

                try {
                    if (counterRef.current < queueTasks.length) {

                        setExampleBodyPoints(dataTasks[queueTasks[counterRef.current]])

                        counterRef.current += 1;

                        setDisplayResults(true)

                        if (counterRef.current >= queueTasks.length) {
                            clearInterval(refreshExercise);
                        }
                    }
                } catch (error) {

                }

            }, DELAY_TASKS);
            return () => clearInterval(refreshExercise);
        }

    }, [counterRef, queueTasks, dataTasks]);


    useEffect(() => {

        try {
            if (exampleBodyPoints && bodyPoints) {
                if (exampleBodyPoints.length > 0 && bodyPoints.length > 0) {
                    for (let i = 0; i < CONNECTION_ARRAY.length; i++) {

                        let bodyVectorDegree = calculateVectors(bodyPoints, CONNECTION_ARRAY[i])
                        
                        let exampleVectorDegree = calculateVectors(exampleBodyPoints, CONNECTION_ARRAY[i])

                        const differenceDegree = Math.abs(exampleVectorDegree - bodyVectorDegree)

                        similarityArray.push(INITIAL_ACCURACY - differenceDegree)
                    }          
                          
                    const similarityObjects = calculateAverageSimilarity(similarityArray);

                    if (displayResults && accuracyTask) {
                        console.log('=======================================================');
                        console.log(`The average  similarity between two poses: ${accuracyTask}`);
                        setArrayAccuracy([...arrayAccuracy , accuracyTask])
                    }
                    else if (counterRef.current === queueTasks.length && !isExerciseFinished) {
                        setIsExerciseFinished(true)
                        const lastExerciseTimeout = setTimeout(() => {
                            setExampleBodyPoints([])

                        }, DELAY_TASKS);
                    }

                    setAccuracyTask(similarityObjects)

                    setDisplayResults(false)

                }
                else if (accuracyTask && isExerciseFinished) {
                    setIsExerciseFinished(false)
                    console.log('=======================================================');
                    console.log(`The average  similarity between two poses: ${accuracyTask}`);
                    setArrayAccuracy([...arrayAccuracy , accuracyTask])
                }
            }

           
        } catch (error) {

        }

    }, [exampleBodyPoints, bodyPoints, counterRef, accuracyTask]);

    useEffect(() => {

        const videoElement = document.getElementsByClassName("input_video")[0];
        const canvasElement = document.getElementsByClassName("output_canvas")[0];
        const canvasCtx = canvasElement.getContext("2d");

        function onResults(results) {
            if (!canvasCtx) {
                return;
            }
            setBodyPoints(results.poseLandmarks)

            canvasCtx.save();
            canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

            canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

            if (results.poseLandmarks) {

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
                        color: '#ffffff',
                        lineWidth: 3,
                    }
                );
                drawLandmarks(canvasCtx, results.poseLandmarks, {
                    color: '#ffffff',
                    lineWidth: 0,
                    radius: 3,
                });
                drawLandmarks(canvasCtx, results.poseLandmarks, {
                    color: '#ffffff',
                    lineWidth: 3,
                    radius: 2,
                });

            }

            canvasCtx.restore();
        
            

            if (exampleBodyPoints) {


                drawConnectors(
                    canvasCtx,
                    exampleBodyPoints,
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
                drawLandmarks(canvasCtx, exampleBodyPoints, {
                    color: '#ff0000',
                    lineWidth: 0,
                    radius: 3,
                });
                drawLandmarks(canvasCtx, exampleBodyPoints, {
                    color: '#ff0000',
                    lineWidth: 3,
                    radius: 2,
                });

            }

            canvasCtx.restore();
        }

        if (!poseInstanceRef.current) {
            poseInstanceRef.current = new mp.Pose({
                locateFile: (file) => {
                    return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@${mp.VERSION}/${file}`;
                },
            });
            poseInstanceRef.current.setOptions({
                selfieMode: true,
                modelComplexity: 1,
                smoothLandmarks: true,
                enableSegmentation: true,
                smoothSegmentation: true,
                minDetectionConfidence: 0.5,
                minTrackingConfidence: 0.5,
            });
        }

        const camera = new Camera(videoElement, {
            onFrame: async () => {
                await poseInstanceRef.current.send({ image: videoElement });
            },
            width: 1280,
            height: 720
        });

        camera.start();
        poseInstanceRef.current.onResults(onResults);


    }, [exampleBodyPoints]);

    return (
        <div className="container">
            <video hidden className="input_video"></video>
            <div className="container-canvas">
                <canvas className="output_canvas" width="1280px" height="720px"></canvas>
            </div>

        </div>
    );
}