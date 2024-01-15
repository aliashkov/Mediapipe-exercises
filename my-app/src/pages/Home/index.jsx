import React from 'react';
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate(); 

    const navigateToViewer = () => {
        navigate('/exercise-viewer');
    }

    const navigateToGenerator = () => {
        navigate('/exercise-generator');
    }

    const navigateToQueeeTasks = () => {
        navigate('/exercise-queue');
    }

    return (
        <>
            <div className='button-container'>
                <button onClick={navigateToViewer}>navigate To Viewer</button>
                <button onClick={navigateToGenerator}>navigate To Generator</button>
                <button onClick={navigateToQueeeTasks}>navigate To Queee</button>
            </div>

        </>

    )
}

export default Home;