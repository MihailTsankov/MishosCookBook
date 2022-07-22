import React, {ReactElement} from 'react'
import Dish from './Dish'

import dishes from '../resources/dishes.json'

function CookBook (): ReactElement {
    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
        }}>
            {dishes.map(dish => <Dish key={dish.title} dish={dish} />)}
        </div>
    )
}

export default CookBook