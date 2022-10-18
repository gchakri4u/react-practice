import { useParams, useLocation } from "react-router-dom";
import React from "react";
function Country() {
    let params = useParams();
    let location = useLocation();
    return (
        <div>
            <div> You are looking at Coronovirus country {params.id}</div>
            <div>Location is {location.pathname}</div>
        </div>
    );
}
export default Country;