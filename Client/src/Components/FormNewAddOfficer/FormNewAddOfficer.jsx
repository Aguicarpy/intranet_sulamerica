import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postOfficer, allPositions } from "../../Redux/actions";
import { useForm } from "../hooks/useForm";

export const FormNewAddOfficer = () => {
  const focusRef = useRef();
  const dispatch = useDispatch();
  const userCreated = useSelector((state) => state.userCreated);
  const dataUser = useSelector((state) => state.dataUser);
  const dataPosition = useSelector((state) => state.dataPositions)
  const allPosition = dataPosition.map((cargo) => cargo.position)
//   console.log(allPosition);

    // console.log(dataUser.Positions);

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
    position: allPosition, // Debes llenar esto con opciones de dataUser.Positions
    email: "",
    password: "",
  });
  useEffect(() => {
    dispatch(allPositions())
  }, [dispatch]);

  useEffect(() => {
    focusRef.current.focus();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(postOfficer(formState));
  };
//   console.log(formState);

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">User name</label>
          <input
            ref={focusRef}
            type="text"
            className="form-control"
            name="name"
            placeholder="Enter user name"
            value={name}
            onChange={onInputChange}
            required
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="birthDay">Birth Day</label>
          <input
            type="date"
            className="form-control"
            name="birthDay"
            value={birthDay}
            onChange={onInputChange}
            required
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="number"
            className="form-control"
            name="phone"
            placeholder="Enter phone"
            value={phone}
            onChange={onInputChange}
            required
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="typeUser">User Type</label>
          <select
            className="form-control"
            name="typeUser"
            value={typeUser}
            onChange={onInputChange}
            required
          >
            <option value="Admin">Admin</option>
            <option value="Officer">Officer</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="position">Position</label>
          <select
            className="form-control"
            name="position"
            value={position}
            onChange={onInputChange}
            required
          >
            {allPosition.map((index) => {
                return (
                    <option key={index} value={index}>{index}</option>
                )
            })} 
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Enter email"
            value={email}
            onChange={onInputChange}
            required
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            value={password}
            onChange={onInputChange}
            required
          ></input>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      {userCreated && <div>User created successfully!</div>}
    </>
  );
};
