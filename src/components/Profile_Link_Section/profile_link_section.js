import './profile_link_section.css';
import { Tooltip } from '@mui/material';
import { Link } from "react-router-dom";
import { useState } from 'react';

const ProfileLinkSection = (props) => {

    const [text, setText] = useState("Copy");

    const handleClick = (e) => {
        setText("Copied!");
        console.log(e.target.innerHTML);
        navigator.clipboard.writeText(e.target.innerHTML)
    }

    return (
        <div className="profile-link-section">
            <div className="profile-link-container">

                <i className="far fa-eye"></i>

                <div id="profile-link">
                    <Tooltip title={<h6 style={{ width: "100%" }}>{text}</h6>}>
                        <h5 onClick={handleClick}>https://skyhype.in/:userId</h5>
                    </Tooltip>
                </div>
                <Link to="/user/61815b950cda90d1d126f33b">user Profile</Link>
                <i className="fa-solid fa-share-nodes"></i>
                <i className="fas fa-qrcode"></i>
            </div>
        </div>
    );
}

export default ProfileLinkSection;