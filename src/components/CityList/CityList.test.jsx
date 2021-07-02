import React from 'react'
import {render} from '@testing-library/react'
import CityList from './CityList';

const cities =[
    {city:"Buenos Aires", country:"Argentina"},
    {city:"Bogota", country:"Colombia"},
    {city:"Madrid", country:"España"},
    {city:"DF", country:"Mexico"},
]

test("CityList renders", async() => {
    //AAA Arrange Act Assert

    //const {findAllByRole} = render(<CityList cities={cities}/>)

    //const items = await findAllByRole("listitem")

    //expect(items).toHaveLength(4)
})