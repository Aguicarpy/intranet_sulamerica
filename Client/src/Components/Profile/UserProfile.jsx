import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, clearAlerts} from "../../Redux/actions";
import { useParams } from "react-router-dom";
import "./UserProfile.less";
import axios from "axios";
// const { CLOUD_NAME } = process.env;
import { toast } from "react-toastify";

export const UserProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.dataUser);
  const dataPosition = userProfile.Positions.map((cargo) => cargo.position)
  console.log(userProfile);
  const dataDepartment = userProfile.Positions.map((cargo) => cargo.department)
  const alert = useSelector(state=>state.alerts)

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
  }, [alert]);

  const [isUpdating, setIsUpdating] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [cloudinaryImage, setCloudinaryImage] = useState("");
  const [editPassword, setEditPassword] = useState(false);
  const [isPhotoSelected, setIsPhotoSelected] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: userProfile.name,
    birthDay: userProfile.birthDay,
    phone: userProfile.phone,
    imageUrl: userProfile.imageUrl,
    email: userProfile.email,
    position: dataPosition.join(', '), // Convertir el array en una cadena legible
    department: dataDepartment.join(', '), // Convertir el array en una cadena legible
    userActualPassword: userProfile.userActualPassword || "",
    userNewPasswordToDispatch: userProfile.userNewPasswordToDispatch || "",
    userNewPassword: userProfile.userNewPassword || "",
    DBpassword: userProfile.password || "",
  })
  // console.log(userData.position);
  // console.log(userData.department);
  const [errors, setErrors] = useState({
    name:"",
    userNewPasswordToDispatch:"",
    userNewPassword:"",
    imageUrl:""
  });

  const handleImageUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "sulamerica");

      // Envía el archivo al servidor para que el servidor lo cargue en Cloudinary
      const response = await axios.post("http://localhost:3015/imgOfficer/upload", formData);

      if (response.data.secure_url) {
        const imageUrl = response.data.secure_url;
        setUserData((prevUserData) => ({
          ...prevUserData,
          imageUrl,
        }));
      }
    } catch (error) {
      console.error("Error al cargar la imagen a Cloudinary:", error);
    }
  };
  
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const maxImageSize = 200;
    if (file) {
        // Verificar el tamaño máximo
        if (file.size / 1024 <= maxImageSize) { // Convertir el tamaño a KB
            // Verificar que la imagen sea cuadrada (ancho = alto)
            if (file.width === file.height) {
                try {
                    await handleImageUpload(file); // Cargar la imagen si pasa las validaciones
                    setIsPhotoSelected(true);
                    setHasChanges(true);
                    setCloudinaryImage(file.name);
                } catch (error) {
                    console.error("Error al cargar la imagen:", error);
                }
            } else {
                // Notificar al usuario que la imagen no es cuadrada
                toast.error("La imagen debe ser cuadrada para una foto de perfil", {
                    position: "top-center",
                    autoClose: 3000,
                });
            }
        } else {
            // Notificar al usuario que la imagen excede el tamaño máximo
            toast.error("La imagen excede el tamaño máximo permitido", {
                position: "top-center",
                autoClose: 3000,
            });
        }
    } else {
        setIsPhotoSelected(false);
        setCloudinaryImage("");
    }
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
    if (['userNewPasswordToDispatch', 'userNewPassword', 'imageUrl', 'name'].includes(name)) {
      setHasChanges(true);
      }
  };

  const handleShowClick = () => {
    setIsEditing(true);
  };
  
  const handleHideClick = () => {
    setIsEditing(false);
    setHasChanges(false);
  };

  const handleUpdateClick = async() => {
    if (userData.DBpassword && userData.userActualPassword && userData.userNewPassword) {
      if (userData.userNewPassword !== userData.userNewPasswordToDispatch) {
        toast.error("Las contraseñas no coinciden", {
          position: "top-center",
          autoClose: 3000,
        });
      } else {
        try {
          setIsUpdating(true);
          setIsEditing(true); // Mostrar el estado de edición
  
          // Enviar la solicitud de actualización al backend con los datos
          const response = await dispatch(
            updateUser(
              userData.email,
              userData.name,
              userData.birthDay,
              userData.phone,
              userData.imageUrl,
              userData.DBpassword,
              userData.userActualPassword,
              userData.userNewPassword,
              userData.position,
              userData.department
            )
          );
  
          // Manejar la respuesta del backend
          if (response.status === 200) {
            // Si la actualización fue exitosa, actualiza los datos en el estado local
            const updatedUserData = {
              ...userData,
              userNewPassword: "",
              userNewPasswordToDispatch: "",
              userActualPassword: "",
            };
  
            setUserData(updatedUserData);
  
            // Notifica al usuario sobre la actualización exitosa
            toast.success("Usuario editado con éxito", {
              position: "top-center",
              autoClose: 3000,
            });
          } else {
            // Si el backend responde con un error, muestra un mensaje de error
            toast.error(response.error, {
              position: "top-center",
              autoClose: 3000,
            });
          }
        } catch (error) {
          // Maneja errores generales
          console.error("Error al actualizar el usuario:", error);
        } finally {
          setIsUpdating(false);
          setIsEditing(false); // Vuelve al modo de visualización
          setHasChanges(false);
        }
      }
    } else {
      try {
        setIsEditing(true); // Mostrar el estado de edición
  
        // Enviar la solicitud de actualización al backend con los datos
        const response = await dispatch(
          updateUser(
            userData.email,
            userData.name,
            userData.birthDay,
            userData.phone,
            userData.imageUrl,
            userData.position,
            userData.department
          )
        );
  
        // Manejar la respuesta del backend
        if (response.status === 200) {
          // Si la actualización fue exitosa, notifica al usuario
          toast.success("Usuario editado con éxito", {
            position: "top-center",
            autoClose: 3000,
          });
        } else {
          // Si el backend responde con un error, muestra un mensaje de error
          toast.error(response.error, {
            position: "top-center",
            autoClose: 3000,
          });
        }
      } catch (error) {
        // Maneja errores generales
        console.error("Error al actualizar el usuario:", error);
      } finally {
        setIsUpdating(false);
        setIsEditing(false); // Vuelve al modo de visualización
        setHasChanges(false);
      }
    }
  };

  const handleShowEditPassword = ()=>{
    if(editPassword){
      setEditPassword(false)
    }else if(!editPassword){
      setEditPassword(true)
    }
  }


  //CODIGO QUE YA ESTABA
  if (userProfile.loading) {
    return <div>Cargando...</div>;
  }

  if (userProfile.error) { 
    return <div>Error: {userProfile.error}</div>;
  }

  const { name, email, phone, position, department, imageUrl } = userData; // Accede a las propiedades del perfil


  return (
    <section className="section">
      <div className="_container_38bx6_27 py-5">
        <div className="row">
          <div className="col">
            <nav aria-label="breadcrumb" className="bg-light rounded-3 p-3 mb-4">
              Área Personal
            </nav>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                <label htmlFor="fileInput" className="image-button">
                  {isEditing ? (
                    <>
                    <input
                      type="file"
                      name='imageUrl'
                      id="fileInput"
                      accept=".jpg, .jpeg, .png"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                    {/* Muestra el nombre del archivo seleccionado */}
                    {/* {isPhotoSelected && <p>{cloudinaryImage}</p>} */}
                  </> 
                  ) : null}
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Imagen seleccionada"
                      className="rounded-circle img-fluid profile-image"
                    />
                  ) : (
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                      alt="Seleccionar imagen"
                      className="rounded-circle img-fluid"
                    />
                  )}
                </label>
                <h5 className="my-3">{name}</h5>
                <p className="text-muted mb-1">{department}</p>
                <p className="text-muted mb-4">{position}</p>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card card-2 mb-4">
              <div className="card-body">
                {isEditing ? (
                  // Modo de edición
                  <>
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Nombre</p>
                      </div>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          name="name"
                          value={name}
                          onChange={handleInputChange}
                          className={`form-control ${errors.name && "is-invalid"}`}
                        />
                        {errors.name && (
                          <div className="invalid-feedback">{errors.name}</div>
                        )}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Email</p>
                      </div>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          name="email"
                          value={email}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Teléfono</p>
                      </div>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          name="phone"
                          value={phone}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Profesión</p>
                      </div>
                      <div className="col-sm-9">
                        <input
                          disabled
                          type="text"
                          name="position"
                          value={position}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <hr />
                    {/* Otros campos para edición */}
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Área</p>
                      </div>
                      <div className="col-sm-9">
                        <input
                          disabled
                          type="text"
                          name="department"
                          value={department}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        {editPassword && isEditing ? (
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="form-group">
                            <p className="mb-0">Contraseña Actual:</p>
                            <input
                              type="password"
                              name="userActualPassword"
                              value={userData.userActualPassword}
                              onChange={handleInputChange}
                              className={`form-control `}
                            />
                          </div>
                          <hr />
                          <div className="form-group">
                            <p className="mb-0">Contraseña Nueva:</p>
                            <div className="input-container">
                            <input
                              type="password"
                              name="userNewPassword"
                              value={userData.userNewPassword}
                              onChange={handleInputChange}
                              className={`form-control ${errors.userNewPassword && "is-invalid"}`}
                            />
                            {errors.userNewPassword && (
                              <div className="error-container">
                                <div className="invalid-feedback">{errors.userNewPassword}</div>
                              </div>
                            )}
                        </div>
                          </div>
                          <hr />
                          <div className="form-group">
                            <p className="mb-0">Repita Contraseña Nueva:</p>
                            <div className="input-container">
                            <input
                              type="password"
                              name="userNewPasswordToDispatch"
                              value={userData.userNewPasswordToDispatch}
                              onChange={handleInputChange}
                              className={`form-control ${errors.userNewPasswordToDispatch && "is-invalid"}`}
                            />
                            {errors.userNewPasswordToDispatch && (
                              <div className="error-container">
                                <div className="invalid-feedback">{errors.userNewPasswordToDispatch}</div>
                              </div>
                            )}
                            
                            </div>
                          </div>
                          <hr />
                        </div>
                        ) : (
                          <div>
                            <p></p>
                            <hr />
                          </div>
                        )}
                          {userData.userNewPassword !== userData.userNewPasswordToDispatch && (
                          <p style={{ color: "red", marginRight: "10px" }}>Las contraseñas no coinciden</p>
                          )}
                        {
                        !errors.userNewPasswordToDispatch && !errors.userNewPassword && 
                        userData.name && 
                        
                        <button disabled={!hasChanges || isUpdating} className="btn btn-primary me-2" onClick={handleUpdateClick}>Actualizar Datos</button>
                        }
                        <button
                          className="btn btn-primary me-2"
                          onClick={handleShowEditPassword}
                          >
                          Editar Contraseña
                        </button>
                        <button
                          className="btn btn-primary me-2"
                          onClick={handleHideClick}
                        >
                          Regresar
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  // Modo de visualización
                  <>
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Nombre</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{name}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Email</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{email}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Teléfono</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{phone}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Profesión</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{position}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Área</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{department}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-12">
                        <button
                          className="btn btn-primary"
                          onClick={handleShowClick}
                        >
                          Editar Perfil
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="row">
              {/* Otras secciones */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};





