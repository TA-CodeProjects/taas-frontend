import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { TodoModel } from "../../../Models/TodoModel";
import { FaPlus } from "react-icons/fa";
import store from "../../../Redux/Store";
import { tasksDownloadedAction } from "../../../Redux/TasksAppState";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import TodoItem from "../TodoItem/TodoItem";
import "./TodoList.css";

function TodoList(): JSX.Element {
  const navigate = useNavigate();
  
  const [tasks, setTasks] = useState<TodoModel[]>(
    store.getState().tasksReducer.tasks
  );

   useEffect(() => {
     // If we don't have a user object - we are not logged in
     if (!store.getState().authReducer.user.token) {
       notify.error(ErrMsg.PLS_LOGIN);
       navigate("/login");
     }
   }, []);

  useEffect(() => {
    if (store.getState().tasksReducer.tasks.length === 0) {
      web
        .getAllTasks()
        .then((res) => {
          notify.success(SccMsg.ALL_TASKS);
          setTasks(res.data);
          store.dispatch(tasksDownloadedAction(res.data));
        })
        .catch((err) => {
          notify.error(err.message);
        });
    }
  }, []);

  

  return (
    <div className="TodoList">
      <Container>
        <h2 className="text-center" mb-4>
          Todo List
        </h2>
        <div className="text-center my-4">
          <Link to="add">
            <FaPlus size={56} />
          </Link>
        </div>
        <Row xs={1} md={3} lg={4} className="gap-4">
          {tasks.length > 0
            ? tasks.map((task) => <TodoItem key={task.id} task={task} />)
            : "No tasks found"}
        </Row>
      </Container>
    </div>
  );
}

export default TodoList;