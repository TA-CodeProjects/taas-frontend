import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./Register.css";
import { CredentialsModel, RegisterModel } from "../../../Models/Welcome";
import web from "../../../Services/WebApi";
import notify from "../../../Services/Notification";
import { Button, Form } from "react-bootstrap";

function Register(): JSX.Element {
    const navigate = useNavigate();

    const schema = yup.object().shape({
      email: yup
        .string()
        .email("Invalid Email Pattern")
        .required("Email is required"),
      password: yup
        .string()
        .min(3, "at least 3 characters required")
        .max(8, "at most 8 characters required")
        .required("Password is required"),
      confirm: yup
        .string()
        .test("passwords-match", "Passwords must match", function (value) {
          return this.parent.password === value;
        }),
    });

     const {
       register,
       handleSubmit,
       formState: { errors, isDirty, isValid },
     } = useForm<RegisterModel>({ mode: "all", resolver: yupResolver(schema) });

     const registerUser = async (model: RegisterModel) => {
       const credentials = new CredentialsModel();
       credentials.email = model.email;
       credentials.password = model.password;

       console.log("going to send to remote server..." + credentials);

       web
         .register(credentials)
         .then((res) => {
           notify.success("register successfully");
           navigate("/login");
         })
         .catch((err) => {
           console.log(err);
           notify.error(err.value);
         });
     };
     
    return (
      <div className="Register">
        <h1 className="text-center">Register</h1>
        <Form
          onSubmit={handleSubmit(registerUser)}
          className="border border-default border-3 p-4 my-5"
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              {...register("email")}
              type="email"
              placeholder="Enter Email"
            />
            <span className="text-danger">{errors.email?.message}</span>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              {...register("password")}
              type="password"
              placeholder="Enter Password"
            />
            <span className="text-danger">{errors.password?.message}</span>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicConfirm">
            <Form.Label>Confirm</Form.Label>
            <Form.Control
              {...register("confirm")}
              type="confirm"
              placeholder="Enter Confirm"
            />
            <span className="text-danger">{errors.confirm?.message}</span>
          </Form.Group>
          <Button disabled={!isValid} variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </div>
    );
}

export default Register;
