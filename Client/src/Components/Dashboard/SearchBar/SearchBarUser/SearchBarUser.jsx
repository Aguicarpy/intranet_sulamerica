import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchOfficer, getAllUsers } from "../../../../Redux/actions";
import styles from './SearchBarUser.module.css'

const SearchBarUser = ({ setSearchResults }) => {

    const dispatch = useDispatch()
    const [searchString, setSearchString] = useState("");

    function handleChange(event) {
        setSearchString(event.target.value);

        if (event.target.value.length === 0) {
            dispatch(getAllUsers()).then((data) => setSearchResults(data.payload));
        } else {
            dispatch(searchOfficer(event.target.value));
        }
    }

    function handleSubmit(event) { 
        event.preventDefault();
        if (searchString.length === 0) {
            dispatch(getAllUsers()).then(() => setSearchResults([])); // Limpia los resultados de búsqueda
            
        } else {
            dispatch(searchOfficer(searchString)).then((data) => {
              // Actualiza los resultados de búsqueda con la respuesta de la búsqueda
              setSearchResults(data.payload);
            });
        }
      }

    return(
        <div >
            <form onSubmit={handleSubmit}>
                <input className={styles.textBox} type="search" placeholder="Buscar Funcionario"  value={searchString} onChange={handleChange}/>
            </form>
        </div>
    )
}



export default SearchBarUser;