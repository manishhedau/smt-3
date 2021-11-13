import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import './styles/activity_links_linechart.css';
import colors from '../datasets/colors.json';

import { useRef, useEffect } from 'react';

const ActivityLinkLinechart = (props) => {

    const weeklyData = useRef([0, 0, 0, 0, 0, 0, 0]);
    const { dates, label } = props;
    console.log(dates[0].endDate, dates[0].startDate);

    // const newData = dataset.activities.map(elem => {

    //     return {
    //         date: elem.date,
    //         title: elem.activity.title,
    //         views: elem.views,
    //         view_details: elem.activity.view_details
    //     }
    // }).sort((e1,e2) => e1.views - e2.views).reverse();

    const newData = useSelector(state => {

        const tempArray = state.entities.activityLinks.map(link => {

            return {
                click_details: link.click_details,
                title: link.title,
                date: link.schedule,
            }
        })

        return tempArray;
    });

    console.log(newData);

    let getWeeklyData = (refData) => {
        let tempData = [0, 0, 0, 0, 0, 0, 0];

        refData.forEach(elem => {
            tempData[new Date(elem.date).getDay()]++
        });

        return tempData;
    }

    // const lineData = newData.map((elem, ind) => {

    //     return {
    //         label: elem.title,
    //         data: getWeeklyData(elem.click_details),
    //         // total_views: elem.view_details.length
    //         borderColor: colors[newData.length - ind - 1].hexString,
    //         tension: 0.25
    //     }
    // });

    // console.log(document.getElementsByClassName("rdrDateInput")[0].firstChild.value);

    // console.log(document.getElementsByClassName("rdrDateInput")[0].firstChild.value);
    // console.log(document.getElementsByClassName("rdrDateInput")[1].firstChild.value);

    // console.log(startDate, endDate);

    const filteredDateData = (startDate, endDate) => {

        return newData.map(elem => {

            const temp = elem.click_details.filter(link => {
                const date = new Date(link.date).getTime();
                const startDatems = startDate.getTime();
                const endDatems = endDate.getTime();
                // console.log(link.date, startDate, endDate);

                return (date >= startDatems) && (date <= endDatems);
            })

            return temp;
        })
    }

    const filteredData = filteredDateData(dates[0].startDate, dates[0].endDate);
    console.log(filteredData);

    const lineData = filteredData.map((elem, ind) => {

        return {
            label: newData[ind].title,
            // label: label,
            data: getWeeklyData(elem),
            // total_views: elem.view_details.length
            borderColor: colors[newData.length - ind - 1].hexString,
            tension: 0.25
        }
    });

    // const filteredData = filteredDateData("2010-05-01", "2021-12-01");
    // console.log(restrictionDates.startDate, restrictionDates.endDate)

    let tempData = [0, 0, 0, 0, 0, 0, 0];

    filteredData.forEach(elem => {

        elem.forEach(link => {
            tempData[new Date(link.date).getDay()]++
        })

    });

    weeklyData.current = [...tempData];

    useEffect(() => {
        console.log("useEffect Running");

        console.log("current data");
        console.log(weeklyData)
    })

    return (

        <div id="activity-link-linechart">

            <div id="activity-linechart-svg">

                <Line
                    data={{
                        labels: label,
                        datasets: lineData
                    }}

                    options={{
                        maintainAspectRatio: false
                    }}
                />
            </div>
        </div>
    );
}

export default ActivityLinkLinechart;