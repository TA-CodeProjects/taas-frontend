import { useEffect, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { UserModel } from "../../../Models/Welcome";
import store from "../../../Redux/Store";
import CustomLink from "../../RoutingArea/CustomLink/CustomLink";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {
    const [user, setUser] = useState<UserModel>(
      store.getState().authReducer.user
    );
    

    useEffect(() => {
      const unsubscribe = store.subscribe(() => {
        setUser(store.getState().authReducer?.user || new UserModel());
      });

      return unsubscribe;
    }, []);

    return (
      <>
        {user?.token ? (
          <Nav>
            <Navbar.Text className="fw-bolder mx-3 text-light text-capitalize">
              Hello {user.email.split("@")[0]}
            </Navbar.Text>
            {user?.email === "admin@admin.com" && (
            <Nav.Link>
              <CustomLink to="admin">Admin Panel</CustomLink>
            </Nav.Link>
            )}  
            <Nav.Link>
              <CustomLink to="logout">Logout</CustomLink>
            </Nav.Link>
          </Nav>
        ) : (
          <Nav>
            <Navbar.Text className="fw-bolder mx-3 text-light">
              Hello Guest
            </Navbar.Text>
            <Nav.Link>
              <CustomLink to="login">Login</CustomLink>{" "}
            </Nav.Link>
            <Nav.Link>
              <CustomLink to="register">Register</CustomLink>
            </Nav.Link>
          </Nav>
        )}
      </>
    );
}

export default AuthMenu;
