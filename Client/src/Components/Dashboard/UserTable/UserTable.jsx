import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, changeUserType, clearAlerts, deleteUser } from '../../../Redux/actions';
import { NavLink } from 'react-router-dom';
import styles from './UserTable.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function UserTable({ users, onUserDelete, filteredUsers, onUpdateUser }) {
  const alert = useSelector((state) => state.alerts)
  const local = useSelector((state) => state.dataLocals)
  const dispatch = useDispatch()
  const [noResults, setNoResults] = useState(false);

  useEffect(() =>{
    dispatch(getAllUsers())
  },[dispatch])

  function handleDeleteUser(id) {
    dispatch(deleteUser(id));
    onUserDelete(id);
  }
  
  function handleUpdateUser(id){
    dispatch(changeUserType(id));
    onUpdateUser(id)
  }

  useEffect(() => {
    if (alert) {
      toast.info(alert, {
        position: "top-center",
        autoClose: 2000,
        onClose:()=>{
          dispatch(clearAlerts())
        }
      });
    }
  }, [alert, dispatch]);
    
  return (
    <div className="table-responsive">
      {alert && (<ToastContainer />)}
      <Table bordered responsive>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Fecha /
                        nacimiento</th>
                        <th>Teléfono</th>
                        <th>Tipo usuario</th>
                        <th>Sucursal</th>
                        <th>Posición</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.length === 0 && !noResults ?  (
                        <tr>
                          <td colSpan="9">No se encontraron coincidencias</td>
                        </tr>
                      ) : (
                        (users.length > 0 ? users : filteredUsers).map((user, index) => (
                        <tr key={user.id}>
                          <td>{index + 1}</td>
                          <td className={styles.typecell}>{user.id}</td>
                          <td className={styles.typecell}>{user.name}</td>
                          <td className={styles.typecell}>{user.email}</td>
                          <td className={styles.typecell}>{user.birthDay}</td>
                          <td className={styles.typecell}>{user.phone}</td>
                          <td className={styles.typecell}>{user.typeUser}</td>
                          <td className={styles.typecell}>
                          {user.Locals.map((local, localIndex) => (
                          <span key={localIndex}>
                            {local.local}{localIndex < user.Locals.length - 1 ? ', ' : ''}
                          </span>))}
                          </td>
                          <td className={styles.typecell}>
                          {user.Positions.map((position, posIndex) => (
                          <span key={posIndex}>
                            {position.position}{posIndex < user.Positions.length - 1 ? ', ' : ''}
                          </span>))}
                          </td>
                          <td>
                            <button style={{marginTop:"5px"}} onClick={()=>handleUpdateUser(user.id)} className={styles.type}>Editar</button>
                          </td>
                        </tr>
                      ))
                      )}
                    </tbody>
                </Table>
                
    </div>
  );
}

export default UserTable;