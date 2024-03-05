import './App.css';
import SolicitudHorario from './Components/SolicitudHorarioComponent/SolicitudHorario';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SolicitudHorario/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
