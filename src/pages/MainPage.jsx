import React from 'react'
import { useHistory } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import CityList from './../components/CityList'
import AppFrame from './../components/AppFrame/AppFrame';

const cities = [
    {city:"Buenos Aires", country:"Argentina", countryCode:"AR"},
    {city:"Bogota", country:"Colombia", countryCode:"CO"},
    {city:"Madrid", country:"España", countryCode:"ES"},
    {city:"Ciudad de México", country:"Mexico", countryCode:"MX"},
]

const MainPage = () => {
    const history = useHistory()
    
    const onClickHandler = (city, countryCode) =>{
        //history.push permite alterar la URL por programacion
        history.push(`/city/${countryCode}/${city}`)
    }

    return (
        <AppFrame>   
            <Paper elevation={3}>
                <h2>Lista de ciudades</h2>
                    <CityList 
                        cities={cities}
                        onClickCity={onClickHandler}
                    ></CityList>
            </Paper>         
        </AppFrame>
    )
}

export default MainPage
