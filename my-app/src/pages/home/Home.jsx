import React from 'react';
import { useNavigate } from "react-router-dom";


const Home = () => {

    const navigate = useNavigate(); 

    const navigateToViewer = () => {
        navigate('/exercise-generator');
    }

    const navigateToGenerator = () => {
        navigate('/exercise-generator');
    }

    return (
        <>
            <div className='button-container'>
                <button onClick={navigateToViewer}>navigate To Viewer</button>
                <button onClick={navigateToGenerator}>navigate To Generator</button>
            </div>

        </>

    )
}

export default Home;