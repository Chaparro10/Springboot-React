import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const EditarEmpleado = () => {

    const navigate = useNavigate();//Para redirigir elementos
    const { id } = useParams();//Para obtener el ID de la url

    const valorInicial = {//Objeto con los valores iniciales del formulario
        nombre: '',
        departamento: '',
        sueldo: ''
    }

    const [empleado, setEmpleado] = useState(valorInicial);
    const { nombre, departamento, sueldo } = empleado;//Carga los valores de los campos en Empleado
    /**es igual a 
     *   const newEmpleado = {
            nombre: empleado.nombre,
            departamento: empleado.departamento,
            sueldo: empleado.sueldo  
        } */

        useEffect(() => {
            cargarEmpleado();
        }, [])
    //************Cargar Empleado por ID */
    const cargarEmpleado = async () => {
        try {
            const resultado = await axios.get('http://localhost:8080/rh-app/empleados/' + id);
            setEmpleado(resultado.data);
        } catch (error) {
            console.error('Error al editar el empleado:', error);
        }
    }

    const capturarDatos = (e) => {//Captura los datos de los input
        //Spread operator ... (expandir los atributos)
        const { name, value } = e.target;
        setEmpleado({ ...empleado, [name]: value });
    }

    //************PARA EDITAR*************** */
    const actualizarEmpleado = async (e) => {//PARA LA PETICION PUT
        e.preventDefault();//Para que no se recarge la pagina

        try {
            await axios.put('http://localhost:8080/rh-app/empleados/' + id, empleado);//consume la api de node
            console.log('Usuario actualizado correctamente.');
            setEmpleado({ ...valorInicial })//Limpia el formulario al enviarlo
            // Redirige a la página listarEmpleados
            navigate('/');

        } catch (error) {
            console.error('Error:', error.message);
        }
    }




    return (
        <div className='container'>
            <div className='container text-center' style={{ margin: '30px' }}>
                <h3>Editar Empleado</h3>
            </div>
            <form onSubmit={actualizarEmpleado}>
                <div className="mb-3">
                    <label for="nombre" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="nombre" name='nombre' value={empleado.nombre} required onChange={capturarDatos} />
                </div>
                <div className="mb-3">
                    <label for="departamento" className="form-label">Departamento</label>
                    <input type="text" className="form-control" id="departamento" name='departamento' value={empleado.departamento} required onChange={capturarDatos} />
                </div>
                <div className="mb-3">
                    <label for="sueldo" className="form-label">Sueldo</label>
                    <input type="number" step="any" className="form-control" id="sueldo" name='sueldo' value={empleado.sueldo} required onChange={capturarDatos} />
                </div>
                <div className='text-center'>
                    <button type="submit" className="btn btn-warning btn-sm me-3">Guardar</button>
                    <a href='/' className='btn btn-danger btn-sm'>Regresar</a>
                </div>

            </form>
        </div>
    )
}

export default EditarEmpleado;