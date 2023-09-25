import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postOfficer, allPositions } from "../../Redux/actions";
import { useForm } from "../hooks/useForm";
import "../FormNewAddOfficer/FormNewAddOfficer.less";

export const FormNewAddOfficer = () => {
  const focusRef = useRef();
  const dispatch = useDispatch();
  const usersCreated = useSelector((state) => state.userCreated);
  const dataPosition = useSelector((state) => state.dataPositions);

  const [errors, setErrors] = useState({}); // State para almacenar errores
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoadingImage, setIsLoadingImage] = useState(false); // Estado para indicar si se está cargando la imagen
  const [positionsData, setPositionsData] = useState([]); // Aquí almacenaremos las opciones de posición

  const {
    formState,
    name,
    birthDay,
    phone,
    typeUser,
    position,
    email,
    password,
    onInputChange,
  } = useForm({
    name: "",
    birthDay: "",
    phone: "",
    typeUser: "Admin",
    position: "", // Inicialmente, establecemos una cadena vacía
    email: "",
    password: "",
  });

  useEffect(() => {
    dispatch(allPositions());
  }, [dispatch]);

  useEffect(() => {
    focusRef.current.focus();
  }, []);

  // Utiliza un efecto para actualizar las opciones de posición cuando los datos se carguen desde la base de datos
  useEffect(() => {
    if (dataPosition.length > 0) {
      setPositionsData(dataPosition.map((cargo) => cargo.position));
    }
  }, [dataPosition]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setIsLoadingImage(true); // Activar el indicador de carga de imagen

    // Verificar si se seleccionó un archivo y es una imagen
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onload = (e) => {
        // Cuando se cargue el archivo, establecer la vista previa de la imagen
        setImagePreview(e.target.result);
        setIsLoadingImage(false); // Desactivar el indicador de carga de imagen cuando esté completo
      };

      // Leer el archivo como una URL de datos (base64)
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!name) {
      newErrors.name = "Please enter a user name";
    }

    if (!birthDay) {
      newErrors.birthDay = "Please enter a birth day";
    }

    if (!phone) {
      newErrors.phone = "Please enter a phone number";
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "Phone number should be 10 digits";
    }

    if (!email) {
      newErrors.email = "Please enter an email address";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Please enter a password";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Devuelve true si no hay errores
  };

  const onSubmit = (event) => {
    event.preventDefault();

    // Validar antes de enviar
    if (validateForm()) {
      dispatch(postOfficer(formState));
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="container register">
          <div className="row">
            <div className="col-md-3 register-left">
              <div className="avatar-container">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile Avatar"
                    className="avatar-img"
                  />
                ) : (
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                    alt="Default Avatar"
                    className="avatar-img"
                  />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                id="fileInput"
                style={{ display: "none" }} // Esta línea oculta el input file
              />
              {isLoadingImage && (
                <div className="loading-spinner">
                  Loading... {/* Puedes agregar aquí un spinner de carga */}
                </div>
              )}
              <label htmlFor="fileInput" className="custom-file-upload">
                <i className="btn btn-success">Cargar Imagen</i>
              </label>
              <br />
            </div>
            <div className="col-md-9 register-right">
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <h3 className="register-heading">Agregar Nuevo Usuario</h3>
                  <div className="row register-form">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          className={`form-control ${
                            errors.name && "is-invalid"
                          }`}
                          placeholder="User Name *"
                          value={name}
                          ref={focusRef}
                          name="name"
                          onChange={onInputChange}
                        />
                        {errors.name && (
                          <div className="invalid-feedback">{errors.name}</div>
                        )}{" "}
                      </div>
                      <div className="form-group">
                        <input
                          type="email"
                          className={`form-control ${
                            errors.email && "is-invalid"
                          }`}
                          placeholder="Ingrese Email *"
                          value={email}
                          name="email"
                          onChange={onInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className={`form-control ${
                            errors.password && "is-invalid"
                          }`}
                          placeholder="Password *"
                          value={password}
                          name="password"
                          onChange={onInputChange}
                        />
                      </div>
                      {/* <div className="form-group">
                                <input type="password" className="form-control" placeholder="Confirm Password *" value="" />
                            </div> */}
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="date"
                          className={`form-control ${
                            errors.birthDay && "is-invalid"
                          }`}
                          placeholder="birthDay *"
                          value={birthDay}
                          name="birthDay"
                          onChange={onInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          minLength="10"
                          maxLength="10"
                          name="phone"
                          className={`form-control ${
                            errors.phone && "is-invalid"
                          }`}
                          placeholder="Enter phone *"
                          value={phone}
                          onChange={onInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <select
                          className="form-control"
                          name="typeUser"
                          value={typeUser}
                          onChange={onInputChange}
                        >
                          <option className="hidden" disabled>
                            Selecciona un tipo de usuario
                          </option>
                          <option value="Admin">Admin</option>
                          <option value="Officer">Officer</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <select
                          className="form-control"
                          name="position"
                          value={position}
                          onChange={onInputChange}
                        >
                          <option value="">Seleccione una posición</option>
                          {positionsData.map((positionOption) => (
                            <option key={positionOption} value={positionOption}>
                              {positionOption}
                            </option>
                          ))}
                        </select>
                      </div>
                      <input
                        type="submit"
                        className="btnRegister"
                        value="Register"
                      />
                    </div>
                  </div>
                </div>

                {usersCreated && (
                  <div>
                    Registro exitoso. ¡El usuario ha sido creado con éxito!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
