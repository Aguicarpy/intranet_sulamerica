import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./UserProfile.less";

export const UserProfile = () => {
    const { id } = useParams();
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.dataUser);
  console.log(userProfile);
//   console.log(dataPosition);
  const dataPosition = userProfile.Positions.map((cargo) => cargo.position)
  const dataDepartment = userProfile.Positions.map((cargo) => cargo.department)

  const [image, setImage] = useState(null);

  // console.log(dataPosition);
  const [userData, setUserData] = useState({
    name: userProfile.name,
    birthDay: userProfile.birthDay,
    phone: userProfile.phone,
    email: userProfile.email,
    position: dataPosition,
    department: dataDepartment
  })

//   console.log(userData);
//   useEffect(() => {
//     dispatch(login_officer(id));
//     // dispatch(login_officer(id));
//   }, [dispatch, id]);

  if (userProfile.loading) {
    return <div>Cargando...</div>;
  }

  if (userProfile.error) { 
    return <div>Error: {userProfile.error}</div>;
  }

  const { name, email, phone, position, department } = userData; // Accede a las propiedades del perfil
//   console.log(userData); <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
              // className="rounded-circle img-fluid" />

const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
    };
    reader.readAsDataURL(file);
  }
};
  return (
    <section className="section" >
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
            {/* <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
              className="rounded-circle img-fluid" /> */}
              <label htmlFor="fileInput" className="image-button">
                  {image ? (
                    <img
                      src={image}
                      alt="Imagen seleccionada"
                      className="rounded-circle img-fluid"
                    />
                  ) : (
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                      alt="Seleccionar imagen"
                      className="rounded-circle img-fluid"
                    />
                  )}
                  <input
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                </label>
            <h5 className="my-3">{name}</h5>

            <p className="text-muted mb-1">{department}</p>
            <p className="text-muted mb-4">{position}</p>
            {/* <div className="d-flex justify-content-center mb-2">
              <button type="button" className="btn btn-primary">Follow</button>
              <button type="button" className="btn btn-outline-primary ms-1">Message</button>
            </div> */}
          </div>
        </div>
        {/* <div className="card mb-4 mb-lg-0">
          <div className="card-body p-0">
            <ul className="list-group list-group-flush rounded-3">
              <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                <i className="fas fa-globe fa-lg text-warning"></i>
                <p className="mb-0">https://mdbootstrap.com</p>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                <i className="fab fa-github fa-lg" ></i>
                <p className="mb-0">mdbootstrap</p>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                <i className="fab fa-twitter fa-lg" ></i>
                <p className="mb-0">@mdbootstrap</p>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                <i className="fab fa-instagram fa-lg" ></i>
                <p className="mb-0">mdbootstrap</p>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                <i className="fab fa-facebook-f fa-lg" ></i>
                <p className="mb-0">mdbootstrap</p>
              </li>
            </ul>
          </div>
        </div> */}
      </div>
      <div className="col-lg-8">
        <div className="card card-2 mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Nombre</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{name}</p>
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Email</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{email}</p>
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Teléfono</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{phone}</p>
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Profesión</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{position}</p>
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Área</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{department}</p>
              </div>
            </div>
            <hr />
          </div>
        </div>
        <div className="row">
          {/* <div className="col-md-6">
            <div className="card mb-4 mb-md-0">
              <div className="card-body">
                <p className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status
                </p>
                <p className="mb-1" >Web Design</p>
                <div className="progress rounded" >
                  <div className="progress-bar progress-bar_1" role="progressbar" aria-valuenow="80"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p className="mt-4 mb-1" >Website Markup</p>
                <div className="progress rounded" >
                  <div className="progress-bar progress-bar_2" role="progressbar" aria-valuenow="72"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p className="mt-4 mb-1" >One Page</p>
                <div className="progress rounded" >
                  <div className="progress-bar progress-bar_3" role="progressbar" aria-valuenow="89"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p className="mt-4 mb-1" >Mobile Template</p>
                <div className="progress rounded" >
                  <div className="progress-bar progress-bar_4" role="progressbar" aria-valuenow="55"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p className="mt-4 mb-1" >Backend API</p>
                <div className="progress rounded mb-2" >
                  <div className="progress-bar progress-bar_5" role="progressbar" aria-valuenow="66"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
          </div> */}
          {/* <div className="col-md-6">
            <div className="card mb-4 mb-md-0">
              <div className="card-body">
                <p className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status
                </p>
                <p className="mb-1" >Web Design</p>
                <div className="progress rounded" >
                  <div className="progress-bar" role="progressbar" aria-valuenow="80"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p className="mt-4 mb-1" >Website Markup</p>
                <div className="progress rounded" >
                  <div className="progress-bar" role="progressbar" aria-valuenow="72"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p className="mt-4 mb-1" >One Page</p>
                <div className="progress rounded" >
                  <div className="progress-bar" role="progressbar" aria-valuenow="89"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p className="mt-4 mb-1" >Mobile Template</p>
                <div className="progress rounded" >
                  <div className="progress-bar" role="progressbar" aria-valuenow="55"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p className="mt-4 mb-1" >Backend API</p>
                <div className="progress rounded mb-2" >
                  <div className="progress-bar" role="progressbar" aria-valuenow="66"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  </div>
</section>
  );
};





