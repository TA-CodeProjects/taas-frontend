import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { TodoModel } from "../../../Models/TodoModel";
import { UserModel } from "../../../Models/Welcome";
import notify, { SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import TaskItem from "../TaskItem/TaskItem";
import "./TaskList.css";

function TaskList(): JSX.Element {
    const [tasks, setTasks] = useState<TodoModel[]>([])

    useEffect(() => {
        web.getAdminTasks()
        .then((res) => {
            notify.success(SccMsg.ALL_TASKS);
            setTasks(res.data);
        })
        .catch((err) => {
            notify.error(err.message);
        });
    }, []);

    return (
      <div className="TaskList">
        <Container>
          <h2 className="text-center mb-4">Todo List</h2>
          <Row xs={1} md={3} lg={4} className="gap-4">
            {tasks.length > 0
              ? tasks.map((task) => <TaskItem key={task.id} task={task} />)
              : "No tasks found"}
          </Row>
        </Container>
      </div>
    );
}

export default TaskList;
