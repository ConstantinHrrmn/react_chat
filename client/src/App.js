import React from 'react';

import Chat from './components/Chat/Chat';
import Join from './components/Join/Join';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => (
    <Router>
        <Routes>
            <Route exact path="/" element={<Join />}></Route>
            <Route exact path="/chat" element={<Chat />}></Route>
        </Routes>
    </Router>
);

export default App;