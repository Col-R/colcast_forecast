class Forecast{
    constructor(){
        this.key = 'cfE5nvD8BA3AJLN5EB4DcS6x3V50XAbb';
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    }
    async updateCity(city){
        const cityDets = await this.getCity(city);
        const weather = await this.getWeather(cityDets.Key);
        return {
            //object shorthand notation
            cityDets,
            weather
        };
    }
    async getCity(city){
        // const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
        const query = `?apikey=${this.key}&q=${city}`;
        const response = await fetch(this.cityURI + query);
        const data = await response.json();
        return data [0];
    }
    async getWeather(id){
        //const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
        const query = `${id}?apikey=${this.key}`;
        const response = await fetch(this.weatherURI + query);
        const data = await response.json();
        return data [0];
    
    };
};
// Below code replaced by class constructors in 3/31/21 update
