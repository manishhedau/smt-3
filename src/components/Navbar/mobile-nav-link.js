import { Link } from "react-router-dom";

const MobileNavLink = (props) => {

    const { url, content, isActive, handleClick, id } = props;

    return (
        <Link to={url}>
            <div id={id} onClick={handleClick} style={{ color: isActive ? "white" : "black" }}>{content}</div>
        </Link>
    );
}

export default MobileNavLink;