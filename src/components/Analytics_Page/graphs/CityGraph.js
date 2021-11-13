import React from 'react'
import { Bar } from 'react-chartjs-2';

function CityGraph({ socialLinksData, viewFilterData }) {
    const data = {};

    for (let i = 0; i < socialLinksData.length; i++) {
        for (let j = 0; j < socialLinksData[i].result.length; j++) {
            const city = socialLinksData[i].result[j].city;
            const click = data[city]?.click ? data[city]?.click : 0;
            data[city] = { click: click + 1 };
        }
    }

    for (let i = 0; i < viewFilterData.length; i++) {
        const city = viewFilterData[i].city;
        const click = data[city]?.click ? data[city]?.click : 0;
        const view = data[city]?.view ? data[city]?.view : 0;
        data[city] = { view: view + 1, click: click };
    }

    const result = []
    const cityKeys = Object.keys(data);
    for (let i = 0; i < cityKeys.length; i++) {
        const res = {
            city: cityKeys[i],
            clicks: data[cityKeys[i]].click,
            views: data[cityKeys[i]].view
        }
        result.push(res);
    }

    const state = {
        labels: result.map(city => city.city),
        datasets: [{
            label: "Views",
            data: result.map(city => city.views),
            backgroundColor: "#85FFBD"
        },
        {
            label: "Clicks",
            data: result.map(city => city.clicks),
            backgroundColor: "#4158D0"
        }],
    };

    return (
        <div className="main-linechart">
            <div id="graph-container" className="country-list-graph">
                <h1>City Graph</h1>
                <Bar data={state} />
            </div>
        </div>
    )
}

export default CityGraph
