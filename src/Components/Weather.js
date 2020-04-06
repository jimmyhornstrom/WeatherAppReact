import React, {Component} from 'react';
import Axios from 'axios';
import DisplayWeather from './DisplayWeather';
import SearchForm from './SearchForm';
import DayCard from './DayCard';

const API_KEY = "6fd98dce155aaa1c1ff2846f048fc876";


export default class Weather extends Component{

    state = {
        data: {},
        dailyData: [],
        forecast1: {},
        forecast2: {},
        forecast3: {},
        forecast4: {},
        forecast5: {},
        inputData: "",
    }
    
    calculateLocalTime(timezone){
        let today = new Date();

        today.setHours(today.getHours(),today.getMinutes() - 60 + parseInt(timezone/60));

        let todayString = today.toString();
        todayString = todayString.replace("GMT+0100 (centraleuropeisk normaltid)", "")

        return todayString;
    
    }

    componentDidMount() {  

        Axios.get(`http://api.openweathermap.org/data/2.5/weather?q=Stockholm&appid=${API_KEY}&units=metric`)
        .then(res => {

            console.log(res)
            let weatherData = {
                location: res.data.name,
                temperature: res.data.main.temp,
                time: this.calculateLocalTime(res.data.timezone),
                description: res.data.weather[0].description,
                img: `http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`
            }

            this.setState({data:weatherData});
            console.log(this.state.data)
        })

        const url = `http://api.openweathermap.org/data/2.5/forecast?q=Stockholm&appid=${API_KEY}&units=metric`

        fetch(url)
        .then(res => res.json())
        .then(data => {
            //console.log(data)
            const dailyData = data.list.filter(reading => reading.dt_txt.includes("06:00:00"));
            const dailyDataTwo = data.list.filter(reading => reading.dt_txt.includes("15:00:00"));

            console.log(dailyData)
            console.log(dailyDataTwo)
            let dataForecast1 = {
                date: dailyData[0].dt_txt.replace("06:00:00", ""),
                minTemp: dailyData[0].main.temp,
                maxTemp: dailyDataTwo[0].main.temp,
                img: `http://openweathermap.org/img/wn/${dailyDataTwo[0].weather[0].icon}@2x.png`
            }

            let dataForecast2 = {
                date: dailyData[1].dt_txt.replace("06:00:00", ""),
                minTemp: dailyData[1].main.temp,
                maxTemp: dailyDataTwo[1].main.temp,
                img: `http://openweathermap.org/img/wn/${dailyDataTwo[1].weather[0].icon}@2x.png`
            }

            let dataForecast3 = {
                date: dailyData[2].dt_txt.replace("06:00:00", ""),
                minTemp: dailyData[2].main.temp,
                maxTemp: dailyDataTwo[2].main.temp,
                img: `http://openweathermap.org/img/wn/${dailyDataTwo[2].weather[0].icon}@2x.png`
            }

            let dataForecast4 = {
                date: dailyData[3].dt_txt.replace("06:00:00", ""),
                minTemp: dailyData[3].main.temp,
                maxTemp: dailyDataTwo[3].main.temp,
                img: `http://openweathermap.org/img/wn/${dailyDataTwo[3].weather[0].icon}@2x.png`
            }

            let dataForecast5 = {
                date: dailyData[4].dt_txt.replace("06:00:00", ""),
                minTemp: dailyData[4].main.temp,
                maxTemp: dailyDataTwo[4].main.temp,
                img: `http://openweathermap.org/img/wn/${dailyDataTwo[4].weather[0].icon}@2x.png`
            }

            
            this.setState({forecast1: dataForecast1})
            this.setState({forecast2: dataForecast2})
            this.setState({forecast3: dataForecast3})
            this.setState({forecast4: dataForecast4})
            this.setState({forecast5: dataForecast5})
        } ) 
    }

    saveInput = (value) => {
        this.setState({inputData:value})
    }

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    getFiveDates(){
        var array = [];

        var today = new Date();

            var forecast1Date = new Date();
            forecast1Date.setDate(today.getDate()+ 1);
            var testDate1 = this.formatDate(forecast1Date);

            var forecast2Date = new Date();
            forecast2Date.setDate(today.getDate()+ 2);
            var testDate2 = this.formatDate(forecast2Date);

            var forecast3Date = new Date();
            forecast3Date.setDate(today.getDate()+ 3)
            var testDate3 = this.formatDate(forecast3Date);

            var forecast4Date = new Date();
            forecast4Date.setDate(today.getDate()+ 4)
            var testDate4 = this.formatDate(forecast4Date);

            array.push(testDate1)
            array.push(testDate2)
            array.push(testDate3)
            array.push(testDate4)

        return array;
    }

    calculateMax(data){
        var max = 0
            for(let result of data){
                if(max < result.main.temp)
                max = result.main.temp
            }

            return max;
    }

    calculateMin(data){
        var min = data[0].main.temp;
            for(let result of data){
                if(min > result.main.temp)
                min = result.main.temp
            }

            return min;
    }

    searchLocation = (event) => {
        event.preventDefault();

        Axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.inputData}&appid=${API_KEY}&units=metric`)
        .then(res => {
            let weatherData = {
                location: res.data.name,
                temperature: res.data.main.temp,
                time: this.calculateLocalTime(res.data.timezone),
                description: res.data.weather[0].description,
                img: `http://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`
            }

            this.setState({data:weatherData});
        })

        const url = `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.inputData}&appid=${API_KEY}&units=metric`

        fetch(url)
        .then(res => res.json())
        .then(data => {

            console.log(data);
           
            var dates = this.getFiveDates();
            console.log(dates);

            const forecast1Data = data.list.filter(reading => reading.dt_txt.includes(dates[0]));
            const forecast2Data = data.list.filter(reading => reading.dt_txt.includes(dates[1]));
            const forecast3Data = data.list.filter(reading => reading.dt_txt.includes(dates[2]));
            const forecast4Data = data.list.filter(reading => reading.dt_txt.includes(dates[3]));

            console.log(forecast1Data)
            console.log(forecast2Data)
            console.log(forecast3Data)
            console.log(forecast4Data)

            var maxDate1 = this.calculateMax(forecast1Data)
            var minDate1 = this.calculateMin(forecast1Data)

            var maxDate2 = this.calculateMax(forecast2Data)
            var minDate2 = this.calculateMin(forecast2Data)

            var maxDate3 = this.calculateMax(forecast3Data)
            var minDate3 = this.calculateMin(forecast3Data)

            var maxDate4 = this.calculateMax(forecast4Data)
            var minDate4 = this.calculateMin(forecast4Data)

           

            let dataForecast1 = {
                date: forecast1Data[0].dt_txt.replace("00:00:00", ""),
                minTemp: minDate1,
                maxTemp: maxDate1,
                img: `http://openweathermap.org/img/wn/${forecast1Data[6].weather[0].icon}@2x.png`
            }

            let dataForecast2 = {
                date: forecast2Data[0].dt_txt.replace("00:00:00", ""),
                minTemp: minDate2,
                maxTemp: maxDate2,
                img: `http://openweathermap.org/img/wn/${forecast2Data[6].weather[0].icon}@2x.png`
            }

            let dataForecast3 = {
                date: forecast3Data[0].dt_txt.replace("00:00:00", ""),
                minTemp: minDate3,
                maxTemp: maxDate3,
                img: `http://openweathermap.org/img/wn/${forecast3Data[6].weather[0].icon}@2x.png`
            }

            let dataForecast4 = {
                date: forecast4Data[0].dt_txt.replace("00:00:00", ""),
                minTemp: minDate4,
                maxTemp: maxDate4,
                img: `http://openweathermap.org/img/wn/${forecast4Data[6].weather[0].icon}@2x.png`
            }

            this.setState({forecast1: dataForecast1})
            this.setState({forecast2: dataForecast2})
            this.setState({forecast3: dataForecast3})
            this.setState({forecast4: dataForecast4})
        } ) 
    }

    render()
    {
        return(<>
        <div className="upperContainer">
            <SearchForm search={this.searchLocation} input = {this.saveInput} />        
            <DisplayWeather weatherData = {this.state.data} />            
        </div>
        <div className="forecastContainer">
            <div className="forecast">
            <DayCard weatherData = {this.state.forecast1} />
            </div>
            <div className="forecast">
            <DayCard weatherData = {this.state.forecast2} />
            </div>
            <div className="forecast">
            <DayCard weatherData = {this.state.forecast3} />
            </div>
            <div className="forecast">
            <DayCard weatherData = {this.state.forecast4} />
            </div>
        </div>
        
        </>)
    }

}