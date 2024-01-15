import React from 'react';
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home';
import ExerciseGenerator from '../pages/ExerciseGenerator';
import ExerciseQueue from '../pages/ExerciseQueue';
import ExerciseViewer from '../pages/ExerciseViewer';

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