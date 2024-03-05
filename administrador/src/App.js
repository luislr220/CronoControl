import './App.css';
import SolicitudHorario from './Components/SolicitudHorarioComponent/SolicitudHorario';
import ValidarSolis from "./Components/ValidarSolisComponent/ValidarSolis";
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SolicitudHorario/>}/>
          <Route path='/validar' element={<ValidarSolis/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
