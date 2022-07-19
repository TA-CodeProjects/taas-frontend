import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import store from "../../../Redux/Store";
import { tasksClear } from "../../../Redux/TasksAppState";
import { logoutAction } from "../../../Redux/UserAppState";
import "./Logout.css";

function Logout(): JSX.Element {
    const navigate = useNavigate();

    useEffect(() => {
      const res = window.confirm("Are you sure you want to log out?");
      if (res) {
        store.dispatch(logoutAction());
        store.dispatch(tasksClear());
        navigate("/login");
      }
    });
    return (
        <>
			
        </>
    );
}

export default Logout;
