import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { searchOfficer, getAllUsers, filterUsers } from "../../../../Redux/actions";
import styles from './SearchBarUser.module.css'

const SearchBarUser = ({ setSearchResults, }) => {

    const dispatch = useDispatch()
    const [searchString, setSearchString] = useState("");
    const [noResults, setNoResults] = useState(false);
    
    function handleChange(event) {
        setSearchString(event.target.value);

        if (setSearchResults.length === 0 && !noResults) {
            dispatch(setSearchResults([]));
        } else {
            dispatch(searchOfficer(event.target.value)).then((data) => {setSearchResults(data.payload)});
        }
    }

    //POR SI SE QUIERA PONER CON UN BOTON
    // function handleSubmit(event) { 
    //     event.preventDefault();
    //     if (searchString.trim() === "") { // Verifica si el valor está vacío o solo contiene espacios en blanco
    //         dispatch(getAllUsers()).then(() => setSearchResults([])); // Limpia los resultados de búsqueda
    //     } else {
    //         dispatch(searchOfficer(searchString)).then((data) => {
    //           // Actualiza los resultados de búsqueda con la respuesta de la búsqueda
    //           setSearchResults(data.payload);
    //         });
    //     }
    // }

    return(
        <div >
            <form onSubmit={(event) => event.preventDefault()}>
                
                <input className={styles.textBox} type="search" placeholder="Buscar Funcionario"  value={searchString} onChange={handleChange}/>
            </form>
        </div>
    )
}



export default SearchBarUser;