import axios from "axios";
const baseUrl = "https://covid19.mathdro.id/api";
const Api = {
    async getGlobalSummary() {
        try {
            let { data } = await axios.get(baseUrl);
            return data;
        }
        catch (e) {
            console.log(e.message);
        }
        return null;
    },
    async getCountrySummary(iso3) {
        if(iso3 == null) return null;
        let url = `${baseUrl}/countries/${iso3.toUpperCase()}`;
        let result = null;
        try {
            let { data } = await axios.get(url);
            result = data;
        }
        catch (e) {
            result = e.response.data;
        }
        finally{
            console.log(result);
        }
        return result;
    },
    async getCountries() {
        let url = `${baseUrl}/countries`;
        try {
            let { data } = await axios.get(url);
            return data.countries;
        } catch (e) {
            console.log(e.message);
        }
        return null;
    }
}

export default Api;
