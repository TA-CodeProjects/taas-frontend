import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./AddTodo.css";
import { useForm } from "react-hook-form";
import { TodoModel } from "../../../Models/TodoModel";
import { Button, Form } from "react-bootstrap";
import web from "../../../Services/WebApi";
import notify, { SccMsg } from "../../../Services/Notification";
import store from "../../../Redux/Store";
import { taskAddedAction } from "../../../Redux/TasksAppState";

function AddTodo(): JSX.Element {
  const navigate = useNavigate();

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
    formState: { errors, isDirty, isValid },
  } = useForm<TodoModel>({ mode: "all", resolver: yupResolver(schema) });

  const yalla = async (todo: TodoModel) => {
    console.log(todo);
    console.log(JSON.stringify(todo));

    web
      .addTask(todo)
      .then((res) => {
        notify.success(SccMsg.ADD_TASK);
        navigate("/tasks");
        // Update App State (Global State)
        store.dispatch(taskAddedAction(res.data));
      })
      .catch((err) => {
        notify.error("Oppsy : " + err.message);
        navigate("/tasks");
      });
  };

  return (
    <div className="AddTodo">
      <h1 className="text-center mb-4">Add Task</h1>
      <Form onSubmit={handleSubmit(yalla)}>
        <Form.Group className="mb-3" controlId="formBasicCaption">
          <Form.Label>Caption</Form.Label>
          <Form.Control
            {...register("caption")}
            type="text"
            placeholder="Enter Caption"
          />
          <span className="text-danger">{errors.caption?.message}</span>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicInfo">
          <Form.Label>Info</Form.Label>
          <Form.Control
            {...register("info")}
            type="text"
            placeholder="Enter Info"
          />
          <span className="text-danger">{errors.info?.message}</span>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicClassification">
          <Form.Label>Classification</Form.Label>
          <Form.Control
            {...register("classification")}
            type="text"
            placeholder="Enter Classification"
          />
          <span className="text-danger">{errors.classification?.message}</span>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDueDate">
          <Form.Label>DueDate</Form.Label>
          <Form.Control
            {...register("dueDate")}
            type="datetime-local"
            placeholder="Enter DueDate"
          />
          <span className="text-danger">{errors.dueDate?.message}</span>
        </Form.Group>
        <Button disabled={!isValid} variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </div>
  );
}

export default AddTodo;
