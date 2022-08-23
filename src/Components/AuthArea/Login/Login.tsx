import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./Login.css";
import { CredentialsModel, LoginModel } from "../../../Models/Welcome";
import web from "../../../Services/WebApi";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import store from "../../../Redux/Store";
import { loginAction } from "../../../Redux/UserAppState";
import { Button, Form } from "react-bootstrap";

function Login(): JSX.Element {
    const navigate = useNavigate();

    const schema = yup.object().shape({
      email: yup
        .string()
        .email("Invalid Email Pattern")
        .required("Email is required"),
      password: yup
        .string()
        .required("Password is required")
        .min(3, "at least 3 characters required")
        .max(8, "at most 8 characters required"),
    });

    const {
      register,
      handleSubmit,
      formState: { errors, isDirty, isValid },
    } = useForm<LoginModel>({ mode: "all", resolver: yupResolver(schema) });

    const loginUser = async (model: LoginModel) => {
      const credentials = new CredentialsModel();
      credentials.email = model.email;
      credentials.password = model.password;

      console.log("going to send to remote server..." + credentials);

      web
        .login(credentials)
        .then((res) => {
          notify.success(SccMsg.LOGIN_SUCCESS);
          store.dispatch(loginAction(res.data));
          if (res.data.email === "admin@admin.com") {
            navigate("/admin");
          } else {
          navigate("/tasks");
          }
        })
        .catch((err) => {
          notify.error(ErrMsg.LOGIN_FAILED);
        });
    };

    return (
      <div className="Login">
        <h1 className="text-center">Login</h1>
        <Form
          onSubmit={handleSubmit(loginUser)}
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
          <Button disabled={!isValid} variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    );
}

export default Login;
