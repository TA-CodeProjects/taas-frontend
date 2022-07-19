import moment from "moment";
import { Card, Col } from "react-bootstrap";
import { TodoModel } from "../../../Models/TodoModel";
import CustomLink from "../../RoutingArea/CustomLink/CustomLink";
import { MdDelete, MdModeEdit } from "react-icons/md";
import "./TodoItem.css";
import { Link } from "react-router-dom";

interface TodoItemProps {
    task: TodoModel;
}

function TodoItem(props: TodoItemProps): JSX.Element {
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
          <Card.Footer className="d-flex justify-content-around">
            <Link to={`delete/${props.task.id}`}>
              <MdDelete size={42} />
            </Link>
            <Link to={`update/${props.task.id}`}>
              <MdModeEdit size={42} />
            </Link>
          </Card.Footer>
        </Card>
      </Col>
    );
}

export default TodoItem;
