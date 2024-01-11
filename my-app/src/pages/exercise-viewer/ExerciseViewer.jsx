import { useEffect, useState, useRef } from "react";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import './exerciseViewer.css'

const CONNECTION_ARRAY = [[11, 12], [11, 13], [13, 15], [15, 17], [12, 14], [14, 16], [16, 18]]

export default function ExerciseViewer() {

    const [exampleBodyPoints, setExampleBodyPoints] = useState([])

    console.log(exampleBodyPoints)

    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    const [file, setFile] = useState(null)


    const handleFile = async (event) => {
        setFile(event.target.files[0]);

        const reader = new FileReader();

        if (event.target.files[0]) {
            try {
                const fileContent = await readFileContent(event.target.files[0]);

                const jsonData = await JSON.parse(fileContent);
                console.log('JSON parsed:', jsonData);
                console.log(jsonData[0].hasOwnProperty('x'))
                if (isValidJsonFormat(jsonData)) {
                    setExampleBodyPoints(jsonData)
                } else {
                    alert('JSON does not match the expected format.');
                }
            } catch (error) {
                alert('Error parsing JSON:', error.message);
            }
        }
    };

    const readFileContent = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (error) => reject(error);
            reader.readAsText(file);
        });
    };

    const isValidJsonFormat = (jsonData) => {

        return (jsonData && jsonData.length === 33 &&
            jsonData[0].hasOwnProperty('x') && jsonData[0].hasOwnProperty('y'));
    };

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

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    useEffect(() => {
        const canvasElement = document.getElementsByClassName("output_canvas")[0];
        const canvasCtx = canvasElement.getContext("2d");

        if (exampleBodyPoints) {
            canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
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

    }, [exampleBodyPoints, windowSize]);

    return (
        <div className="container">

            <div className="container-canvas">

                <canvas className="output_canvas" width={0.8 * windowSize[0]} height={0.8 * windowSize[1]}></canvas>

                <form action="/form/sumbit" method="get">

                    <label className="upload">
                        <input type="file" required accept=".task" onChange={handleFile} />
                        <span>Upload</span>
                    </label>



                </form>

            </div>

        </div>
    );
}