import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TodoModel } from "../../../Models/TodoModel";
import store from "../../../Redux/Store";
import { useForm, useFormState } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./EditTodo.css";
import web from "../../../Services/WebApi";
import notify, { SccMsg } from "../../../Services/Notification";
import { taskUpdatedAction } from "../../../Redux/TasksAppState";
import { Button, Form, Modal } from "react-bootstrap";
import { idText } from "typescript";

interface EditTodoProps {
  id: number | undefined;
  show: boolean;
  handleClose: any;
  setTasks: React.Dispatch<React.SetStateAction<TodoModel[]>>;
}

function EditTodo(props: EditTodoProps): JSX.Element {
  
    
    const [task, setTask] = useState<TodoModel>(store.getState().tasksReducer.tasks.filter(t => t.id === props.id)[0]);

    const schema = yup.object().shape({
      caption: yup.string().required("Caption is required"),
      info: yup.string().required("Info is required"),
      classification: yup.string().required("Classification is required"),
      dueDate: yup
        .date()
        // .min(new Date(), "Umm... past due date? come on!")
        .default(new Date())
        .typeError("You must specify a due date")
        .required("due date is required")
        .nullable()
        .default(() => new Date()),
    });

     let defaultValuesObj = { ...task };

     const {
       register,
       handleSubmit,
       control,
       formState: { errors, isDirty, isValid },
     } = useForm<TodoModel>({
       defaultValues: defaultValuesObj,
       mode: "all",
       resolver: yupResolver(schema),
     });

     const { dirtyFields } = useFormState({ control });

     const yalla = async (todo: TodoModel) => {
       web.updateTask(props.id || 0, todo)
         .then((res) => {
           notify.success(SccMsg.UPDATE_TASK);
           store.dispatch(taskUpdatedAction(res.data));
           props.handleClose();
         })
         .catch((err) => {
           notify.error("Oppsy : " + err.message);
         });
         return store.subscribe(() => {
           props.setTasks([...store.getState().tasksReducer.tasks]); 
         });
     };


    return (
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
              <span className="text-danger">
                {errors.classification?.message}
              </span>
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
            <Form.Group className="mb-3" controlId="formBasicButton">
              <Button
                disabled={!isValid || !isDirty}
                variant="primary"
                type="submit"
              >
                Update
              </Button>
              <Button className="float-end" variant="secondary" onClick={props.handleClose}>
                Close
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    );
}

export default EditTodo;
