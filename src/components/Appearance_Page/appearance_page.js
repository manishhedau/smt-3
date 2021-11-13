import {useEffect, useState} from 'react'; 
import BackgroundTile from './background_tile';
import FontTile from './font_tile';
import { useSelector, useDispatch } from 'react-redux';
import { updateStyles } from '../../stores/appearanceReducer';
import './styles/appearance_page.css';
import axios from 'axios';
import ProfileLinkSection from '../Profile_Link_Section/profile_link_section';

const background_colors = [

    {
        background_color: "magenta",
        background: "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)"
    },

    {
        background_color: "crimson",
        background: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)"
    },

    {
        background_color: "cyan",
        background: "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)"
    },

    {
        background_color: "turquoise",
        background: "linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)"
    },

    {
        background_color: "teal",
        background: "linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)"
    },

    {
        background_color: "purple",
        background: "linear-gradient(45deg, #FBDA61 0%, #FF5ACD 100%)"
    },

    {
        background: "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)"
    },

    {
        background: "linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%)"
    },

    {
        background: "linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)"
    },

    {
        background: "linear-gradient(90deg, #FAD961 0%, #F76B1C 100%)"
    }
];

const fonts = ["'Andada Pro', serif", "'Ephesis', cursive", "'Noto Sans Display', sans-serif", "'Noto Sans Mono', monospace", "'Oswald', sans-serif", "'Playfair Display', serif", "'Raleway', sans-serif", "'Roboto', sans-serif"];

const AppearancePage = () => {

    const [background, setBackground] = useState(useSelector(state => state.entities.appearance.background));
    const dispatch = useDispatch();
    const [font, setFont] = useState(useSelector(state => state.entities.appearance.font));

    const getUserStyles = async () => {
        
        const userStyles = await axios.get('/dashboard/61815b950cda90d1d126f33b');
        dispatch(updateStyles(userStyles.data.styles));
        console.log(userStyles.data.styles);
    }

    useEffect(() => {
        getUserStyles();
        console.log(background, font);
    });

    const handleFont = async (e) => {

        // console.log(e.target.style["font-family"]);
        setFont(e.target.style["font-family"]);
        dispatch(updateStyles({background, font}));

        try
        {
            console.log("Data to be sent");
            const dataToSend = {styles: {background, font}}
            console.log(dataToSend);
            await axios.put('http://localhost:8080/dashboard/styles/61815b950cda90d1d126f33b', {styles: {background: background, font}})
            console.log("Post successful");
        }
        catch(err)
        {
            console.log(err);
        }
        
    }

    const handleBackground = async (e) => {
        

        // setBackground({
        //     color: e.target.style["background-color"] ? e.target.style["background-color"] : "",
        //     image: e.target.style["background-image"] ? e.target.style["background-image"] : "",
        //     gradient: e.target.style["background"] ? e.target.style["background"] : ""
        // });

        setBackground(e.target.style["background"]); 
        dispatch(updateStyles({background, font}));

        try
        {
            console.log("Data to be sent");
            const dataToSend = {styles: {background: background, font}}
            console.log(dataToSend);
            let result = await axios.put('http://localhost:8080/dashboard/styles/61815b950cda90d1d126f33b', {styles: {background, font}})
            console.log( result ? `Post successful\n${result.data}` : "Some error occurred");
        }
        catch(err)
        {
            console.log(err);
        }
    }

    const [backgroundDisplay, setBackgroundVisibility] = useState("flex");
    const [fontDisplay, setFontVisibility] = useState("none");

    const showFonts = () => {
        setBackgroundVisibility("none");
        setFontVisibility("flex");

        const bgSwitchDOM = document.querySelector("#bg-switch");
        bgSwitchDOM.style.borderBottom = "none";

        const fontSwitchDOM = document.querySelector("#font-switch");
        fontSwitchDOM.style.borderBottom = "5px solid  black";
    }

    const showBackgrounds = () => {
        setBackgroundVisibility("flex");
        setFontVisibility("none");

        const bgSwitchDOM = document.querySelector("#bg-switch");
        bgSwitchDOM.style.borderBottom = "5px solid black";

        const fontSwitchDOM = document.querySelector("#font-switch");
        fontSwitchDOM.style.borderBottom = "none";
    }

    return (

        <div className="appearance-page">

            <div className="responsive-profile-link"> 
                <ProfileLinkSection/>
            </div>

            <h1 style={{fontSize:"1.5rem"}}>Appearance</h1>

            <div className="choose-section">
                    <h5 id="bg-switch" onClick={showBackgrounds}>Backgrounds</h5>
                    <h5 id="font-switch" onClick={showFonts}>Fonts</h5>
            </div>

            <div className="background-section" style={{display: backgroundDisplay}}>

                <div className="backgrounds-container">
                    <BackgroundTile handleBackground={handleBackground} text="Choose Image" inputType="color"/>
                    <BackgroundTile handleBackground={handleBackground} text="Choose Color"/>

                    {background_colors.map(bg => {
                        return <BackgroundTile handleBackground={handleBackground} key={background_colors.indexOf(bg)} bg_color={bg.background_color} bg_image={bg.background}/>
                    })}
                </div>

            </div>

            <div className="font-section" style={{display: fontDisplay}}>
                
                <div className="fonts-container">
                    {fonts.map(font => {
                        return <FontTile handleFont={handleFont} key={fonts.indexOf(font)} font={font}/>
                    })}
                </div>

            </div>

        </div>
    );
}

export default AppearancePage;