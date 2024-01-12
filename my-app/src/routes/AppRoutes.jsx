import React from 'react';
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/home/Home';
import ExerciseViewer from '../pages/exercise-viewer/ExerciseViewer';
import ExerciseGenerator from '../pages/exercise-generator/ExerciseGenerator';
import ExerciseQueue from '../pages/exercise-queue/ExerciseQueue';

const AppRoutes = (props) => {

    return (

        <>
            <Routes>
                <Route path="/" element={
                    <Home />
                } />
                <Route path="/exercise-generator" element={
                    <ExerciseGenerator />
                } />
                <Route path="/exercise-viewer" element={
                    <ExerciseViewer />
                } />
                <Route path="/exercise-queue" element={
                    <ExerciseQueue />
                } />

            </Routes>
        </>
    );
}

export default AppRoutes;