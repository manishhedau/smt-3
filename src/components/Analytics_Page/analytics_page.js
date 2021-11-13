import DoughnutChartDevice from './graphs/DoughnutChartDevice';
import LineChartSocial from './graphs/LineChartSocial';
import BarChart from './graphs/activity_barchart_modified';
import ActivityLinkLinechart from './graphs/activity_links_linechart';
import ActivityLinkList from './activity_link_list';

import './styles/analytics_page.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { addDays } from 'date-fns';
import { Slider } from '@mui/material';
import { DateRangePicker } from 'react-date-range';
import { useState } from 'react';

import calcLifetimeStats from './logic_functions/calculate_lifetime_stats';
import filterSocialLinksData, { giveLabel } from './logic_functions/fiter_social_links';
import filterViewDetailsData from "./logic_functions/filter_view_details";
import filterJoinMyClubClickDetails from "./logic_functions/filter_joinmyclub_click_details";
import filteredDateData from "./logic_functions/filtered_date_data";
import CountryList from './CountryList';
import JoinMyClubBarChart from './graphs/JoinMyClubBarChart';

import { useSelector } from "react-redux";
import CityGraph from './graphs/CityGraph';
import filteredViewDate from './logic_functions/filtered_view_date_wise';
import getGlobalActivityStats from "./logic_functions/global_activity_stats";


const AnalyticsPage = () => {
    const socialLinks = useSelector(state => state.entities.socialLinks);
    const activityLinks = useSelector(state => state.entities.activityLinks);
    const editProfile = useSelector(state => state.entities.editProfile.editprofile);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    window.addEventListener("resize", function () {
        console.log(screenWidth);
        setScreenWidth(window.innerWidth);
    });

    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 0),
            key: 'selection'
        }
    ]);

    const calcTotalClicks = (arr) => {
        let total = 0;

        arr.forEach(elem => total++);

        return total;
    }

    const lifetimeStats = calcLifetimeStats(socialLinks, editProfile.profile_link);
    const socialLinksData = filterSocialLinksData(state, socialLinks);
    const label = giveLabel(state);
    const viewDetails = editProfile?.profile_link?.view_details;

    console.log(viewDetails);
    console.log(socialLinksData);

    const viewFilterData = filterViewDetailsData(state, viewDetails);
    const joinMyClubClickDetails = editProfile?.join_club?.click_details;
    const [
        joinMyyClubClickDetailsFilterData,
        dateWiseFilterJoinMyClubData
    ] = filterJoinMyClubClickDetails(state, joinMyClubClickDetails);
    const activityFilterData = filteredDateData(state, activityLinks);
    const viewDateWiseFilterData = filteredViewDate(state, viewFilterData);
    const globalActivityStats = getGlobalActivityStats(viewFilterData, socialLinksData, activityFilterData, joinMyyClubClickDetailsFilterData);
    // console.log("Join my club click details filter data : ", joinMyyClubClickDetailsFilterData);

    console.log("social Link Data : ", socialLinksData)
    console.log("activity Filter Data : ", activityFilterData)
    // const [dayRange, setDayRange] = useState([
    //     {    
    //         primary: {
    //             startDate: new Date(),
    //             endDate: addDays(new Date(),1),
    //             key: 'selection',
    //         }
    //     }
    // ]);



    // console.log("Date picker : ", state);
    return (
        <div id="analytics-page">

            <section id="numerical-stats-section">

                <h1>Lifetime Analytics</h1>

                <div className="stats-container">

                    <div className="individual-numerical-stats">
                        <p><span style={{ fontSize: "3.2rem", color: "lightblue" }}>.</span>Views:</p>
                        <h3>{calcTotalClicks(viewDateWiseFilterData)}</h3>
                    </div>

                    <div className="individual-numerical-stats">
                        <p><span style={{ fontSize: "3rem", color: "orange" }}>.</span>Clicks:</p>
                        <h3>{lifetimeStats.clicks}</h3>
                    </div>

                    <div className="individual-numerical-stats">
                        <p><span style={{ fontSize: "3rem", color: "purple" }}>.</span>Average CTR:</p>
                        <h3>{`${lifetimeStats.averageCtr}%`}</h3>
                    </div>

                </div>

            </section>

            <div id="date-range-selection-section" style={{ width: "100%" }}>

                <div id="duration-selector">
                    <h5>1</h5>
                    <Slider size="small" defaultValue={3} min={1} max={7} marks />
                    <h5>7</h5>
                </div>

                <DateRangePicker
                    onChange={item => setState([item.selection])}
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    minDate={addDays(new Date(), -30)}
                    maxDate={new Date()}
                    months={2}
                    ranges={state}
                    direction={screenWidth > 1080 ? "horizontal" : "vertical"}
                />
            </div>

            <section id="activity-stats-section">
                <div id="graph-container">
                    <h1>Activity</h1>

                    <div className="stats-container">

                        <div className="individual-numerical-stats">
                            <p><span style={{ fontSize: "3.2rem", color: "lightblue" }}>.</span>Views:</p>
                            <h3>{globalActivityStats.view}</h3>
                        </div>

                        <div className="individual-numerical-stats">
                            <p><span style={{ fontSize: "3rem", color: "orange" }}>.</span>Clicks:</p>
                            <h3>{globalActivityStats.click}</h3>
                        </div>

                        <div className="individual-numerical-stats">
                            <p><span style={{ fontSize: "3rem", color: "purple" }}>.</span>Average CTR:</p>
                            <h3>{`${globalActivityStats.ctr}%`}</h3>
                        </div>

                    </div>
                    <BarChart dates={state} viewDateWiseFilterData={viewDateWiseFilterData} label={label} />
                </div>

            </section>

            {/* <section id="activity-stats-section"> */}
            <LineChartSocial socialLinksData={socialLinksData} label={label} />
            {/* </section> */}
            {/* <section id="activity-stats-section"> */}
            <DoughnutChartDevice socialLinksData={socialLinksData} viewFilterData={viewFilterData} />
            {/* </section> */}

            <CountryList socialLinksData={socialLinksData} viewFilterData={viewFilterData} label={label} />
            <CityGraph socialLinksData={socialLinksData} viewFilterData={viewFilterData} label={label} />
            <JoinMyClubBarChart label={label} dateWiseFilterJoinMyClubData={dateWiseFilterJoinMyClubData} />

            <div id="activity-link-stats-section">
                <h1>Activity Links Statistics</h1>
                <ActivityLinkLinechart dates={state} label={label} restrictionDates={state} />
                <h6 style={{ width: "70%", textAlign: "center" }}>Selected Links</h6>
                <ActivityLinkList />
            </div>
        </div>
    );
}

export default AnalyticsPage;

