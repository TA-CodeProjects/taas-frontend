import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./AddTodo.css";
import { useForm } from "react-hook-form";
import { TodoModel } from "../../../Models/TodoModel";
import { Button, Form, Row } from "react-bootstrap";
import web from "../../../Services/WebApi";
import notify, { SccMsg } from "../../../Services/Notification";
import store from "../../../Redux/Store";
import { taskAddedAction } from "../../../Redux/TasksAppState";

interface AddTodoProps {
  setTasks: React.Dispatch<React.SetStateAction<TodoModel[]>>;
}

function AddTodo(props: AddTodoProps): JSX.Element {

  const schema = yup.object().shape({
    caption: yup.string().required("Caption is required"),
    info: yup.string().required("Info is required"),
    classification: yup.string().required("Classification is required"),
    dueDate: yup
      .date()
      .min(new Date(), "Umm... past due date? come on!")
      .default(new Date())
      .typeError("You must specify a due date")
      .required("due date is required")
      .nullable()
      .default(() => new Date()),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<TodoModel>({ mode: "all", resolver: yupResolver(schema) });

  const yalla = async (todo: TodoModel) => {
    console.log(todo);
    console.log(JSON.stringify(todo));
    web
      .addTask(todo)
      .then((res) => {
        notify.success(SccMsg.ADD_TASK);
        store.dispatch(taskAddedAction(res.data));
        return reset();
      })
      .catch((err) => {
        notify.error("Oppsy : " + err.message);
      });
      return store.subscribe(() => {
        props.setTasks([...store.getState().tasksReducer.tasks]); // Will let us notify
      });
      
  };

  return (
    <div className="AddTodo border border-2 p-2">
      <Form onSubmit={handleSubmit(yalla)}>
        <Row>
          <Form.Group className="col-2" controlId="formBasicCaption">
            <Form.Label>Caption</Form.Label>
            <Form.Control
              {...register("caption")}
              type="text"
              placeholder="Enter Caption"
            />
            <span className="text-danger">{errors.caption?.message}</span>
          </Form.Group>
          <Form.Group className="col-4" controlId="formBasicInfo">
            <Form.Label>Info</Form.Label>
            <Form.Control
              {...register("info")}
              type="text"
              placeholder="Enter Info"
            />
            <span className="text-danger">{errors.info?.message}</span>
          </Form.Group>
          <Form.Group className="col-2" controlId="formBasicClassification">
            <Form.Label>Classification</Form.Label>
            <Form.Control
              {...register("classification")}
              type="text"
              placeholder="Enter Classification"
            />
            <span className="text-danger">
              {errors.classification?.message}
            </span>
          </Form.Group>
          <Form.Group className="col-3" controlId="formBasicDueDate">
            <Form.Label>DueDate</Form.Label>
            <Form.Control
              {...register("dueDate")}
              type="datetime-local"
              placeholder="Enter DueDate"
            />
            <span className="text-danger">{errors.dueDate?.message}</span>
          </Form.Group>
          <Form.Group className="col-1 d-flex" controlId="formBasicButton">
            <Button
              className="align-self-end"
              disabled={!isValid}
              variant="primary"
              type="submit"
            >
              Add
            </Button>
          </Form.Group>
        </Row>
      </Form>
    </div>
  );
}

export default AddTodo;
