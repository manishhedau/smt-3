import React from 'react'
import { Bar } from 'react-chartjs-2';
import "./styles/country-list.css";



function CountryList({ socialLinksData, viewFilterData, label = [] }) {

    // const [selectedCountry, setSelectedCountry] = useState(undefined);

    const data = {};

    for (let i = 0; i < socialLinksData.length; i++) {
        for (let j = 0; j < socialLinksData[i].result.length; j++) {
            const country = socialLinksData[i].result[j].country;
            const click = data[country]?.click ? data[country]?.click : 0;
            data[country] = { click: click + 1 };
        }
    }

    for (let i = 0; i < viewFilterData.length; i++) {
        const country = viewFilterData[i].country;
        const click = data[country]?.click ? data[country]?.click : 0;
        const view = data[country]?.view ? data[country]?.view : 0;
        data[country] = { view: view + 1, click: click };
    }

    // console.log("Country List data  : ", data);
    // console.log("Country list keys : ", Object.keys(data));



    const result = []

    const countryKeys = Object.keys(data);
    for (let i = 0; i < countryKeys.length; i++) {
        const res = {
            country: countryKeys[i],
            clicks: data[countryKeys[i]].click,
            views: data[countryKeys[i]].view
        }

        result.push(res);
    }

    // console.log("Result : ", result);

    // if (selectedCountry === undefined) {
    //     setSelectedCountry(result[0]);
    // }

    const state = {
        labels: result.map(country => country.country),
        datasets: [{
            label: "Views",
            data: result.map(country => country.views),
            backgroundColor: "blue"
        },

        {
            label: "Clicks",
            data: result.map(country => country.clicks),
            backgroundColor: "pink"
        }
        ],
    };

    // const handleCountryChange = (country) => {
    //     console.log("Country : ", country);
    //     setSelectedCountry(country);
    // }



    // console.log("country list label : ", label);
    // ${countryObject.country === selectedCountry?.country ? 'selected-country' : ''}


    return (
        <div className="country-list">
            <div id="graph-container" className="country-list-view">
                <h1>Country List</h1>
                {result.length ? (
                    <div className="country-list-show">
                        {
                            result.map((countryObject, index) => (
                                <div key={index}
                                    className={`country-list-country`}
                                // onClick={() => handleCountryChange(countryObject)}
                                >
                                    <h4 className="country-list-title">{index + 1}. {countryObject.country}</h4>
                                    <div className="country-list-states">
                                        <p>{countryObject.clicks} clicks</p>
                                        <p>{countryObject.views} views</p>
                                        <p>{Math.round((countryObject.views / countryObject.clicks) * 100)}% CTR</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ) :
                    <p>There is no data present for selected date range.</p>
                }
            </div>
            <div id="graph-container" className="country-list-graph">
                <h1>Country List Graph</h1>
                {/* <div className="country-graph-label">
                    {
                        label.map((day) => (
                            <p>{day}</p>
                        ))
                    }
                </div> */}
                <Bar data={state} />
            </div>
        </div>
    )
}

export default CountryList
