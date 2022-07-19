import TodoTotal from "../../TodoArea/TodoTotal/TodoTotal";
import "./Footer.css";

function Footer(): JSX.Element {
    return (
      <div className="Footer fixed-bottom bg-primary d-flex justify-content-evenly p-3">
        <div></div>
        <p className="text-light align-self-center">
          All right reserved &copy; to Todo app
        </p>
        <div className="align-self-center">
          <TodoTotal />
        </div>
      </div>
    );
}

export default Footer;
