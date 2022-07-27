import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {useToken}  from "../../../Services/LoginHook";
import "./AdminPanel.css";

function AdminPanel(): JSX.Element {
    useToken();


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
