import moment from "moment";
import { Card, Col } from "react-bootstrap";
import { TodoModel } from "../../../Models/TodoModel";
import "./TaskItem.css";

 interface TaskItemProps {
   task: TodoModel;
 }

function TaskItem(props: TaskItemProps): JSX.Element {
   
    return (
      <Col>
        <Card>
          <Card.Header className="text-center">
            {props.task.caption}
          </Card.Header>
          <Card.Body>
            <Card.Text>{props.task.classification}</Card.Text>
            <Card.Text>
              {moment(props.task.dueDate).format("DD/MM/yyyy")}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    );
}

export default TaskItem;
