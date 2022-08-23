import moment from "moment";
import { Badge, Card, Col } from "react-bootstrap";
import { TodoModel } from "../../../Models/TodoModel";
import "./TaskItem.css";

 interface TaskItemProps {
   task: TodoModel;
 }

function TaskItem(props: TaskItemProps): JSX.Element {
   
    return (
      <tr>
        <td>{props.task.id}</td>
        <td>
          {props.task.done ? (
            <Badge bg="success">Done</Badge>
          ) : (
            <Badge bg="dark">unDone</Badge>
          )}
        </td>
        <td>{props.task.classification}</td>
        <td>{moment(props.task.dueDate).format("DD/MM/yyyy")}</td>
        <td>{props.task.caption}</td>
        <td>{props.task.info}</td>
      </tr>
    );
}

export default TaskItem;
