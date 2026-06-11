import "./UsersList.css";
import { useEffect, useState } from "react";
import type { Users } from "../Models/Responses/Users";
import { getUsers } from "../services/UsersService";

export function UsersList() {

    const [users, setUsers] = useState<Users[]>([]);

    useEffect(() => {

        getUsers()
            .then((data) => {
                setUsers(data);
            })
            .catch((error) => {
                console.error("Error al obtener usuarios:", error);
            });

    }, []);

    return (

        <div className="container">

            <h1 className="title">
                Usuarios
            </h1>

            <div className="user-grid">

                {users.map((user) => (

                    <div
                        className="user-card"
                        key={user.resourceId}
                    >

                        <div className="user-avatar">
                            {user.name.charAt(0).toUpperCase()}
                        </div>

                        <div>

                            <p className="user-name">
                                {user.name}
                            </p>

                            <p className="user-id">
                                ID: {user.resourceId}
                            </p>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}