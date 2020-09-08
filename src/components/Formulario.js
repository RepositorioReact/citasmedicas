import React, {Fragment, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {
    //Crear useState de citas
    const [cita, actualizarCitas] = useState({
        mascota:'',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
    });
//un state para actualizar el error que inicia en false ya que al iniciar el form no hay datos
const [error, actualizarError] = useState(false);

    //Funcion que se ejecuta cada vez que el usuario escribe en un input
    const actualizarState = e => {
        actualizarCitas ({
            ...cita,
            [e.target.name]:e.target.value
        })
    }
    //Extraer los valores para no ir poniendo cita.mascota, directamente ponemos mascota
    const {mascota, propietario, fecha, hora, sintomas} = cita;

    //Cuando el usuario le de a agregar cita
    const submitCita = e => {
        e.preventDefault();
        
        //Validar
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === ''){
            actualizarError(true);
            //Se añade un return para que no siga avanzando si hay un error
            return;
        }
        //Eliminar mensaje previo, en este caso es el de error
        actualizarError(false);

        //Asignar un ID
        cita.id = uuidv4();


        //Crear la cita
        crearCita(cita);


        //Reiniciar form
        actualizarCitas({
            mascota:'',
            propietario:'',
            fecha:'',
            hora:'',
            sintomas:''
        })

    }

    return ( 
        <Fragment>
            <h2>Crear cita</h2>

            {error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}

            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input 
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange = {actualizarState}
                    value={mascota}
                />
                <label>Nombre Dueño</label>
                <input 
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Dueño de la Mascota"
                    onChange = {actualizarState}
                    value={propietario}
                />
                <label>Fecha</label>
                <input 
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange = {actualizarState}
                    value={fecha}
                />
                <label>Hora</label>
                <input 
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange = {actualizarState}
                    value={hora}
                />
                <label>Síntomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange = {actualizarState}
                    value={sintomas}
                ></textarea>
                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar cita</button>
            </form>
        </Fragment>
     );
}
 
Formulario.protTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;