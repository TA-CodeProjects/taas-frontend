import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TodoModel } from "../../../Models/TodoModel";
import { FaPlus } from "react-icons/fa";
import store from "../../../Redux/Store";
import { tasksDownloadedAction } from "../../../Redux/TasksAppState";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import TodoItem from "../TodoItem/TodoItem";
import { useToken } from "../../../Services/LoginHook";
import "./TodoList.css";
import AddTodo from "../AddTodo/AddTodo";

function TodoList(): JSX.Element {
  const [tasks, setTasks] = useState<TodoModel[]>(
    store.getState().tasksReducer.tasks
  );

  useToken();

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
        <div className="my-4">
          <AddTodo setTasks={setTasks} />
        </div>

        {tasks.length > 0
          ? tasks
              .sort((a: any, b: any) => new Date(a.dueDate).getDate() - new Date(b.dueDate).getDate())
              .sort((a: any, b: any) => a.done - b.done)
              .map((task) => (
                <Row className="bg-primary  text-white rounded m-2 p-2 d-flex">
                  <TodoItem key={task.id} task={task} setTasks={setTasks} />
                </Row>
              ))
          : "No tasks found"}
      </Container>
    </div>
  );
}

export default TodoList;
