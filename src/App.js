import React from 'react';
import Cards from './components/Cards/Cards';
import CountryPicker from './components/CountryPicker/CountryPicker';
import Chart from './components/Chart/Chart';
import styles from './App.module.css';
import {fetchData} from './api';
import coronaImage from './images/image.png'

class App extends React.Component{

    state = {
        data : {},
        country : ''
    }

    async componentDidMount(){
        const dataFetched = await fetchData();
        this.setState({data : dataFetched});
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        this.setState({
            data : fetchedData,
            country : country
        });      
    }

    render(){
        let {data,country} = this.state;
        return(
            <div className={styles.container}>
                <img className={styles.coronaimg} src={coronaImage} />
                <Cards data={data}/>
                <CountryPicker handleCountryChange = {this.handleCountryChange}/>
                <Chart data={data} country={country}/>
            </div>
        )
    }
}

export default App;