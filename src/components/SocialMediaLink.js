
import React, { useState } from 'react'
import "./SocialMediaLink.css";



function SocialMediaLink({ icon, socialLink, onLinkChange, onIsActive, onTrashButton }) {
    const { isActive, link } = socialLink;
    const [error, setError] = useState(false);
    // const [isChecked, setIsChecked] = useState(isActive);

    // console.log(onLinkChange);
    // console.log(onIsActive);
    // console.log(onTrashButton);

    const handleToggle = () => {
        if (link.length === 0) {
            setError(true);
            return;
        }
        onIsActive(!isActive);
    }

    const handleChange = (e) => {
        setError(false);
        onLinkChange(e);
    }

    return (
        <div className="social_link">
            <div className="social_container">
                <i class={`fab ${icon} icon`}></i>
                {/* <i class="fab {icon} icon"></i> */}

                <input type="text" className="social_link_input" value={link} placeholder="" onChange={handleChange} />

                <div class="add-remove-toggle">
                    {/* <button class="btn">  */}
                    <label class="switch-toggle">
                        <input type="checkbox" class="checkbox-toggle" onClick={handleToggle} checked={isActive} />
                        <span class="slider-toggle round-toggle"></span>
                    </label>
                    {/* </button>  */}
                </div>
                <i class="fas fa-trash" id="delete" onClick={onTrashButton}></i>
            </div >


            {error && <p className="social_error">Please fill the name</p>}
        </div>

    )
}

export default SocialMediaLink
