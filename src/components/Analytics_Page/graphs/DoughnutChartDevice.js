import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import './styles/device_piechart.css';


// import socialMediaData from "../datasets/social_media.json";
// import profileData from "../datasets/profile.json";

const options = {
    //responsive: true,
    maintainAspectRatio: false,
    title: {
        display: true,
        text: "Custom chart",
        fontSize: 20,
        fontColor: "red",
    }
}

function DoughnutChartDevice({ socialLinksData = [], viewFilterData = [] }) {
    const data = {};

    for (let i = 0; i < socialLinksData?.length; i++) {
        const totalClick = socialLinksData[i].result.length
        for (let j = 0; j < totalClick; j++) {
            const deviceType = socialLinksData[i]?.result[j]?.deviceType;
            const click = data[deviceType]?.click ? data[deviceType]?.click : 0;
            data[deviceType] = { click: click + 1 };
        }
    }


    const totalViews = viewFilterData?.length;
    for (let i = 0; i < totalViews; i++) {
        const deviceType = viewFilterData[i].deviceType;
        const click = data[deviceType]?.click ? data[deviceType]?.click : 0;
        const view = data[deviceType]?.view ? data[deviceType]?.view : 0;
        data[deviceType] = { view: view + 1, click: click };
    }

    const result = []

    const deviceTypeKeys = Object.keys(data);
    let totalDeviceClickAndView = 0;
    for (let i = 0; i < deviceTypeKeys.length; i++) {
        const res = {
            deviceType: deviceTypeKeys[i],
            total: data[deviceTypeKeys[i]].click + data[deviceTypeKeys[i]].view
        }
        totalDeviceClickAndView += res.total
        result.push(res);
    }

    const deviceLabel = [];
    result.forEach((deviceObject) => {
        deviceLabel.push(deviceObject.deviceType);
    });

    const devicePercents = [];
    result.forEach((deviceObject) => {
        devicePercents.push((deviceObject.total / totalDeviceClickAndView) * 100);
    });

    const state = {
        labels: deviceLabel,
        datasets: [
            {
                label: 'Rainfall',
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                data: devicePercents,
            }
        ]
    }



    return (
        <div className="main-piechart">
            <div id="graph-container">
                <h1>Device Analytics</h1>
                <div className="doughtnut-container">
                    {devicePercents.length ? (<Doughnut
                        data={state}
                        options={options}
                        width={300}
                        height={300}
                    />) :
                        <p>There is no data present for selected date range.</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default DoughnutChartDevice
