import React from 'react'; // Import React
import ReactDOM from 'react-dom/client'; // Import React
import './index.css'; // Import your CSS file
import App from './App.jsx'; // Import your main App component
import DataProvider from './Components/DataProvider/DataProvider.jsx';
import {initialState,reducer} from './Utility/reducer.js'
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <DataProvider reducer={reducer} initialState={initialState}>
<App />
    </DataProvider>
    
  </React.StrictMode>
);
