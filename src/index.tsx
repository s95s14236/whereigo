import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AttractionDetailPage from './views/Attraction/AttractionDetailPage';
import firebaseConfig from './firebase/config';
import { initializeApp } from 'firebase/app';

initializeApp(firebaseConfig);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // if in StrictMode, it will render & useEffect will trigger 2 times on dev mode.
  // <StrictMode>
  <Provider store={store} >
    <BrowserRouter>
      <Routes>
        <Route path="" element={<App />} />
        <Route path="/attraction/:attractionId" element={<AttractionDetailPage />} />
      </Routes>
    </BrowserRouter>
  </Provider>
  // </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
