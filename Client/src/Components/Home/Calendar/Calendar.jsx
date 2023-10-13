import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';
import styles from './Calendar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addEventCalendar, clearAlerts, usersEventsCalendar } from '../../../Redux/actions';
import { toast } from "react-toastify";

const Calendar = () => {
    const dispatch = useDispatch();
    const userEvents = useSelector((state) => state.userEventsCalendar);
    const idUser = useSelector((state) => state.dataUser);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [nuevoEvento, setNuevoEvento] = useState({
        title: '',
        start: '',
        description: ''
    });

    const fetchUserEvents = () => {
        const authToken = localStorage.getItem("userAuth");
        const authTokenObject = JSON.parse(authToken);
        const token = authTokenObject.token;
        const userArea = authTokenObject.department;
        if (!authToken) {
            console.error('Token no encontrado en localStorage');
            return;
        }
      
        // Configuracion del header
        const headers = {
            Authorization: `Bearer ${token}`
        };
      
        axios.get(`http://localhost:3015/miscellaneous/event?id=${idUser.id}&area=${userArea}`, { headers })
        .then((response) => {
        if (response.status === 401) {
            console.error('Usuario no autorizado');
            throw new Error('Usuario no autorizado');
        }
        dispatch(usersEventsCalendar(response.data)); // Llama al action setUserEvents para almacenar los eventos en Redux
        })
        .catch((error) => {
            console.error('Error al obtener los eventos del usuario:', error);
        });
    };

    useEffect(() => {
          fetchUserEvents();
    }, [])
    
    const handleDateClick = (arg) => {
        // Al hacer clic en una fecha, muestra el formulario de creación de evento
        setNuevoEvento({
            title: '',
            start: arg.dateStr,
            description:''
        });
        setMostrarFormulario(true)
        const formContainer = document.querySelector(`.${styles.formContainer}`);
    if (formContainer) {
        formContainer.classList.add(styles.formVisible);
    }
    };
    const handleEventClick = (arg) => {
        const eventoSeleccionado = arg.event;
    
        // Accede a los detalles del evento
        const titulo = eventoSeleccionado.title;
        const descripcion = eventoSeleccionado.extendedProps.description;
    
        // Muestra los detalles en un cuadro de diálogo o modal
        alert(`Título: ${titulo}\nDescripción: ${descripcion}`);
    };
    const handleSelect = (info) => {
        setNuevoEvento({
            title: '',
            start: info.startStr,
            description: ''
        });
        setMostrarFormulario(true);
    };

    const guardarEvento = () => {
        dispatch(addEventCalendar(nuevoEvento, idUser.id)).then(()=>{
          toast.success("Evento cargado", {
            position: "top-center",
            autoClose: 1500,
            onClose:()=>{
              dispatch(clearAlerts())
            }
          });
        })
        .catch((error) => {
            console.error("Error al cargar el evento:", error);
            alert("Error cargando el evento al calendario.");
          });
        setNuevoEvento({
            title: '',
            start: '',
            description: ''
        });
        setMostrarFormulario(false);
        const formContainer = document.querySelector(`.${styles.formContainer}`);
        if (formContainer) {
            formContainer.classList.remove(styles.formVisible);
        }
    };

    const closeForm = () => {
        // Cierra el formulario y limpia los valores
        setMostrarFormulario(false);
        setNuevoEvento({
            title: '',
            start: '',
            description: ''
        });
    };
    const userDepartment = idUser.Positions.map((area) => area.department)[0]
    const filteredEvents = userEvents.filter((event) => {
        return event.officer_id === idUser.id || event.department === userDepartment;
      });

    const clasesCombinadas = `${styles.toolbar} ${styles.event} ${styles.day }`;
    return (
        <>

            <h2 className={styles.title}>Calendario de Eventos</h2>
        <div className={styles.calendarContainer}>
            <div id="calendar"></div>
            <div className={clasesCombinadas}>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale= 'es'
                events={filteredEvents}
                selectable={true}
                select={handleSelect}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                eventTimeFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    meridiem: false
                  }}
                />
            </div>
            {mostrarFormulario && (
                <div className={styles.overlay}>
                    <div className={styles.formContainer}>
                        <input
                            type="text"
                            placeholder="Título del evento"
                            value={nuevoEvento.title}
                            onChange={(e) => setNuevoEvento({ ...nuevoEvento, title: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Descripción del evento"
                            value={nuevoEvento.description}
                            onChange={(e) => setNuevoEvento({ ...nuevoEvento, description: e.target.value })}
                        />
                        <input
                            type="date"
                            value={nuevoEvento.start ? moment(nuevoEvento.start).format('YYYY-MM-DD') : ''}
                            readOnly
                        />
                        <input
                            type="time"
                            value={nuevoEvento.start ? moment(nuevoEvento.start).format('HH:mm') : ''}
                            onChange={(e) => {
                                const selectedDate = nuevoEvento.start ? moment(nuevoEvento.start) : moment();
                                const newTime = moment(e.target.value, 'HH:mm');
                                const updatedDateTime = selectedDate.set({
                                    hour: newTime.get('hour'),
                                    minute: newTime.get('minute'),
                                });
                                setNuevoEvento({ ...nuevoEvento, start: updatedDateTime.toDate() });
                            }}
                        />
                        <button onClick={guardarEvento}>Guardar</button>
                        <button onClick={closeForm}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
        </>
    );
};

export default Calendar;