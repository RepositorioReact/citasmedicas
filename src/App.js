import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

  //Citas en el localStorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){ //si no hay citas se hace un arreglo y si sí hay citas, en el useEffect se agrega al localStorage
    citasIniciales = []; //esto pasa a ser el valor inicial del useState del Arreglo de citas
  }

  //Arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  //useEffect para realizar ciertas operaciones cuando el state cambia, es parecido al document.ready de jquery
  //se recarga cuando se actualiza algo y también se inicia al iniciar la app
  useEffect(()=>{
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas));
    } else{
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas]); //Se le pasa un arreglo para que no entre en ciclo y así sólo se ejecuta cuando se aplique el cambio dentro del []

  //Función que tome las citas actuales y tome la nueva
  const crearCita = cita =>{
    guardarCitas([
      ...citas,
      cita
    ])
  }

  //Función que elimina cita por su ID
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id); //se pone que es diferente al id porque si no, eliminaría todos los demás. Trae los demás y elimina el que no se ha traido
    //se ha creado un nuevo arreglo y se guarda en la función del state de guardarCitas
    guardarCitas(nuevasCitas);
  }

  //Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario 
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita =>(
              <Cita 
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>    
        </div>
      </div>
    </Fragment>
  );
}

export default App;
