import React, { useEffect, useState } from "react";
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { getAllConvocations, sendApplyJob, setUserApplyJob, clearAlerts } from "../../Redux/actions";
import "./../Convocations/Convocations.less";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Card() {
  const convocations = useSelector((state) => state.getConvocations);
  const apply = useSelector((state) => state.userApplyWorks);
  console.log(apply);
  const user = useSelector((state) => state.dataUser);
  const dispatch = useDispatch();
  // const dispatchAppliedConvocations = useDispatch();
  // console.log(appliedConvocations);
  // console.log(convocations);
  // console.log(user);
  const [expandedCard, setExpandedCard] = useState(null);
  const [applyToWork, setApplyToWork] = useState({})

  useEffect(() => {
    dispatch(getAllConvocations());
  }, [dispatch]);

   // Cargar postulaciones previas del usuario desde localStorage cuando el componente se monta
   useEffect(() => {
    const userAppliedConvocations = JSON.parse(localStorage.getItem(`appliedConvocations_${user.id}`)) || {};
    setApplyToWork(userAppliedConvocations);
    fetchSendJob()
  }, [user.id]);
  
  const fetchSendJob = () => {
    const authToken = localStorage.getItem("userAuth");
    const authTokenObject = JSON.parse(authToken);
    const token = authTokenObject.token;
    if (!authToken) {
        console.error('Token no encontrado en localStorage');
        return;
    }
  
    // Configuracion del header
    const headers = {
        Authorization: `Bearer ${token}`
    };
  
    axios.get(`http://localhost:3015/convocations/applyjobUser?id=${authTokenObject.id}`, { headers })
    .then((response) => {
    if (response.status === 401) {
        console.error('Usuario no autorizado');
        throw new Error('Usuario no autorizado');
    }
    dispatch(setUserApplyJob(response.data)); // Llama al action setUserEvents para almacenar los eventos en Redux
    })
    .catch((error) => {
        console.error('Error al obtener las convocatorias enviadas por el usuario:', error);
    });
};
  
  const handlerSendJob = (officerId, convocationId) => {
    // Verificar si el usuario ya se ha postulado a esta convocatoria
    if (applyToWork[convocationId]) {
      alert("Ya te has postulado a esta convocatoria.");
    } else {
      dispatch(sendApplyJob(officerId, convocationId))
        .then(() => {
          // Actualizar las postulaciones previas del usuario y guardar en localStorage
          const updatedAppliedConvocations = {
            ...applyToWork,
            [convocationId]: true,
          };
          setApplyToWork(updatedAppliedConvocations);
          localStorage.setItem(`appliedConvocations_${user.id}`, JSON.stringify(updatedAppliedConvocations));
          toast.success("Tus datos han sido enviados a RRHH", {
            position: "top-center",
            autoClose: 1500,
            onClose:()=>{
              dispatch(clearAlerts())
            }
          });
        })
        .catch((error) => {
          console.error("Error al postularse:", error);
          alert("Error al postularse a la convocatoria.");
        });
    }
  };
  

  const toggleCard = (index) => {
    if (expandedCard === index) {
      // Si la tarjeta ya está expandida, cierra la descripción
      setExpandedCard(null);
    } else {
      // Si la tarjeta no está expandida, abre
      setExpandedCard(index);
    }
  };

  return (
    <>
    <div className="cards">
      {convocations.map((convocation, index) => (
        <div
          key={index}
          className={`card ${expandedCard === index ? "show" : ""}`}
        >
          <div className="card__image-holder">
            <img
              className="card__image"
              src="https://uploads-ssl.webflow.com/60f1d0291913c15fb8cd0d89/60f1d0291913c1839ccd0ecc_office-block.png"
              alt="wave"
            />
          </div>
          <div className="card-title">
            <a className="toggle-info btn" onClick={() => toggleCard(index)}>
              <span className="left"></span>
              <span className="right"></span>
            </a>
            <h2>
              {convocation.title}
              <small>Image from unsplash.com</small>
            </h2>
          </div>
          <div
            className={`card-description ${
              expandedCard === index ? "show" : ""
            }`}
          >
            {/* <ul> */}
              <p>{convocation.local.local}</p>
              <p>{convocation.position.department}</p>
              <p>{convocation.position.position}</p>
              <p>{convocation.position.salary}</p>
              <p>{convocation.position.shedule}</p>

            {/* </ul> */}
          </div>
          <div className="card-actions">
          {applyToWork[convocation.id] ? (
        <p>Ya te has postulado a esta convocatoria</p>
      ) : (
        <a
          href="#"
          className="btn"
          onClick={() =>
            handlerSendJob(
              user.id,
              convocation.id 
            )
          }
        >
          Postularse
        </a>
      )}
          </div>
        </div>
      ))}
    </div>
    </>
  );
}


export default Card;

