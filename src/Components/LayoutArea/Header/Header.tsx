import { Container, Nav, Navbar } from "react-bootstrap";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import logo from "../../../Assets/Images/todo.png";
import "./Header.css";
import CustomLink from "../../RoutingArea/CustomLink/CustomLink";
import { Link } from "react-router-dom";

function Header(): JSX.Element {
    return (
      <div className="Header">
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand
              href="/home"
              className="d-flex align-items-center gap-2"
            >
              <img
                alt=""
                src={logo}
                width="45"
                height="45"
                className="d-inline-block"
              />{" "}
              <h2 className="d-inline-block ">Todo App</h2>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link>
                  <CustomLink to="home">Home</CustomLink>
                </Nav.Link>
                <Nav.Link>
                  <CustomLink to="about">About</CustomLink>
                </Nav.Link>
                <Nav.Link>
                  <CustomLink to="/tasks">Tasks</CustomLink>
                </Nav.Link>
              </Nav>
              <AuthMenu/>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
}

export default Header;
