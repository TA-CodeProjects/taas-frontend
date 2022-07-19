import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import store from "../../../Redux/Store";
import notify, { ErrMsg } from "../../../Services/Notification";
import "./AdminPanel.css";

function AdminPanel(): JSX.Element {
    const navigate = useNavigate();

     useEffect(() => {
       // If we don't have a user object - we are not logged in
       if (!store.getState().authReducer.user.token) {
         notify.error(ErrMsg.PLS_LOGIN);
         navigate("/login");
       }
     }, []);


    return (
      <div className="AdminPanel text-center">
        <h1 className=" my-5">Welcome Admin</h1>
        <div className="d-grid gap-2">
          <p className="text-muted my-2">Please choose where you want to go:</p>
          <div className="my-4 ">
            <Link to="/admin/users">
              <Button variant="primary" size="lg">
                Users List
              </Button>
            </Link>{" "}
          </div>
          <div>
            <Link to="/admin/tasks">
              <Button variant="secondary" size="lg">
                Tasks List
              </Button>
            </Link>{" "}
          </div>
        </div>
      </div>
    );
}

export default AdminPanel;
