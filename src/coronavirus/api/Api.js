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
    }
}

export default Api;
