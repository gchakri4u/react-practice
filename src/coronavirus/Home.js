import React, { useEffect, useState } from "react";
import Api from "./api/Api";
// Empty dependency array
//As I said, the dependency array controls when the hook triggers. 
//So what happens when the dependency array is empty?
//It simply means that the hook will only trigger once when the component is first rendered. 
//So for example, for useEffect it means the callback will run once at the beginning of the lifecycle of the component and never again.
function Home() {
    const [summary, setSummary] = useState({
        confirmed: {
            detail: "",
            value: 0
        }
    });
    useEffect(() => {
        const getSummaryFromApi = async () => {
            let data = await Api.getGlobalSummary();
            setSummary(data);
        }
        getSummaryFromApi();
    },/*Empty Depenency Array*/[]);
    return (
        <div>
            I am in Coronovirus Home Page
            {summary.confirmed.detail}
        </div>
    );
}
export default Home;