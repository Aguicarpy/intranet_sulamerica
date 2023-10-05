import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import styles from './Calendar.module.css';

const Calendar = () => {

    const [eventos, setEventos] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [nuevoEvento, setNuevoEvento] = useState({
        title: '',
        start: '',
        end: '',
        description: ''
    });
    // const agregarEvento = () => {
    //     setMostrarFormulario(true);
    // };
    
    // useEffect(() => {
    //     const calendarEl = document.getElementById('calendar');
    //     const calendar = new FullCalendar(calendarEl, {
    //         plugins: [dayGridPlugin, interactionPlugin],
    //         initialView: 'dayGridMonth',
    //         events: eventos,
    //         selectable: true, // Habilita la selección de fechas
    //         select: (info) => {
    //             // Cuando se selecciona una fecha, muestra el formulario de creación de evento
    //             // setMostrarFormulario(true);
    //             setNuevoEvento({
    //                 ...nuevoEvento,
    //                 start: info.startStr, // Establece la fecha de inicio seleccionada
    //                 end: info.endStr,     // Establece la fecha de fin seleccionada
    //             });
    //         },
    //     });
    //     setTimeout(() => {
    //         document.getElementById('evento-title').focus();
    //     }, 0);
    // }, [eventos, nuevoEvento]);
    
    const handleDateClick = (arg) => {
        // Al hacer clic en una fecha, muestra el formulario de creación de evento
        setNuevoEvento({
            title: '',
            start: arg.dateStr,
            end: arg.dateStr,
        });
        setMostrarFormulario(true)
    };
    const handleEventClick = (arg) => {
        const eventoSeleccionado = arg.event;
    
        // Accede a los detalles del evento
        const titulo = eventoSeleccionado.title;
        const descripcion = eventoSeleccionado.extendedProps.description;
    
        // Muestra los detalles en un cuadro de diálogo o modal
        alert(`Título: ${titulo}\nDescripción: ${descripcion}`);
    };

    const guardarEvento = () => {
        // Agregar el nuevo evento al estado de eventos
        setEventos([...eventos, nuevoEvento]);
        // Reiniciar el formulario y ocultarlo
        setNuevoEvento({
            title: '',
            start: '',
            end: '',
        });
        setMostrarFormulario(false);
    };


    const clasesCombinadas = `${styles.toolbar} ${styles.event} ${styles.day }`;
    return (
        <div className={styles.calendarContainer}>
            <h2 className={styles.title}>Calendario de Tareas</h2>
            <div id="calendar"></div>
            <div className={clasesCombinadas}>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locale= 'es'
                events={eventos}
                selectable={true}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                // Resto de la configuración del calendario
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
                        <button onClick={guardarEvento}>Guardar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Calendar;