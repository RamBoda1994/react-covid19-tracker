import axios from 'axios';

const URL = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
    let changeableURL = URL;
    
    if(country){
        changeableURL = `${URL}/countries/${country}`;
    }

    try{
        let response = await axios.get(changeableURL);
        let {confirmed,deaths,recovered,lastUpdate} = response.data;
        return {confirmed,deaths,recovered,lastUpdate};
    }
    catch(error){
        console.log(error);
    }
}

export const fetchDailyData = async ()  => {
    try{
        const {data} = await axios.get(`${URL}/daily`); 
        const modifiedData = data.map(dailyData => ({
            confirmed : dailyData.confirmed.total,
            deaths : dailyData.deaths.total,
            reportDate : dailyData.reportDate
        }))
        return modifiedData;
    }
    catch(error){
        console.log(error);
    }
}

export const fetchCountries = async () => {
    try{
        const {data} = await axios.get(`${URL}/countries`);
        const {countries} = data;
        const getCountryNames = countries.map(country => country.name);
        return getCountryNames;
    }
    catch(error){
        console.log(error);
    }
}