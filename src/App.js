import {BrowserRouter,Route,Routes} from 'react-router-dom';
import PartidaIniciada from './pages/PartidaIniciada';
import RegistrarJugadores from './pages/RegistrarJugadores';
import PartidaProvider from './context/PartidaProvider'


function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <PartidaProvider>
      <Routes>
        <Route path="/" element={<RegistrarJugadores/>}/>
        <Route path="/partida" element={<PartidaIniciada/>}/>
      </Routes>
    </PartidaProvider>
    </BrowserRouter>
  </div>
  );
}

export default App;
