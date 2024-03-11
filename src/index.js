import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './main.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// Use root.render to render your app
root.render(
  <Router>
    <App />
  </Router>
);




// import React from 'react';
// // import ReactDOM from 'react-dom';
// import { createRoot } from "react-dom/client";
// import { BrowserRouter as Router } from 'react-router-dom';

// import App from './App';
// import './main.css';

// const rootElement = document.getElementById("root");
// const root = createRoot(rootElement);

// root.render(
//   <Router>
//     <App />
//   </Router>,
//   document.getElementById('root'),
// );



// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";

// import App from "./App";

// const rootElement = document.getElementById("root");
// const root = createRoot(rootElement);

// root.render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );


