import { BrowserRouter } from 'react-router-dom'
import Router from '../Router';
import AppContext from './Context';
import { useState } from 'react';
import '../../styles/App.css'
import Header from '../../shared/Header';
import Footer from '../../shared/Footer'
function App() {

  const [sbData, setSbData] = useState({})
  const data = {
    sbData, setSbData,
  }
  return (
    <AppContext.Provider value={data}>
      <BrowserRouter>
        <div className='App '>

          <Router />

        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
