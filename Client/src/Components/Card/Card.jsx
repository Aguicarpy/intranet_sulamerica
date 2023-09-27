import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllConvocations, sendApplyJob, clearAlerts } from "../../Redux/actions";
import "./../Convocations/Convocations.less";
import { Link } from "react-router-dom"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Card() {
  const convocations = useSelector((state) => state.getConvocations);
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
  }, [user.id]);
  
  
  
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

