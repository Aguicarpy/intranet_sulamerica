import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postConvocation, allPositions, clearAlerts, allLocals } from "../../Redux/actions";
import { useForm } from "../hooks/useForm";
import "../FormNewConvocation/FormNewConvocation.less";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const FormNewConvocation = () =>{
    const focusRef = useRef();
    const dispatch = useDispatch();
    const convocationsCreated = useSelector((state) => state.convocationCreated);
    const dataPosition = useSelector((state) => state.dataPositions);
    const dataLocal = useSelector((state) => state.dataLocals);
    const alert = useSelector((state) => state.alerts)

  const [errors, setErrors] = useState({}); // State para almacenar errores
  const [positionsData, setPositionsData] = useState([]); // Aquí almacenaremos las opciones de posición
  const [localsData, setLocalsData] = useState([]); // Aquí almacenaremos las opciones de posición

  const {
    formState,
    title,
    places,
    state,
    position,
    local,
    onInputChange,
  } = useForm({
    title: "",
    places: "",
    state: "",
    position: "", // Inicialmente, establecemos una cadena vacía
    local: ""
  });

  useEffect(() => {
    dispatch(allPositions());
  }, [dispatch]);
  useEffect(() => {
    dispatch(allLocals());
  }, [dispatch]);

  useEffect(() => {
    if (dataPosition.length > 0) {
      setPositionsData(dataPosition.map((cargo) => cargo.position));
    }
  }, [dataPosition]);

  useEffect(() => {
    if (dataLocal.length > 0) {
      setLocalsData(dataLocal.map((locals) => locals.local));
    }
  }, [dataLocal]);

  useEffect(() => {
    focusRef.current.focus();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!title) {
        newErrors.title = "Please enter a title";
    }
    
    if (!places) {
        newErrors.places = "Please enter the number of places";
    } else if (!/^\d+$/.test(places)) {
        newErrors.places = "Number of places should be a valid positive integer";
    }
    
    if (!state) {
        newErrors.state = "Please enter a state";
    }

    if (!position) {
      newErrors.email = "Please enter an position";
    } 

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Devuelve true si no hay errores
  };

  const onSubmit = (event) => {
    event.preventDefault();

    // Validar antes de enviar
    if (validateForm()) {
      dispatch(postConvocation(formState));
    }
  };

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

    return(
        <>
      <form onSubmit={onSubmit}>
        <div className="container convocation">
          {/* <div className="row"> */}
            <div className="col-md-9 convocation-right">
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <h3 className="convocation-heading">Cargar nueva convocatoria</h3>
                  <div className="row convocation-form">
                    <div >
                      <div className="form-group">
                        <input
                          type="text"
                          className={`form-control ${
                            errors.title && "is-invalid"
                          }`}
                          placeholder="Titulo *"
                          value={title}
                          ref={focusRef}
                          name="title"
                          onChange={onInputChange}
                        />
                        {errors.title && (
                          <div className="invalid-feedback">{errors.title}</div>
                        )}{" "}
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className={`form-control ${
                            errors.places && "is-invalid"
                          }`}
                          placeholder="Ingrese plazas *"
                          value={places}
                          name="places"
                          onChange={onInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className={`form-control ${
                            errors.state && "is-invalid"
                          }`}
                          placeholder="Estado *"
                          value={state}
                          name="state"
                          onChange={onInputChange}
                        />
                      </div>
                    </div>
                    <div>
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
                      <div className="form-group">
                        <select
                          className="form-control"
                          name="local"
                          value={local}
                          onChange={onInputChange}
                        >
                          <option value="">Seleccione una sucursal</option>
                          {localsData.map((localOption) => (
                            <option key={localOption} value={localOption}>
                              {localOption}
                            </option>
                          ))}
                        </select>
                      </div>
                      <input
                        type="submit"
                        className="btnConvocation"
                        value="Cargar"
                      />
                    </div>
                  </div>
                </div>

                {/* {convocationsCreated && (
                  <div>
                    Registro exitoso. ¡El usuario ha sido creado con éxito!
                  </div>
                )} */}
              </div>
            </div>
          {/* </div> */}
        </div>
      </form>
    </>
    )
}