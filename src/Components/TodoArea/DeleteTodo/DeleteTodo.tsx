import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { idText } from "typescript";
import store from "../../../Redux/Store";
import { taskDeletedAction } from "../../../Redux/TasksAppState";
import notify, { SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import "./DeleteTodo.css";

function DeleteTodo(): JSX.Element {
    const navigate = useNavigate();
    const params = useParams();
    const id = +(params.id || 0);

    const no = () => {
      navigate("/tasks");
    };

    const yes = () => {
      web
        .deleteTask(id)
        .then((res) => {
          notify.success(SccMsg.DELETE_TASK);
          navigate("/tasks");
          // Update App State (Global State)
          store.dispatch(taskDeletedAction(id));
        })
        .catch((err) => {
          notify.error(err.message);
          navigate("/tasks");
        });
    };

    return (
      <div className="DeleteTodo text-center">
        <h1>Delete Task</h1>
        <h3>Are you sure you want to delete task #{id}?</h3>
        <Button onClick={yes} variant="danger" className="mx-2">
          Yes
        </Button>
        <Button onClick={no} variant="secondary">
          No
        </Button>
      </div>
    );
}

export default DeleteTodo;
