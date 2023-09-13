import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { login_officer } from "../../Redux/actions";
import { useNavigate } from 'react-router-dom';
import { validate } from "./validate";
import styles from "./LoginForm.module.css"; // Importa los estilos CSS

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    e.preventDefault();
    const updatedUser = {
      ...user,
      [e.target.name]: e.target.value,
    };

    setUser(updatedUser);

    const formErrors = validate(updatedUser);
    setErrors(formErrors);
  }

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(login_officer(user.email, user.password))
      .then((result) => {
        if (result.success) {
          navigate("/inicio");
        } else {
          window.alert("Inicio de sesión fallido. Verifica tus credenciales.");
        }
      })
      .catch((error) => {
        console.error("Error en el inicio de sesión:", error);
      });
  }
  // useEffect(() => {
  //   // Verifica si el usuario ya está autenticado
  //   const authToken = localStorage.getItem("userAuth");
  //   if (authToken) {
  //     navigate("/inicio"); // Redirige al inicio si el usuario ya está autenticado
  //   }
  // }, [navigate]);

  return (
    <div className={styles.containerLogin}>    
    <div className={styles["login-block"]}>
      <form >
        <h3>Iniciar Sesión</h3>
        <div >
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className={styles["login-block input"]}
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            className={styles["login-block input"]}
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>Entrar</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default LoginForm;
