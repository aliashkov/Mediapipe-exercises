import { useEffect, useState, useRef } from "react";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import './exerciseViewer.css'

const CONNECTION_ARRAY = [[11, 12], [11, 13], [13, 15], [15, 17], [12, 14], [14, 16], [16, 18]]

export default function ExerciseViewer() {

    const [exampleBodyPoints, setExampleBodyPoints] = useState([
        {
            "x": 0.4159049987792969,
            "y": 0.40469449758529663,
            "z": -0.7266784906387329,
            "visibility": 0.9996132850646973
        },
        {
            "x": 0.4377051889896393,
            "y": 0.3392797112464905,
            "z": -0.6787196397781372,
            "visibility": 0.9989156723022461
        },
        {
            "x": 0.45093268156051636,
            "y": 0.3400728702545166,
            "z": -0.6787124872207642,
            "visibility": 0.9989563226699829
        },
        {
            "x": 0.4627370238304138,
            "y": 0.3409394323825836,
            "z": -0.679347038269043,
            "visibility": 0.99873948097229
        },
        {
            "x": 0.4001635015010834,
            "y": 0.33208462595939636,
            "z": -0.6899768710136414,
            "visibility": 0.9992253184318542
        },
        {
            "x": 0.38624921441078186,
            "y": 0.3286346197128296,
            "z": -0.6895160675048828,
            "visibility": 0.9993874430656433
        },
        {
            "x": 0.3727418780326843,
            "y": 0.32675498723983765,
            "z": -0.6899858117103577,
            "visibility": 0.99933260679245
        },
        {
            "x": 0.47749561071395874,
            "y": 0.35698622465133667,
            "z": -0.372085303068161,
            "visibility": 0.9985401630401611
        },
        {
            "x": 0.3514721393585205,
            "y": 0.3376938998699188,
            "z": -0.41117018461227417,
            "visibility": 0.9994329214096069
        },
        {
            "x": 0.43308693170547485,
            "y": 0.4688059389591217,
            "z": -0.6114669442176819,
            "visibility": 0.9994747638702393
        },
        {
            "x": 0.3884434103965759,
            "y": 0.4674393832683563,
            "z": -0.6222273111343384,
            "visibility": 0.9996766448020935
        },
        {
            "x": 0.5505102872848511,
            "y": 0.6638391017913818,
            "z": -0.12796171009540558,
            "visibility": 0.9988273978233337
        },
        {
            "x": 0.22439463436603546,
            "y": 0.692920982837677,
            "z": -0.30469417572021484,
            "visibility": 0.9992827773094177
        },
        {
            "x": 0.7022708058357239,
            "y": 0.9301472902297974,
            "z": -0.00036095856921747327,
            "visibility": 0.5009449124336243
        },
        {
            "x": 0.16235730051994324,
            "y": 1.0813151597976685,
            "z": -0.3049398362636566,
            "visibility": 0.5169293880462646
        },
        {
            "x": 0.873604416847229,
            "y": 1.1848700046539307,
            "z": -0.24898281693458557,
            "visibility": 0.2087462991476059
        },
        {
            "x": 0.103127121925354,
            "y": 1.5301893949508667,
            "z": -0.6197420358657837,
            "visibility": 0.16628892719745636
        },
        {
            "x": 0.9486557245254517,
            "y": 1.2866722345352173,
            "z": -0.3104006052017212,
            "visibility": 0.2108294665813446
        },
        {
            "x": 0.06433533132076263,
            "y": 1.6470849514007568,
            "z": -0.7081683874130249,
            "visibility": 0.16004042327404022
        },
        {
            "x": 0.9347675442695618,
            "y": 1.3019863367080688,
            "z": -0.39465218782424927,
            "visibility": 0.3054332435131073
        },
        {
            "x": 0.09683867543935776,
            "y": 1.6645848751068115,
            "z": -0.8113793134689331,
            "visibility": 0.2290428727865219
        },
        {
            "x": 0.8986533284187317,
            "y": 1.2872509956359863,
            "z": -0.30244770646095276,
            "visibility": 0.2977307140827179
        },
        {
            "x": 0.11877111345529556,
            "y": 1.6173590421676636,
            "z": -0.6756125688552856,
            "visibility": 0.21996186673641205
        },
        {
            "x": 0.4998754858970642,
            "y": 1.5261086225509644,
            "z": -0.011624802835285664,
            "visibility": 0.004114879760891199
        },
        {
            "x": 0.2813093066215515,
            "y": 1.5391583442687988,
            "z": 0.014569194987416267,
            "visibility": 0.00340355490334332
        },
        {
            "x": 0.4965958595275879,
            "y": 2.225893497467041,
            "z": -0.06306885182857513,
            "visibility": 0.005419036373496056
        },
        {
            "x": 0.2942816913127899,
            "y": 2.2458364963531494,
            "z": -0.004952623043209314,
            "visibility": 0.002872311510145664
        },
        {
            "x": 0.49916401505470276,
            "y": 2.8920633792877197,
            "z": 0.3509431779384613,
            "visibility": 0.0009688955033197999
        },
        {
            "x": 0.29975593090057373,
            "y": 2.898463010787964,
            "z": 0.22048917412757874,
            "visibility": 0.0002087386674247682
        },
        {
            "x": 0.5011478662490845,
            "y": 2.996321678161621,
            "z": 0.36640605330467224,
            "visibility": 0.000855336373206228
        },
        {
            "x": 0.29590320587158203,
            "y": 3.0013577938079834,
            "z": 0.22495758533477783,
            "visibility": 0.0005874463822692633
        },
        {
            "x": 0.478915274143219,
            "y": 3.076253890991211,
            "z": -0.07809685170650482,
            "visibility": 0.0011432180181145668
        },
        {
            "x": 0.32795193791389465,
            "y": 3.078160524368286,
            "z": -0.27063530683517456,
            "visibility": 0.0005379514186643064
        }
    ])

    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);


    console.log(windowSize)

    const handleFile = () => {

    }

    const drawPoints = () => {
        //setExampleBodyPoints(bodyPoints)

        //const jsonString = JSON.stringify(exampleBodyPoints, null, 2);

        //const blobFile = new Blob([jsonString], { type: 'application/json;charset=utf-8' });

        //saveAs(blobFile, 'bodyPoints.txt');

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

    useEffect(() => {
        const canvasElement = document.getElementsByClassName("output_canvas")[0];
        const canvasCtx = canvasElement.getContext("2d");


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

    }, [exampleBodyPoints , windowSize]);

    return (
        <div className="container">

            <div className="container-canvas">
                <canvas className="output_canvas" width={0.8 * windowSize[0]} height={0.8 * windowSize[1]}></canvas>

                <button id="uploadButton" onClick={drawPoints} className="uploadButton">Upload</button>
                <input type="file" style={{ display: 'none' }} />

            </div>

        </div>
    );
}