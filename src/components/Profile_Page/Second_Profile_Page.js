import React from 'react'
import "./styles/profile_page.css";
import "./styles/second_profile_page.css";
import Avtar from "../assets/avtar.jpg";
function SecondProfilePage({ name, designation, description = "" }) {

    const data = [1, 2, 4, 4];

    return (
        <div className="profile-container" >
            <div className="profile-page Avtar-background">
                <div className="profile-main-section">
                    <div className="profile-content">
                        <div className="first-profile-section">
                            <h4>{name}</h4>
                            <h6>{designation}</h6>
                        </div>
                        <div className="profile-text">
                            {description && <p>{description.substring(0, 190)}...</p>}
                        </div>
                        <div className="groups-section">
                            <h6>My Group</h6>
                            <div className="group-row">
                                {
                                    data.map((invite, index) => (
                                        <div class="group-invite" key={index}>
                                            <img src={Avtar} alt="" className="profile-image" />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default SecondProfilePage
