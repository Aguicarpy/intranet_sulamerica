import React from "react";
import { useSelector } from "react-redux";

export const UserProfile = () => {
    const user = useSelector((state) => state.dataUser);

    return (
        <div>
            <h1>User Profile</h1>
            <div>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Cumpleaños: {user.congratulations}</p>
                {/* Agrega más campos según los datos de tu modelo */}
            </div>
        </div>
    );
};





