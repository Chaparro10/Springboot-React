package kc.rh.servicio;

import kc.rh.modelo.Empleado;
import kc.rh.repositorio.IEmpleadoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmpleadoServicio implements IEmpleadoServicio{

    @Autowired
    private IEmpleadoRepositorio empleadoRepositorio;
    @Override
    public List<Empleado> listarEmpleados() {
        return empleadoRepositorio.findAll();
    }

    @Override
    public Empleado buscarEmpleadoPorId(Integer idEmpleado) {
       Empleado empleado = empleadoRepositorio.findById(idEmpleado).orElse(null);
       return  empleado;
    }

   @Override
    public List<Empleado> buscarEmpleadoPorNombre(String nombre) {
        return empleadoRepositorio.findByNombreContaining(nombre);
    }

    @Override
    public Empleado guardarEmpleado(Empleado empleado) {
       return  empleadoRepositorio.save(empleado);
    }

    @Override
    public void eliminarEmpleado(Empleado empleado) {
           empleadoRepositorio.delete(empleado);
    }
}
