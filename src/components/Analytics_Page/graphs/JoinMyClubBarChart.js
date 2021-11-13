import React from 'react'
import { Bar } from 'react-chartjs-2';

import "./styles/join_my_club_graph.css";

function JoinMyClubBarChart({ label, dateWiseFilterJoinMyClubData }) {
    const state = {
        labels: label,
        datasets: [{
            label: "Join",
            data: dateWiseFilterJoinMyClubData,
            backgroundColor: "skyblue"
        }]
    };

    return (
        <div className="main-join-my-club">
            <div id="graph-container" className="join-club">
                <div className="join-my-club-graph">
                    <h1>Join My Club Graph</h1>
                    <Bar data={state} />
                </div>
            </div>
        </div>
    )
}

export default JoinMyClubBarChart
