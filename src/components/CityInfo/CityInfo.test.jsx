import React from 'react'
import CityInfo from './CityInfo' //SUT subject under testing
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'


test("CityInfo render", async() => {
    //AAA
    //Arrange
    //Act
    const city = "Buenos Aires"
    const country = "Argentina"
    
    const{ findAllByRole } = render(<CityInfo city={city} country={country}/>)
    //Assert

    // findAllByRole nos va a buscar todos los componentes que sean cabecera
    //el resultado es un array de componentes
    const cityAndCountryComponents = await findAllByRole("heading")

    //Cuando el test va a ser correcto?
    //cuando el primer elemento tenga la ciudad bs as y el segundo elemento tenga valor argentina

    expect(cityAndCountryComponents[0]).toHaveTextContent(city)
    expect(cityAndCountryComponents[1]).toHaveTextContent(country)
});