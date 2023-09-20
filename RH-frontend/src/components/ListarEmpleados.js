import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';

const ListarEmpleados = () => {

    const [emplados, setEmpleado] = useState([]);

    useEffect(() => {
        cargarEmpleados();
    }, [])

    const cargarEmpleados = async () => {
        try{
            const resultado = await axios.get('http://localhost:8080/rh-app/empleados');
            setEmpleado(resultado.data);
        }catch(error){
            console.error('No se pudieron cargar los Datos:'+error)
        }
       
    }

    
   //FUNCION PARA ELIMINAR EMPLEADOS
   const eliminarEmpleado = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/rh-app/empleados/${id}`);
        cargarEmpleados();
    } catch (error) {
      console.error('Error al eliminar el Empleado:', error);
    }
  }

    return (
        <div>
            <div className="container text-center">
                <h1>Sistema de RH</h1>
            </div>
            <table class="table table-striped table-hover">
                <thead className='table-dark'>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">EMPLEADO</th>
                        <th scope="col">DEPARTAMENTO</th>
                        <th scope="col">SUELDO</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        //Iteramos el arreglo de empleados
                        emplados.map((empleado, indice) => (
                            <tr key={indice}>
                                <th scope="row">{empleado.idEmpleado}</th>
                                <td>{empleado.nombre}</td>
                                <td>{empleado.departamento}</td>
                                <td><NumericFormat value={empleado.sueldo}
                                    displayType={'text'}
                                    thousandSeparator=',' prefix='$'
                                    decimalScale={2} fixedDecimalScale
                                />
                                </td>
                                <td className='text-center'>
                                        <div>
                                            <Link to={`/editar/${empleado.idEmpleado}`}
                                            className='btn btn-warning btn-sm me-3'>Editar
                                            </Link>
                                            
                                            <button onClick={() => eliminarEmpleado(empleado.idEmpleado)} className='btn btn-danger btn-sm me-3'>
                                                Eliminar
                                            </button>
                                            
                                        </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListarEmpleados;


