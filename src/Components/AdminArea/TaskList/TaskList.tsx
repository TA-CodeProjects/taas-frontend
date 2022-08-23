import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { TodoModel } from "../../../Models/TodoModel";
import notify, { SccMsg } from "../../../Services/Notification";
import web from "../../../Services/WebApi";
import TaskItem from "../TaskItem/TaskItem";
import "./TaskList.css";

function TaskList(): JSX.Element {
  const [tasks, setTasks] = useState<TodoModel[]>([]);

  useEffect(() => {
    web
      .getAdminTasks()
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
      <h2>Todo List</h2>
      {tasks.length > 0 ? (
        <div className="Table mt-4">
          <Table striped bordered hover>
            <thead>
              <th>Id</th>
              <th>Done</th>
              <th>Classification</th>
              <th>DueDate</th>
              <th>Caption</th>
              <th>Info</th>
            </thead>
            <tbody>
              {tasks
                .sort(
                  (a: any, b: any) =>
                    new Date(a.dueDate).getDate() -
                    new Date(b.dueDate).getDate()
                )
                .sort((a: any, b: any) => a.done - b.done)
                .map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <h3 className="text-center mt-4 text-muted"> No tasks found!</h3>
      )}
    </div>
  );
}

export default TaskList;
