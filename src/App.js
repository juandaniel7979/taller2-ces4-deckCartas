import {BrowserRouter,Route,Routes} from 'react-router-dom';
import RegistrarJugadores from './components/RegistrarJugadores';
import PartidaProvider from './context/PartidaProvider'


function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <PartidaProvider>
      <Routes>
        <Route path="/" element={<RegistrarJugadores/>}/>
      </Routes>
    </PartidaProvider>
    </BrowserRouter>
  </div>
  );
}

export default App;
