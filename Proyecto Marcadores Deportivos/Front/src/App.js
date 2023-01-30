
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
//mis componentes
import { CompShowUsers } from './deportes/Mostrarusuarios.jsx'
import { CompCreateUser } from './deportes/Crearusuarios.jsx'
import { CompEditUser } from './deportes/EditUsuario.jsx'
import {CompCrearEventos} from './deportes/CrearEvento.jsx'
import {CompMostrarEvento} from './deportes/MostrarEvento.jsx'
import {CompEditEvento} from './deportes/EditarEvento.jsx'
import {Admin} from './deportes/Admin.jsx'
import {Logo} from './deportes/Logo.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavBarComp} from './deportes/NavbarComp.jsx'
import {Login} from './deportes/Login.jsx'
//import {Principal} from './deportes/Presentacion.jsx'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Logo />
      </header>
      <BrowserRouter>

                      <Routes>
                        <Route path= '/' element= { <NavBarComp />} >
                          
                              <Route path= '/ad' element= { <Admin />} />
                              <Route path= '/users' element= { <CompShowUsers />} />
                              <Route path= '/login' element= { <Login />} />
                              <Route path= '/create' element= { <CompCreateUser />} />
                              <Route path= '/editevento/:id' element = {<CompEditUser />} />
                              <Route path= '/regeventos' element = {<CompCrearEventos />} />
                              <Route path= '/sheventos' element = {<CompMostrarEvento />} />
                              <Route path= '/editarevento/:_id' element = {<CompEditEvento />} />
                              <Route path='*' element={ <Navigate replace to="/"/> }/>
                        </Route>
                      </Routes>
      
      </BrowserRouter>

    </div>
  );
}

export default App;
