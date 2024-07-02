import React, {ReactElement} from 'react'
import Dish from './DIsh/Dish'

import dishes from '../resources/dishes.json'
import Filters from './Filters/Filters'



function CookBook (): ReactElement {
    const [filtered, setFiltered] = React.useState<string[]>([])

    const handleChangeFiltered = function (newFiltered: string[]) {
        setFiltered(newFiltered)
    }

    const filteredDishes = dishes.filter(dish => {
        if (filtered.length === 0) return true
        for (const filter of filtered) {
            if (!dish.keywords.includes(filter)) return false
        }
        return true
    })



    const url = new URL(window.location.href)
    const currentDish = url.searchParams.get('dish')

    return (
        <div>
            <Filters handleChangeFiltered={handleChangeFiltered}/>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                marginTop: 20,
            }}>
                {filteredDishes.map(dish => <Dish key={dish.title} dish={dish} isDishExpanded={currentDish === dish.title}/>)}
            </div>
        </div>
    )
}

export default CookBook