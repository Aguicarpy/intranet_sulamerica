import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllConvocations } from "../../Redux/actions";

import "./../Convocations/Convocations.less";

function Card() {
  const convocations = useSelector((state) => state.getConvocations);
  console.log(convocations);
  const dispatch = useDispatch();
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    dispatch(getAllConvocations());
  }, [dispatch]);

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
            <a href="#" className="btn">
              Read more
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}


export default Card;

