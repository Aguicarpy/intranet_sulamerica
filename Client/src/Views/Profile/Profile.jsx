import { UserProfile } from "../../Components/Profile/UserProfile";
import  NavBar from "../../Components/Home/NavBar/NavBar"
import Footer from "../../Components/Home/Footer/Footer"
// import { useParams } from "react-router";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { useState } from "react";
const Profile = () => {
  // const { id } = useParams();
  // const dispatch = useDispatch();
  // const userProfile = useSelector((state) => state.dataUser);

  // const [userData, setUserData] = useState({
  //   name: userProfile.name,
  //   birthDay: userProfile.birthDay,
  //   phone: userProfile.phone,
  //   email: userProfile.email,
  //   position: userProfile[0].position,
  //   // email: userProfile.email,
  // });

  // // useEffect(() => {
  // //   dispatch(getUserProfile(id));
  // // }, [dispatch, id]);

  // if (userProfile.loading) {
  //   return <div>Cargando...</div>;
  // }

  // if (userProfile.error) {
  //   return <div>Error: {userProfile.error}</div>;
  // }

  // const { name, email, phone, position} = userData; // Accede a las propiedades del perfil

  return (
    <div>
      <NavBar></NavBar>
      <UserProfile></UserProfile>
      <Footer></Footer>
    </div>
  )
};

export default Profile;
