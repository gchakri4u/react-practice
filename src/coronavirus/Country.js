import { useParams, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Api from "./api/Api";
import "./Country.scss";
function Country() {
    let params = useParams();
    let location = useLocation();
    const [countrySummary, setCountrySummary] = useState({
        confirmed: 0,
        recovered: 0,
        deaths: 0
    });
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        const getCountrySummaryFromApi = async () => {
            console.log(params.id);
            let summary = await Api.getCountrySummary(params.id)
            if (summary == null) return;
            if ('error' in summary) {
                setIsError(true);
            } else if ('confirmed' in summary) {
                let { confirmed, recovered, deaths } = summary;
                setCountrySummary({
                    confirmed: confirmed.value,
                    recovered: recovered.value,
                    deaths: deaths.value
                });
                setIsError(false);
            } else { return; }
        }
        getCountrySummaryFromApi();
    }, [params.id]);
    const renderError = () => {
        return <div>
            {`Requested ${params.id} country info doesnt exist. Please check the entered country`}
        </div>
    }
    const renderCountryInfo = () => {
        return <div className="summary">
            <div className="confirmed">
                <label>Confirmed</label>
                <label>{countrySummary.confirmed}</label>
            </div>
            <div className="recovered">
                <label>Recovered</label>
                <label>{countrySummary.recovered}</label>
            </div>
            <div className="deaths">
                <label>Deaths</label>
                <label>{countrySummary.deaths}</label>
            </div>
        </div>
    }
    return (
        <div id="country">
            <div className="country-info">
                {isError ? renderError() : renderCountryInfo()}
            </div>
            <div className="react-router-details">
                <div>{`params.id = ${params.id}`}</div>
                <div>{`Location.pathname = ${location.pathname}`}</div>
            </div>


        </div>
    );
}
export default Country;