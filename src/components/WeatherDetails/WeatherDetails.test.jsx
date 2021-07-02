import React from 'react'
import {render} from '@testing-library/react'
import { WeatherDetails } from './WeatherDetails';

test("WeatherDetailsTest render",async()=>{
    const {findByText} = render(<WeatherDetails humidity={10} wind={9}></WeatherDetails>)

    // al usar las barras utilizar REGEXP
    const wind = await findByText(/9/)

    const humidity = await findByText(/10/)

    expect(humidity).toHaveTextContent("Humedad: 10%")
    expect(wind).toHaveTextContent("Viento: 9km/h")
})