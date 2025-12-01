import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // estados paa guardar lo que el uusario escribe en el formulario
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState(0);
  const [pais, setPais] = useState('');
  const [cargo, setCargo] = useState('');
  const [anios, setAnios] = useState('');

  //lista que contiene todos los empleados registrados
  const [registros , setRegistros] = useState([]); //arreglo con los empleados obtenidos del backend

  //este estados se usa para saber si estamos editando un empleado o creando uno nuevo
  const [editIndex, setEditIndex] =useState(null);

  //useEffect para obtener los empleados al cargar el componente
  useEffect(() => {
    //definimos una funcion asincrona para obtener los empleados del backend
    const cargarEmpleados =async () => {
      try {
        const response = await fetch('http://localhost:3001/empleados'); //hacemos la peticion al backend
        const data = await response.json(); //parsemos la respuesta a json
        setRegistros(data);
      } catch (error) {
        alert('Error al cargar los empleados');
      }
    };
    cargarEmpleados();
  }, []); //arreglo de dependencias vacio para que se ejecute solo una vez

  //funcion para registrar un nuevo empleado
  const registrarDatos = async (e) => {
    e.preventDefault(); //evitamos que se recargue la pagina al enviar el formulario

    if (editIndex !== null) {
      //editar empleado existente
      try {
        const empleado = registros[editIndex];
        const response = await fetch(`http://localhost:3001/empleados/${editIndex}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nombre, edad, pais, cargo, anios }),
        });
        if (response.ok) {
          //copimos el array actual de registros
          const nuevosRegistros = [...registros];
          //reemplazamos el objeto en la posición editada con los nuevos valores
          nuevosRegistros[editIndex] = { ...empleado, nombre, edad, pais, cargo, anios };
          //actualizamos el estado con el nuevo array
          setRegistros(nuevosRegistros);
          //salimos del modo edicion
          setEditIndex(null);
          alert('Empleado actualizado correctamente');
        } else {
          alert('Error al actualizar el empleado');
        }
      } catch (error) {
        alert('Error de conexión al actualizar el empleado');
      }
    } else {
      //crear nuevo empleado
      try {
        const response = await fetch('http://localhost:3001/empleados', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nombre, edad, pais, cargo, anios }),
        });

        const data = await response.json();

        if (response.ok) {
          setRegistros([...registros, data]);
          alert('Empleado registrado correctamente');
        } else {
          alert('Error al registrar el empleado');
        }
      } catch (error) {
        alert('Error de conexión al registrar el empleado');
      }
    }

    //limpiar los campos del formulario
    setNombre('');
    setEdad(0);
    setPais('');
    setCargo('');
    setAnios('');
  };

  const eliminarEmpleado = async (index) => {
    const empleado = registros[index];
    try {
      const response = await fetch(`http://localhost:3001/empleados/${empleado.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // si el backend elimina correctamente, actualizamos el estado filtrando el indice
        //quitar el elemento con indice
        setRegistros(registros.filter((_, i) => i !== index));//quitamos el elemento con ese index
        if (editIndex === index) {
          //si estamos editando el empleado que se elimino, salimos del modo edicion
          setEditIndex(null);
          setNombre('');
          setEdad(0);
          setPais('');
          setCargo('');
          setAnios(0);
        }
        alert('Empleado eliminado correctamente');
      } else {
        alert('Error al eliminar el empleado');
      }
    } catch (error) {
      alert('Error de conexión al eliminar el empleado');
    }
  };

  const editarEmpleado = (index) => {
    const empleado = registros[index];
    setNombre(empleado.nombre);
    setEdad(empleado.edad);
    setPais(empleado.pais);
    setCargo(empleado.cargo);
    setAnios(empleado.anios);
    setEditIndex(index);
  };

  //aqui empieza la parte visual y diseño

  return (
    <div className="App">
      <h1>Registro de Empleados</h1>
      <form onSubmit={registrarDatos}>
        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        <input type="number" placeholder="Edad" value={edad} onChange={(e) => setEdad(parseInt(e.target.value))} required />
        <input type="text" placeholder="País" value={pais} onChange={(e) => setPais(e.target.value)} required />
        <input type="text" placeholder="Cargo" value={cargo} onChange={(e) => setCargo(e.target.value)} required />
        <input type="number" placeholder="Años de experiencia" value={anios} onChange={(e) => setAnios(e.target.value)} required />
        <button type="submit">{editIndex !== null ? 'Actualizar Empleado' : 'Registrar Empleado'}</button>
      </form>

      <h2>Empleados Registrados</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Edad</th>
            <th>País</th>
            <th>Cargo</th>
            <th>Años de experiencia</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((empleado, index) => (
            <tr key={index}>
              <td>{empleado.nombre}</td>
              <td>{empleado.edad}</td>
              <td>{empleado.pais}</td>
              <td>{empleado.cargo}</td>
              <td>{empleado.anios}</td>
              <td>
                <button onClick={() => editarEmpleado(index)}>Editar</button>
                <button onClick={() => eliminarEmpleado(index)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
