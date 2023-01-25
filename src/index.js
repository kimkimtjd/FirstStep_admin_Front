import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Main from './Main/Main';
import ConsultingDetail from './Mentor/ConsultingDetail';
import ClassDetail from './Mentor/ClassDetail';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Main" element={<Main/>} />
        <Route path="/Main/Wait" element={<Main/>} />
        <Route path="/Main/Active" element={<Main/>} />
        <Route path="/Consulting/Detail/:id" element={<ConsultingDetail/>} />
        <Route path="/Class/Detail/:id" element={<ClassDetail/>} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
