import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllConvocations } from "../../Redux/actions";
import "./../Convocations/Convocations.less";

function Card() {
  const convocations = useSelector((state) => state.getConvocations);
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
              src="https://source.unsplash.com/300x225/?wave"
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
            This grid is an attempt to make something nice that works on touch
            devices. Ignoring hover states when they're not available etc.
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
