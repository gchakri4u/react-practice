import React, { useEffect, useState } from "react";
import { Link,useLocation } from "react-router-dom";
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
    const location = useLocation();
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

    const [countries, setCountries] = useState([]);
    useEffect(() => {
        const getCountriesFromApi = async () => {
            let countries = await Api.getCountries();
            if (countries == null) return;
            setCountries(countries);
        }
        getCountriesFromApi();
    }, []);
    const onCountryRowClick = (index, iso3) => {
        // let country = countries.find(country => country.iso3 === iso3);
        let country = countries[index];
        console.log("country:", country);
    }
    const renderTableHeader = () => {
        let header = Object.keys(countries[0]);
        // let header = ["iso3", "name"]
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        });
    }
    const renderTableBody = () => {
        console.log(location.pathname);
        return countries.map((country, index) => {
            const { name, iso2, iso3 } = country;
            return <tr key={index}>
                <td onClick={() => {
                    onCountryRowClick(index, iso3);
                }}><Link to={`/coronavirus/countries/${iso3}`}>{name}</Link></td>
                <td>{iso2}</td>
                <td>{iso3}</td>

            </tr>
        })
    }

    const renderCountries = () => {
        return (
            <div>
                <h1 id='title'>React Dynamic Table</h1>
                <table className='countries'>
                    <tbody>
                        {countries.length > 0 && <tr>{renderTableHeader()}</tr>}
                        {renderTableBody()}
                    </tbody>
                </table>
            </div>
        );
    }
    return (
        <div id="home">
            <div className="summary">
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
            <div className="countries">
                {renderCountries()}
            </div>
        </div>
    );
}
export default Home;