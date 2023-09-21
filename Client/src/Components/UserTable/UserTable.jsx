import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserType, clearAlerts, deleteUser } from '../../Redux/Actions';
import { NavLink } from 'react-router-dom';
import styles from './UserTable.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserTable({ users, onUserDelete,onUpdateUser }) {
  const alert = useSelector((state) => state.alerts)
  const dispatch = useDispatch()

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
                        {/* <th>Apellido</th> */}
                        <th>Fecha de Nac.</th>
                        {/* <th>Dirección</th> */}
                        {/* <th>Email</th> */}
                        <th>Teléfono</th>
                        <th>Tipo usuario</th>
                        {/* <th>Creado en</th> */}
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr key={user.id}>
                          <td>{index + 1}</td>
                          <td className={styles.typecell}>{user.name}</td>
                          <td className={styles.typecell}>{user.id}</td>
                          <td className={styles.typecell}>{user.email}</td>
                          {/* <td>{user.lastName}</td> */}
                          <td className={styles.typecell}>{user.birthDay}</td>
                          {/* <td>{user.address}</td> */}
                          {/* <td style={{maxWidth:"80%"}}>{user.email}</td> */}
                          <td className={styles.typecell}>{user.phone}</td>
                          <td className={styles.typecell}>{user.typeUser}</td>
                          {/* <td>{user.createdAt}</td> */}
                          <td>
                            <button style={{marginTop:"5px"}} onClick={() => handleDeleteUser(user.id)} className={styles.delete}>Borrar usuario</button>
                            {/* <NavLink to={`/admindashboard/${user.id}`}><button style={{marginTop:"5px"}} className={styles.see}>Ver publicaciones</button></NavLink> */}
                            <button style={{marginTop:"5px"}}onClick={()=>handleUpdateUser(user.id)} className={styles.type}>Cambiar Tipo</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                </Table>
    </div>
  );
}

export default UserTable;
