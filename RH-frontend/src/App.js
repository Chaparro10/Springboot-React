import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListarEmpleados from "./components/ListarEmpleados";
import Navegacion from "./components/components-general/Navegacion";
import AgregarEmpleado from "./components/AgregarEmpleado";
import EditarEmpleado from "./components/EditarEmpleado";


function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Navegacion />
        <Routes>
          <Route exact path="/" element={<ListarEmpleados />} />
          <Route exact path="/agregar" element={<AgregarEmpleado />} />
          <Route exact path="/editar/:id" element={<EditarEmpleado />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
