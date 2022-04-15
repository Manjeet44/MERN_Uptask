import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import Login from './paginas/Login';
import Registrar from './paginas/Registrar';
import NuevoPassword from './paginas/NuevoPassword';
import OlvidePassword from './paginas/OlvidePassword';
import ConfirmarCuenta from './paginas/ConfirmarCuenta';
import RutaProtegida from './layouts/RutaProtegida';
import Proyectos from './paginas/Proyectos';

import {AuthProvaider} from './context/AuthProvaider';

function App() {

  return (
    <BrowserRouter>
      <AuthProvaider>
        <Routes>
          <Route path="/" element={<AuthLayout/>}>
            <Route index element={<Login/>} />
            <Route path="registrar" element={<Registrar />} />
            <Route path="olvide-password" element={<OlvidePassword />} />
            <Route path="olvide-password/:token" element={<NuevoPassword />} />
            <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
          </Route>
          <Route path="/proyectos" element={<RutaProtegida/>}>
            <Route index element={<Proyectos/>} />
          </Route>
        </Routes>
      </AuthProvaider>
    </BrowserRouter>
  )
}

export default App
