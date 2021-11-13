import './mobile-navbar.css';
import { useState } from 'react';
import MobileNavLink from './mobile-nav-link';

const navLinks = [
    {
        url: "/dashboard/user/:userId",
        content: "Profile",
        isActive: false
    },

    {
        url: "/dashboard/user/update-social-links/:userId",
        content: "Social",
        isActive: false
    },

    {
        url: "/dashboard/user/update-activity-links/:userId",
        content: "Links",
        isActive: false
    },

    {
        url: "/dashboard/user/styles/:userId",
        content: "Appearance",
        isActive: false
    },

    {
        url: "/dashboard/user/analytics/:userId",
        content: "Analytics",
        isActive: false
    },

    {
        url: "/dashboard/user/settings/:userId",
        content: "Settings",
        isActive: false
    },

    {
        url: "/dashboard/user/support/:userId",
        content: "Support",
        isActive: false
    }
]

const MobileNavbar = () => {

    const [activeArray, setActiveArray] = useState(navLinks.map(elem => elem.isActive));

    const handleClick = (e) => {

        setActiveArray(activeArray => {
            activeArray = activeArray.map(elem => false);
            activeArray[e.target.id] = true;

            return activeArray;
        });
        console.log(activeArray);
    }

    return (
        <div id="mobile-navbar">
            
            {navLinks.map((link,index) => {
                return (
                    <MobileNavLink id={index} handleClick={handleClick} key={index} content={link.content} url={link.url} isActive={activeArray[index]}/>
                )
            })}
           
        </div>
    );
}

export default MobileNavbar;
