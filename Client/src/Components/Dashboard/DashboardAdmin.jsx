import { useSelector, useDispatch} from 'react-redux';
import { useEffect,useState } from 'react';
import NavBar from '../Home/NavBar/NavBar'
import { getAllUsers } from '../../Redux/actions';
import UserTable from '../UserTable/UserTable';
import styles from './DashboardAdmin.module.css'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const DashboardAdmin = () =>{
    const dispatch = useDispatch()
    const dbUsers = useSelector((state) => state.allUsers)
    //AL RENDERIZAR DASHBOARD CARGO ALLUSERS CON USUARIOS Y ESTADO LOCAL TAMBIEN
    
    const [users, setUsers] = useState([]); // Estado de los usuarios
    const [showUsers,setShowUsers] = useState(false)
    useEffect(() => {
        dispatch(getAllUsers()).then((data)=>{setUsers(data.payload)});
    }, [dispatch]);

    const [showDonations,setShowDonations] = useState(false)
    const [showReviews,setShowReviews] = useState(false)
    
    // useEffect(()=>{
    //     dispatch(getAllReviws())
    //     // dispatch(getAllDonations())
    // },[dispatch])

    const onUserDelete = (id) => {
        // Eliminar el usuario del estado local
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
      };

      const onUpdateUser = (id) => {
        const updatedUsers = users.map(user => {
            if (user.id === id) {
                return {
                    ...user,
                    typeUser: user.typeUser === "Admin" ? "Officer" : "Admin"
                };
            }
            return user;
        });
        setUsers(updatedUsers);
    };

    const handleShowUsers = ()=>{
        if(showUsers === true){
            setShowUsers(false)
        }else{
            setShowUsers(true)
            setShowDonations(false)
            setShowReviews(false)
        }
    }

    // const handleShowDonations = ()=>{
    //     if(showDonations === true){
    //         setShowDonations(false)
    //     }else{
    //         setShowDonations(true)
    //         setShowUsers(false)
    //         setShowReviews(false)
    //     }
    // }

    // const handleShowReviews = ()=>{
    //     if(showReviews === true){
    //         setShowReviews(false)
    //     }else{
    //         setShowReviews(true)
    //         setShowUsers(false)
    //         setShowDonations(false)
    //     }
    // }


    return(
        <div className={styles.page}>
        {/* <div className={styles.navbar}>
            <NavBar/> 
        </div> */}
        <div className={styles.container}>
        <p className={styles.titulo}>DASHBOARD DE RRHH</p>
        <Row   md={3} className={styles.botones}>
            <Col>
                <button className={styles.buttonSelect} onClick={handleShowUsers}>FUNCIONARIOS</button>
            </Col>
            {/* <Col>
                <button className={styles.buttonSelect} onClick={handleShowDonations}>DONACIONES</button>
            </Col>
            <Col>
                <button className={styles.buttonSelect} onClick={handleShowReviews}>RESEÑAS</button>
            </Col> */}
        </Row>
        <div>
            {showUsers &&  
            <Row  xs={1} md={1}>
                  <Col>
                    <div className={styles.table}>
                      <p>FUNCIONARIOS</p>
                      <UserTable  onUpdateUser={onUpdateUser} onUserDelete={onUserDelete} users={users}/>
                    </div>
                  </Col>   
            </Row>}
           {/* {showDonations && 
           <Row  xs={1} md={1}>
                <Col>
                  <div className={styles.table}>
                    <p>DONACIONES</p>
                    <DonationsTable donations={donations}/>
                  </div>
                </Col>   
            </Row>
           } */}
            {/* {showReviews && 
             <Row  xs={1} md={1}>
                <Col>
                  <div className={styles.table}>
                    <p>Reviews</p>
                    <ReviewsTable reviews={reviews}/>
                  </div>
                </Col>   
             </Row>
         } */}
        </div>
        </div>
    </div>
    )
}


export default DashboardAdmin;