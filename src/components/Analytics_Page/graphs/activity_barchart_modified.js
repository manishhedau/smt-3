import { Bar } from 'react-chartjs-2';
import './styles/activity-barchart.css';
import { useSelector } from 'react-redux';

const BarChart = ({ viewDateWiseFilterData, label, ...props }) => {

    const { dates } = props;
    const newData1 = useSelector(state => state.entities);
    // console.log(newData1.activityLinks);
    const activityData = newData1.activityLinks;
    const socialData = newData1.socialLinks;

    const getWeeklyClickData = (link) => {
        const temp = [0, 0, 0, 0, 0, 0, 0];

        let filteredData = link.click_details.filter(click => {
            const clickDate = new Date(click.date).getTime();
            const startDate = new Date(dates[0].startDate).getTime();
            const endDate = new Date(dates[0].endDate).getTime();
            return clickDate >= startDate && clickDate <= endDate;
        })

        console.log(filteredData);

        link.click_details.forEach(click => {
            temp[new Date(click.date).getDay()]++;
        })

        return temp;
    }

    const concatenateData = (arr1, arr2) => {
        const finalArray = [];

        if (arr1.length === arr2.length) {
            for (let i = 0; i < arr1.length; i++) {
                finalArray.push(arr1[i] + arr2[i]);
            }
        }

        return finalArray;
    }

    let totalActivityClicks = [0, 0, 0, 0, 0, 0, 0];
    let totalSocialClicks = [0, 0, 0, 0, 0, 0, 0];

    activityData.forEach(link => {

        // console.log(getWeeklyClickData(link));
        totalActivityClicks = concatenateData(totalActivityClicks, getWeeklyClickData(link));
    })

    // console.log(totalActivityClicks);

    socialData.forEach(link => {

        // console.log(getWeeklyClickData(link));
        totalSocialClicks = concatenateData(totalSocialClicks, getWeeklyClickData(link));
    })


    // console.log(totalSocialClicks);

    const totalClicks = concatenateData(totalActivityClicks, totalSocialClicks);
    console.log(totalClicks);

    return (
        <div className="main-barchart">

            <div className="graph-container">
                <Bar
                    data={{
                        labels: label,

                        datasets: [{
                            label: "Clicks",
                            data: totalClicks,//getWeeklyData(finalData),//finalData.map(elem => elem.views),
                            backgroundColor: "orange"
                        },
                        {
                            label: "View",
                            data: viewDateWiseFilterData,//getWeeklyData(finalData),//finalData.map(elem => elem.views),
                            backgroundColor: "blue"
                        },
                        ],

                        options: {
                            maintainAspectRatio: false
                        }
                    }}

                    height={400}
                    width={600}

                />

            </div>
        </div>
    );
}

export default BarChart;