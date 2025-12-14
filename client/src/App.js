import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // estados para guardar lo que el usuario escribe en el formulario
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState(0);
  const [pais, setPais] = useState('');
  const [cargo, setCargo] = useState('');
  const [anios, setAnios] = useState('');
  const [genero, setGenero] = useState('');
  const [celular, setCelular] = useState('');
  const [correo, setCorreo] = useState('');

  // lista que contiene todos los empleados registrados
  const [registros , setRegistros] = useState([]); // arreglo con los empleados obtenidos del backend

  // este estados se usa para saber si estamos editando un empleado o creando uno nuevo
  const [editIndex, setEditIndex] =useState(null);

  // useEffect para obtener los empleados al cargar el componente
  useEffect(() => {
    // definimos una funcion asincrona para obtener los empleados del backend
    const cargarEmpleados =async () => {
      try {
        const response = await fetch('http://localhost:3001/empleados'); // hacemos la peticion al backend
        const data = await response.json(); // parsemos la respuesta a json
        setRegistros(data);
      } catch (error) {
        // En un entorno de producción, manejarías el error de forma más sutil
        console.error('Error al cargar los empleados:', error);
        // alert('Error al cargar los empleados'); 
      }
    };
    cargarEmpleados();
  }, []); // arreglo de dependencias vacio para que se ejecute solo una vez

  // funcion para registrar un nuevo empleado
  const registrarDatos = async (e) => {
    e.preventDefault(); // evitamos que se recargue la pagina al enviar el formulario

    if (nombre.trim() === '' || pais.trim() === '' || cargo.trim() === '' || genero.trim() === '' || celular.toString().trim() === '' || correo.trim() === '') {
        alert('Por favor, rellena todos los campos de texto.');
        return;
    }

    if (editIndex !== null) {
      // editar empleado existente
      try {
        const empleadoId = registros[editIndex].id; // Asumimos que el backend usa un 'id' para la actualización
        const response = await fetch(`http://localhost:3001/empleados/${empleadoId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nombre, edad, pais, cargo, anios, genero, celular, correo }),
        });
        
        // Asumimos que el backend retorna el empleado actualizado, o simplemente chequeamos `response.ok`
        if (response.ok) {
          const nuevosRegistros = [...registros];
          // Aquí podríamos optimizar si el backend retorna el objeto completo, 
          // pero para ser robustos, asumimos que se actualizó:
          nuevosRegistros[editIndex] = { 
            ...nuevosRegistros[editIndex], 
            nombre, 
            edad, 
            pais, 
            cargo, 
            anios,
            genero,
            celular,
            correo
          };
          setRegistros(nuevosRegistros);
          setEditIndex(null);
          alert('Empleado actualizado correctamente');
        } else {
          alert('Error al actualizar el empleado');
        }
      } catch (error) {
        console.error('Error de conexión al actualizar el empleado:', error);
        alert('Error de conexión al actualizar el empleado');
      }
    } else {
      // crear nuevo empleado
      try {
        const response = await fetch('http://localhost:3001/empleados', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nombre, edad, pais, cargo, anios, genero, celular, correo }),
        });

        const data = await response.json();

        if (response.ok) {
          // Asumimos que 'data' es el nuevo empleado con su ID
          setRegistros([...registros, data]);
          alert('Empleado registrado correctamente');
        } else {
          alert('Error al registrar el empleado');
        }
      } catch (error) {
        console.error('Error de conexión al registrar el empleado:', error);
        alert('Error de conexión al registrar el empleado');
      }
    }

    // limpiar los campos del formulario
    setNombre('');
    setEdad(0);
    setPais('');
    setCargo('');
    setAnios(0);
    setGenero('');
    setCelular('');
    setCorreo('');
  };

  const eliminarEmpleado = async (index) => {
    const empleado = registros[index];
    try {
      // Usamos el 'id' para la petición de DELETE en el backend
      const response = await fetch(`http://localhost:3001/empleados/${empleado.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // si el backend elimina correctamente, actualizamos el estado filtrando el indice
        setRegistros(registros.filter((_, i) => i !== index));
        if (editIndex === index) {
          // si estamos editando el empleado que se elimino, salimos del modo edicion
          setEditIndex(null);
          setNombre('');
          setEdad(0);
          setPais('');
          setCargo('');
          setAnios(0);
          setGenero('');
          setCelular('');
          setCorreo('');
        }
        alert('Empleado eliminado correctamente');
      } else {
        alert('Error al eliminar el empleado');
      }
    } catch (error) {
      console.error('Error de conexión al eliminar el empleado:', error);
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
    setGenero(empleado.genero);
    setCelular(empleado.celular);
    setCorreo(empleado.correo);
    setEditIndex(index);
  };
  
  // AQUI EMPIEZA LA PARTE VISUAL Y DISEÑO (JSX)
  return (
    <div className='App'>
      <header className='header'>
        <h1 className='header-title'>Sistema de Gestión de Empleados</h1>
      </header>

      <div className='container'>
        
        {/* FORMULARIO */}
        <section className='form-section'>
          <h2 className='section-title'>{editIndex !== null ? 'Editar Empleado' : 'Registrar Nuevo Empleado'}</h2>
          
          <form onSubmit={registrarDatos} className='data-form'>
            
            <div className='form-group'>
              <label htmlFor='nombre'>Nombre:</label>
              <input 
                type='text' 
                id='nombre' 
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            
            <div className='form-group'>
              <label htmlFor='edad'>Edad:</label>
              <input 
                type='number' 
                id='edad' 
                value={edad}
                onChange={(e) => setEdad(parseInt(e.target.value) || 0)}
                required
                min='1'
              />
            </div>
            
            <div className='form-group'>
              <label htmlFor='pais'>País:</label>
              <input 
                type='text' 
                id='pais' 
                value={pais}
                onChange={(e) => setPais(e.target.value)}
                required
              />
            </div>
            
            <div className='form-group'>
              <label htmlFor='cargo'>Cargo:</label>
              <input 
                type='text' 
                id='cargo' 
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='genero'>Género:</label>
              <input 
                type='text' 
                id='genero' 
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='correo'>Correo:</label>
              <input 
                type='email' 
                id='correo' 
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='celular'>Celular:</label>
              <input 
                type='text' 
                id='celular' 
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
                required
              />
            </div>
            
            <div className='form-group'>
              <label htmlFor='anios'>Años de Experiencia:</label>
              <input 
                type='number' 
                id='anios' 
                value={anios}
                onChange={(e) => setAnios(parseInt(e.target.value) || 0)}
                required
                min='0'
              />
            </div>
            
            <button type='submit' className='submit-button'>
              {editIndex !== null ? 'Guardar Cambios' : 'Registrar'}
            </button>
            
          </form>
        </section>

        {/* TABLA DE REGISTROS */}
        <section className='table-section'>
          <h2 className='section-title'>Lista de Empleados</h2>
          
          <div className='table-responsive'>
            <table className='employees-table'>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Edad</th>
                  <th>País</th>
                  <th>Cargo</th>
                  <th>Género</th>
                  <th>Correo</th>
                  <th>Celular</th>
                  <th>Años</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {registros.map((empleado, index) => (
                  <tr key={index} className={editIndex === index ? 'editing' : ''}>
                    <td>{empleado.nombre}</td>
                    <td>{empleado.edad}</td>
                    <td>{empleado.pais}</td>
                    <td>{empleado.cargo}</td>
                    <td>{empleado.genero}</td>
                    <td>{empleado.correo}</td>
                    <td>{empleado.celular}</td>
                    <td>{empleado.anios}</td>
                    <td className='actions-cell'>
                      <button 
                        className='action-button edit-button'
                        onClick={() => editarEmpleado(index)}
                        disabled={editIndex !== null && editIndex !== index}
                      >
                        Editar
                      </button>
                      <button 
                        className='action-button delete-button'
                        onClick={() => eliminarEmpleado(index)}
                        disabled={editIndex !== null && editIndex !== index}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {registros.length === 0 && (
            <p className='no-data-message'>No hay empleados registrados.</p>
          )}
        </section>

      </div>
    </div>
  );
}

export default App;