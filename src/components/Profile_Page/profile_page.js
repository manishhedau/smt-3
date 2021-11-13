import './styles/profile_page.css';
import ActivityTile from './profile_page_activity_tile';
import { useEffect, useState, useRef } from 'react';
import { callIPInfo, getUserDetails, sendActivityLinkClickInfo, sendSocialLinkClickInfo, sendJoinClickInfo, sendViewInfo, sendJoinClubUserInfo } from "../../services/apiEndpoint";
import { useParams } from 'react-router-dom';

import SecondProfilePage from "./Second_Profile_Page";

import UAParser from "ua-parser-js";

import { useCallback } from "react";

const ProfilePage = () => {

    // const [ipInfo, setIpInfo] = useState({});
    // const [uaParserInfo, setUaParserInfo] = useState({});
    const [clickInfo, setClickInfo] = useState({});
    const [isFirst, setIsFirst] = useState(() => JSON.parse(localStorage.getItem('isFirst')) || false);
    const [isJoinClub, setIsJoinClub] = useState(() => JSON.parse(localStorage.getItem('isJoinClub')) || false)

    const params = useParams();
    const userId = params.userId;

    const [userInfo, setUserInfo] = useState({
        social_link_list: [],
        activity_links_list: []
    });
    const [isVisible, setIsVisible] = useState(false);
    const fullnameRef = useRef();
    const emailRef = useRef();

    const store = {

        profile_image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",

        styles: {
            background: "",
            font: "Arial"
        },

        views: 100,
        posts: 50,
        likes: 170,

        username: "Purohit",
        activity_links: ["foo", "bar", "meek", "root", "rwer", "rwer", "rwer", "rwer", "rwer", "rwer", "rwer", "rwer", "rwer", "rwer", "rwer", "rwer", "rwer", "rwer", "rwer", "rwer", "rwer", "rwer", "rwer", "rwer", "rwer", "rwer"],
        social_media_links: ["foo", "baar", "meek", "loo", "loo"],
        designation: "Developer",
    }


    // handling social link click 
    const onSocialLinkClickHandler = (socialLink) => {
        sendSocialLinkClickInfo(socialLink, clickInfo, userId);
    }

    // handling activity link click 
    const onActivityLinkClickHandler = (activityLink) => {
        sendActivityLinkClickInfo(activityLink, clickInfo, userId)
    }

    // handling join my club button click
    const handleJoinMyClubClick = () => {
        sendJoinClickInfo(clickInfo, userId);
        setIsVisible(true);

    }

    const getIpInfoAndUAParserInfo = useCallback(async () => {
        // intigrate services of ip info
        const ipInfo = await callIPInfo();
        // setIpInfo(ipInfo);
        setClickInfo({
            ...ipInfo,
            city: ipInfo?.city,
            country: ipInfo?.country,
            ip_address: ipInfo?.ip,
            date: new Date(),
        })

        // find the data given by ua-parser
        let userAgent = navigator.userAgent;
        const parser = new UAParser();
        parser.setUA(userAgent);
        const result = parser.getResult();
        const deviceType = (result.device && result.device.type) || "desktop";
        result.deviceType = deviceType;
        // setUaParserInfo(result);

        // send view information


        setClickInfo((clickInfo) => ({ ...clickInfo, ...result, date: new Date() }));
        if (!isFirst) {
            sendViewInfo(ipInfo, result, userId);
            localStorage.setItem("isFirst", "true");
            setIsFirst(true);
        }
    }, [isFirst, userId])

    const fetchUserProfileData = useCallback(async () => {
        const res = await getUserDetails(userId);
        const data = await res.data;
        setUserInfo(data);
    }, [userId]);

    const handleSendJoinMyClubInfo = () => {
        const name = fullnameRef.current.value;
        const email = emailRef.current.value;
        setIsVisible(false);
        sendJoinClubUserInfo({
            name: name,
            email: email,
            date: new Date(),
        }, userId)

        setIsJoinClub(true);

        localStorage.setItem("isJoinClub", "true");
    }

    useEffect(() => {
        getIpInfoAndUAParserInfo();
        fetchUserProfileData();
    }, [getIpInfoAndUAParserInfo, fetchUserProfileData])

    const { social_link_list, fullname, description, designation, activity_links_list, view } = userInfo;
    const restActivityLink = [...activity_links_list];
    return (
        <>

            <div className="profile-container">
                <div className="profile-page">
                    <h1 className="company-logo">Skyhype</h1>

                    <div className="profile-info">
                        <div className="profile-pic">
                            <img src={store.profile_image} alt="Profile pic" />
                        </div>
                        <h3 style={{ textTransform: "capitalize" }}>{fullname}</h3>
                        <h4 style={{ textTransform: "capitalize", fontSize: "20px" }}>{designation}</h4>

                        <div className="profile-stats">
                            <p>Views: {view}</p>
                            <p>Posts: {activity_links_list.length}</p>
                            <p>Likes: 23</p>
                        </div>

                        <div className="social-media-links">
                            {social_link_list.map((link, index) => (
                                link.isActive && <a key={index} href={link.link} onClick={() => onSocialLinkClickHandler(link)}><i className={`fab fa-${link.social_media}`}></i></a>
                            ))}
                        </div>
                    </div>


                    {restActivityLink[0] && (
                        <div className="slideshow" onClick={() => onActivityLinkClickHandler(restActivityLink[0])}>
                            <img src="https://miro.medium.com/max/4800/1*scwcpro6eU-pORVH_Fpc_g.png" alt="snapshot pic" />
                            {/* <p>{restActivityLink[0].title}</p> */}
                        </div>
                    )}

                    <div className="activity-links">
                        {restActivityLink.map((link, index) => (
                            index ? <ActivityTile key={index} thumbnail="https://miro.medium.com/max/4800/1*scwcpro6eU-pORVH_Fpc_g.png" title={link.title} onClick={() => onActivityLinkClickHandler(link)} /> : ""
                        ))}
                    </div>

                    {/* <div className="combine"> */}
                    {isVisible &&
                        (<form className="model" onSubmit={handleSendJoinMyClubInfo}>
                            <div className="model-input-row">
                                <input type="text" placeholder="Full Name" ref={fullnameRef} required />
                                <input type="email" placeholder="Email" ref={emailRef} required />
                            </div>
                            <button className="model-button btn btn-primary" type="submit">Join Club</button>
                        </form>)
                    }

                    {!isJoinClub && <button className="btn btn-dark join-club-button" onClick={handleJoinMyClubClick}> Join my club</button>}
                    {/* </div> */}

                </div>
            </div >
            <SecondProfilePage name={fullname} designation={designation} description={description} />
        </>
    );
}

export default ProfilePage;


