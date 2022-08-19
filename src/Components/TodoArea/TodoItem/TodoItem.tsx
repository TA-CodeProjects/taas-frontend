import moment from "moment";
import { Button, Card, Col } from "react-bootstrap";
import { TodoModel } from "../../../Models/TodoModel";
import { MdDelete, MdModeEdit } from "react-icons/md";
import "./TodoItem.css";
import { Link } from "react-router-dom";
import DeleteTodo from "../DeleteTodo/DeleteTodo";
import { useState } from "react";
import EditTodo from "../EditTodo/EditTodo";

interface TodoItemProps {
  task: TodoModel;
  setTasks: React.Dispatch<React.SetStateAction<TodoModel[]>>;
}

function TodoItem(props: TodoItemProps): JSX.Element {
  const [showDelete, SetShowDelete] = useState(false);
  const handleCloseDelete = () => SetShowDelete(false);
  const handleShowDelete = () => SetShowDelete(true);

  const [showEdit, SetShowEdit] = useState(false);
  const handleCloseEdit = () => SetShowEdit(false);
  const handleShowEdit = () => SetShowEdit(true);

  return (
    <>
      <Col xs="2" className="align-self-center">
        <h5 className="text-center">
          {moment(props.task.dueDate).format("DD/MM/yyyy")}
        </h5>
      </Col>
      <Col xs="5">
        <h3>{props.task.caption}</h3>
        <p>{props.task.info}</p>
      </Col>
      <Col xs="3" className="align-self-center">
        <h3 className="text-center">{props.task.classification}</h3>
      </Col>
      <Col xs="2" className="align-self-center">
        <div className="d-flex">
          <div>
            <Button onClick={handleShowEdit}>
              <MdModeEdit size={42} />
            </Button>
            <EditTodo
              id={props.task.id}
              show={showEdit}
              handleClose={handleCloseEdit}
              setTasks={props.setTasks}
            />
          </div>
          <div>
            <Button onClick={handleShowDelete}>
              <MdDelete size={42} />
            </Button>
            <DeleteTodo
              id={props.task.id}
              show={showDelete}
              handleClose={handleCloseDelete}
              setTasks={props.setTasks}
            />
          </div>
        </div>
        {/* <Link to={`update/${props.task.id}`}>
          <MdModeEdit size={42} />
        </Link> */}
      </Col>
    </>
  );
}

export default TodoItem;
