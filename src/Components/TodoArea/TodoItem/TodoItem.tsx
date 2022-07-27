import moment from "moment";
import { Button, Card, Col } from "react-bootstrap";
import { TodoModel } from "../../../Models/TodoModel";
import CustomLink from "../../RoutingArea/CustomLink/CustomLink";
import { MdDelete, MdModeEdit } from "react-icons/md";
import "./TodoItem.css";
import { Link } from "react-router-dom";
import DeleteTodo from "../DeleteTodo/DeleteTodo";
import { useState } from "react";

interface TodoItemProps {
  task: TodoModel;
  setTasks: React.Dispatch<React.SetStateAction<TodoModel[]>>;
}

function TodoItem(props: TodoItemProps): JSX.Element {
   const [show, SetShow] = useState(false);
   const handleClose = () => SetShow(false);
   const handleShow = () => SetShow(true);
   
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
            <Button onClick={handleShow} variant="default" >
              <MdDelete size={42} />
            </Button>
            <DeleteTodo
              id={props.task.id}
              show={show}
              handleClose={handleClose}
              setTasks={props.setTasks}
            />
            {/* <Link to={`delete/${props.task.id}`} >
              <MdDelete size={42} />
            </Link> */}
            <Link to={`update/${props.task.id}`} >
              <MdModeEdit size={42} />
            </Link>
          </Card.Footer>
        </Card>
      </Col>
    );
}

export default TodoItem;
function parentSetState(tasks: any): (tasks: TodoModel[]) => any {
  throw new Error("Function not implemented.");
}

function tasks(tasks: any): (tasks: TodoModel[]) => any {
  throw new Error("Function not implemented.");
}

