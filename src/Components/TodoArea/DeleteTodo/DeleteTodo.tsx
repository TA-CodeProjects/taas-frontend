import { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { TodoModel } from "../../../Models/TodoModel";
import store from "../../../Redux/Store";
import { taskDeletedAction } from "../../../Redux/TasksAppState";
import notify, { SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import "./DeleteTodo.css";
interface DeleteTodoProps {
  id: number | undefined;
  show: boolean;
  handleClose: any;
  setTasks: React.Dispatch<React.SetStateAction<TodoModel[]>>;
}


function DeleteTodo(props: DeleteTodoProps): JSX.Element {
    
    const no = () => {
      props.handleClose();
    };

    const yes = () => {
        web
          .deleteTask(props.id || 0)
          .then((res) => {
            notify.success(SccMsg.DELETE_TASK);
            // Update App State (Global State)
            store.dispatch(taskDeletedAction(props.id || 0));
            props.handleClose();
          })
          .catch((err) => {
            notify.error(err.message);
            props.handleClose();
          });
        return store.subscribe(() => {
          props.setTasks(store.getState().tasksReducer.tasks); // Will let us notify
        });
      
    };

    return (
      <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header>
          <Modal.Title>Delete Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete task #{props.id}?
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={yes} variant="danger" className="mx-2">
           Yes
         </Button>
         <Button onClick={no} variant="secondary">
           No
         </Button>
      </Modal.Footer>
      </Modal>
      </>

      // <div className="DeleteTodo text-center">
      //   <h1>Delete Task</h1>
      //   <h3>Are you sure you want to delete task #{id}?</h3>
      //   <Button onClick={yes} variant="danger" className="mx-2">
      //     Yes
      //   </Button>
      //   <Button onClick={no} variant="secondary">
      //     No
      //   </Button>
      // </div>
    );
}

export default DeleteTodo;
