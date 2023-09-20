import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const AgregarEmpleado = () => {

    const navigate =useNavigate();//Para redirigir elementos

    const valorInicial = {//Objeto con los valores iniciales del formulario
        nombre: '',
        departamento: '',
        sueldo: ''
    }
    const [empleado, setEmpleado] = useState(valorInicial);

    const capturarDatos = (e) => {//Captura los datos de los input
        //Spread operator ... (expandir los atributos)
        const { name, value } = e.target;
        setEmpleado({ ...empleado, [name]: value });
    }

    //************PARA GUARDAR*************** */
    const guardarDatos = async (e) => {//PARA LA PETICION POST
        e.preventDefault();//Para que no se recarge la pagina
        //console.log(usuario);
           
        //crear la logica para la peticion post
        const newEmpleado = {
            nombre: empleado.nombre,
            departamento: empleado.departamento,
            sueldo: empleado.sueldo
           
        }
        try {
            console.log("Aqui estoy")
            await axios.post('http://localhost:8080/rh-app/empleados', newEmpleado);//consume la api de node
            setEmpleado({ ...valorInicial })//Limpia el formulario al enviarlo
            console.log('Usuario creado correctamente.');
            // Redirige a la página listarEmpleados
            navigate('/');

        } catch (error) {
            console.error('Error:', error.message);
           
        } 
    }




    return (
        <div className='container'>
            <div className='container text-center' style={{ margin: '30px' }}>
                <h3>Agregar Empleado</h3>
            </div>
            <form onSubmit={guardarDatos}>
                <div className="mb-3">
                    <label for="nombre" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="nombre" name='nombre' value={empleado.nombre} required  onChange={capturarDatos}/>
                </div>
                <div className="mb-3">
                    <label for="departamento" className="form-label">Departamento</label>
                    <input type="text" className="form-control" id="departamento" name='departamento' value={empleado.Departamento} required onChange={capturarDatos}/>
                </div>
                <div className="mb-3">
                    <label for="sueldo" className="form-label">Sueldo</label>
                    <input type="number" step="any" className="form-control" id="sueldo" name='sueldo' value={empleado.Sueldo} required onChange={capturarDatos}/>
                </div>
                <div className='text-center'>
                    <button type="submit" className="btn btn-warning btn-sm me-3">Agregar</button>
                    <a href='/' className='btn btn-danger btn-sm'>Regresar</a>
                </div>

            </form>
        </div>
    )
}

export default AgregarEmpleado;