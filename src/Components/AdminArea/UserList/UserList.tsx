import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UsersModel } from "../../../Models/Welcome";
import notify, { SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import UserItem from "../UserItem/UserItem";
import "./UserList.css";

function UserList(): JSX.Element {
      const [users, setUsers] = useState<UsersModel[]>([]);

      useEffect(() => {
        web
          .getAdminUsers()
          .then((res) => {
            notify.success(SccMsg.ALL_USERS);
            setUsers(res.data);
          })
          .catch((err) => {
            notify.error(err.message);
          });
      }, []);

    return (
      <div className="UserList text-center">
        <h2>Users List</h2>
        {users.length > 0 ? (
          <div className="Table mt-4">
            <Table striped bordered hover>
              <thead>
                <th>Id</th>
                <th>Email</th>
                <th>Password</th>
                <th>Type</th>
              </thead>
              <tbody>
                {users.map((user) => (
                  <UserItem key={user.id} user={user} />
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <h3 className="text-center mt-4 text-muted">
            {" "}
            No companies for you!
          </h3>
        )}
      </div>
    );
}

export default UserList;
