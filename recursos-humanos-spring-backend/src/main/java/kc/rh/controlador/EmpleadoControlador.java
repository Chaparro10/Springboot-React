package kc.rh.controlador;


import kc.rh.excepcion.RecursoNoEncontradoExcepcion;
import kc.rh.modelo.Empleado;
import kc.rh.servicio.IEmpleadoServicio;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
//http://localhost:8080/rh-app/
@RequestMapping("rh-app")
@CrossOrigin(value = "http://localhost:3000")//Para comunicarse con React
public class EmpleadoControlador {
    private static final Logger logger = LoggerFactory.getLogger(EmpleadoControlador.class);//Para mandar informacion a consola

   @Autowired
   private IEmpleadoServicio empleadoServicio;

    //METODO PARA MOSTRAR EMPLEADOS
    // http://localhost:8080/rh-app/empleados
    @GetMapping("/empleados")
    public List<Empleado> obtenerEmpleados(){
        var empleados=empleadoServicio.listarEmpleados();
        empleados.forEach((empleado -> logger.info(empleado.toString())));//Itera y los vas imprimiendo en consola
        return empleados;
    }

    //METODO PARA AGREGAR EMPLEADOS
    @PostMapping("empleados")
    public Empleado agregarEmpleado(@RequestBody Empleado empleado){
        logger.info("Empleado a agregar: "+ empleado);
        return empleadoServicio.guardarEmpleado(empleado);
    }

    //METODO BUSCAR EMPLEADO POR ID
    @GetMapping("/empleados/{id}")
// La anotación @GetMapping indica que este método manejará solicitudes HTTP GET en la ruta "/empleados/{id}".
    public ResponseEntity<Empleado> obtenerEmpleadoPorId(@PathVariable Integer id) {
        // El método recibe el valor de la variable de ruta {id} desde la URL y lo almacena en la variable "id".
        Empleado empleado = empleadoServicio.buscarEmpleadoPorId(id);
        // Llama al método "buscarEmpleadoPorId" del servicio "empleadoServicio" para buscar un empleado por su ID y almacena el resultado en la variable "empleado".
        if (empleado == null)
            throw new RecursoNoEncontradoExcepcion("No se encontro el empleado id" + id);

        return ResponseEntity.ok(empleado);
        // Si se encontró el empleado, se devuelve una respuesta HTTP exitosa (código 200) con el objeto "empleado" como contenido de la respuesta.
    }
    //METODO BUSCAR EMPLEADO POR NOMBRE
    @GetMapping("/empleados/nombre/{nombre}")
    public ResponseEntity<List<Empleado>> obtenerEmpleadoPorNombre(@PathVariable String nombre){
        // El método recibe el valor de la variable de ruta {id} desde la URL y lo almacena en la variable "id".
        List<Empleado> empleado = empleadoServicio.buscarEmpleadoPorNombre(nombre );
        // Llama al método "buscarEmpleadoPorNombre" del servicio "empleadoServicio" para buscar un empleado por su Nombre y almacena el resultado en la variable "empleado".
        if (empleado == null)
            throw new RecursoNoEncontradoExcepcion("No se encontro el empleado id" + nombre);

        return ResponseEntity.ok(empleado);
        // Si se encontró el empleado, se devuelve una respuesta HTTP exitosa (código 200) con el objeto "empleado" como contenido de la respuesta.
    }

    //METODO PARA ACTUALIZAR
    @PutMapping("/empleados/{id}")
    public ResponseEntity<Empleado> actualizarEmpleado(@PathVariable Integer id, @RequestBody Empleado empleadoRecibido) {
        Empleado empleado = empleadoServicio.buscarEmpleadoPorId(id);
        if (empleado == null) {
            throw new RecursoNoEncontradoExcepcion("El id no existe: " + id);
        }
        // Actualizar los campos del empleado con la información recibida en el cuerpo de la solicitud.
        empleado.setNombre(empleadoRecibido.getNombre());
        empleado.setDepartamento(empleadoRecibido.getDepartamento());
        empleado.setSueldo(empleadoRecibido.getSueldo());

        empleado = empleadoServicio.guardarEmpleado(empleado);

        return ResponseEntity.ok(empleado);
    }

    //METODO PARA ELIMINAR
    @DeleteMapping("/empleados/{id}")
    public ResponseEntity<Map<String,Boolean>> eliminarEmpleado(@PathVariable Integer id){
        Empleado empleado =empleadoServicio.buscarEmpleadoPorId(id);
        if(empleado==null) throw new RecursoNoEncontradoExcepcion("EL id no existe "+id);

        empleadoServicio.eliminarEmpleado(empleado);

        //Json {"Eliminado ": True}
        Map<String,Boolean> respuesta = new HashMap<>();
        respuesta.put("eliminado", Boolean.TRUE);
        return ResponseEntity.ok(respuesta);
    }



}
