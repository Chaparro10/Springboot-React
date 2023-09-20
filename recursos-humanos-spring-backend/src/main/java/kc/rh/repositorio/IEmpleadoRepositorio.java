package kc.rh.repositorio;

import kc.rh.modelo.Empleado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IEmpleadoRepositorio  extends JpaRepository<Empleado,Integer> {
   public List<Empleado> findByNombreContaining(String nombre);//Busca Nombre que Contengan la Cadena


}
