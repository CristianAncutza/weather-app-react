import React, {useState,useEffect} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import convertUnits from 'convert-units'
import Alert from '@material-ui/lab/Alert'
import Grid from '@material-ui/core/Grid'
import List  from '@material-ui/core/List' 
import ListItem from '@material-ui/core/ListItem'
import CityInfo from './../CityInfo'
import Weather from './../Weather'

const getCityCode = (city, countryCode) => `${city}-${countryCode}`

const renderCityAndCountry = eventOnClickCity => (cityAndCountry, weather) => {
    const { city, countryCode, country } = cityAndCountry
    //const{temperature, state} = weather

    return(
        <ListItem 
            button 
            key={getCityCode(city, countryCode)} 
            onClick={() => eventOnClickCity(city, countryCode)} >
            <Grid container
                justify="center"
                alignItems="center"
            >
                <Grid item 
                    md={9}
                    xs={12}
                    >
                    <CityInfo city={city} country={country}></CityInfo>
                </Grid>
            
                <Grid item 
                    md={3}
                    xs={12}>
                    <Weather 
                        temperature={weather && weather.temperature} 
                        state={weather && weather.state}> 
                    </Weather>                     
                </Grid>
            </Grid>
            
            
        </ListItem>
        )
}
//renderCityAnCountry se va a convertir en una funcion que retorna otra funcion
export const CityList = ({cities, onClickCity}) => {
    //que son los hooks?
    const [allWeather, setAllWeather] = useState({})    
    const[error,setError] = useState(null)

    useEffect(() => {
        const setWeather = async (city, country, countryCode) => {
            const appid = "f99bbd9e4959b513e9bd0d7f7356b38d"
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${appid}`    
            
            //refactor de codigo comentado abajo
            try{
                const response = await axios.get(url)
                const{data} = response
                const temperature = Number(convertUnits(data.main.temp).from("K").to("C").toFixed(0))//cambio la temperatura a celsius
                const state = data.weather[0].main.toLowerCase()                
                const propName = `${city}-${country}`
                const propValue = {temperature,state}
                // set[variable estado](variable estado => variable estado +1)
                setAllWeather(allWeather => ({ ...allWeather, [propName]: propValue} ))
            }catch(error){
                //error server not respond
                if(error.response){
                    const { data, status} = error.response
                    setError("Ha ocurrido un error en el servidor del clima")
                }//errores por no llegar al server
                else if(error.request){
                    setError("Verifique la conexion a internet")
                }//errores imprevistos
                else {
                    setError("Error al cargar los datos")
            }

            /*
            //axios// promise es una accion que se lanza y en algun momento va a dar una respuesta
            //.get(url)
            .then(response => {
                const{data} = response
                const temperature = Number(convertUnits(data.main.temp).from("K").to("C").toFixed(0))//cambio la temperatura a celsius
                const state = data.weather[0].main.toLowerCase()                
                const propName = `${city}-${country}`
                const propValue = {temperature,state}
                // set[variable estado](variable estado => variable estado +1)
                setAllWeather(allWeather => ({ ...allWeather, [propName]: propValue} ))
            }).catch(error =>{
                //error server not respond
                if(error.response){
                    const { data, status} = error.response
                    setError("Ha ocurrido un error en el servidor del clima")
                }//errores por no llegar al server
                else if(error.request){
                    setError("Verifique la conexion a internet")
                }//errores imprevistos
                else {
                    setError("Error al cargar los datos")
                }*/
            }
        }  
        
        cities.forEach(({ city, country, countryCode }) => {
            setWeather(city, country, countryCode)
        });
        
    }, [cities])

        return (
            <div>
                {
                    error && <Alert onClose={()=> setError(null)}severity="error">{error}</Alert>
                }
                <List>
                {
                        cities.map(cityAndCountry => renderCityAndCountry(onClickCity)(cityAndCountry,
                            allWeather[`${cityAndCountry.city}-${cityAndCountry.country}`]))
                }
                </List>
            </div>

        )        
}

CityList.propTypes = {
cities: PropTypes.arrayOf(
    PropTypes.shape({
        city: PropTypes.string.isRequired,
        country:PropTypes.string.isRequired,
        countryCode: PropTypes.string.isRequired,
    })
).isRequired,
    onClickCity: PropTypes.func.isRequired,
}

export default CityList