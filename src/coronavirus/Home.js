import React, { useEffect, useState } from "react";
import Api from "./api/Api";
import "./Home.scss"

/*
Empty dependency array
----------------------
As I said, the dependency array controls when the hook triggers. 
So what happens when the dependency array is empty?
It simply means that the hook will only trigger once when the component is first rendered. 
So for example, for useEffect it means the callback will run once at the beginning of the lifecycle of the component and never again.
*/
function Home() {
    const [summary, setSummary] = useState({
        confirmed: 0,
        recovered: 0,
        deaths: 0
    });
    useEffect(() => {
        const getSummaryFromApi = async () => {
            let summary = await Api.getGlobalSummary();
            if (summary == null) return;
            let { confirmed, recovered, deaths } = summary;
            setSummary({
                confirmed: confirmed.value,
                recovered: recovered.value,
                deaths: deaths.value
            });
        }
        getSummaryFromApi();
    },/*Empty Dependency Array*/[]);
    return (
        <div id="home">
            <div id="summary">
                <div className="confirmed">
                    <label>Confirmed</label>
                    <label>{summary.confirmed}</label>
                </div>
                <div className="recovered">
                    <label>Recovered</label>
                    <label>{summary.recovered}</label>
                </div>
                <div className="deaths">
                    <label>Deaths</label>
                    <label>{summary.deaths}</label>
                </div>
            </div>
        </div>
    );
}
export default Home;