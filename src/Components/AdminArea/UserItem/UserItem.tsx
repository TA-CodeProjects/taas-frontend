import { UsersModel } from "../../../Models/Welcome";
import "./UserItem.css";

interface UserItemProps {
    user: UsersModel;
}

function UserItem(props: UserItemProps): JSX.Element {
    return (
      <tr>
        <td>{props.user.id}</td>
        <td>{props.user.email}</td>
        <td>{props.user.password}</td>
        <td>{props.user.type}</td>
      </tr>
    );
}

export default UserItem;
