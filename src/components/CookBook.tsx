import React, {ReactElement} from 'react'
import Dish from './Dish'

import dishes from '../resources/dishes.json'
import Filters from './Filters'
import {clearParameterFromURL} from './windowUtils'

const dishTypeFilters = ['манджа', 'аламинут', 'предястие', 'супа', 'салата', 'закуска', 'десерт', 'гарнитура', 'сос', 'марината', 'заготовка', 'подправка', 'тест']
const dishQuicknessFilters = ['бързо', 'средно-бързо', 'средно', 'средно-бавно', 'бавно', 'много-бавно', 'от преден ден' ]
const dishHowFilters = ['фурна', 'тиган', 'тенджера', 'тава', 'air-fryer', 'multi-cooker', 'миксер', 'пасатор', 'блендер', 'пържене', 'варене', 'печене', 'запечатване', 'бланширане'  ]
const dishDiateryTypeFilters = ['кето', 'веган', 'вегетарианско', 'фибри']
const dishMeatFilters = ['пиле', 'свинско', 'бекон', 'телешко', 'агнешко', 'риба', 'кайма', 'месо']
const dishPlantsFilters = ['боб', 'леща', 'ориз', 'гъби', 'картофи', 'домати', 'моркови', 'авокадо', 'кисело зеле', 'брюкселско зеле', 'карфиол', 'тиквички', 'хляб', 'бургер', 'паста', 'макарони', 'козунак', 'брашно', 'тесто', 'панировка']
const dishAnimalProductsFilters=['яйца', 'кашкавал', 'сирене', 'прясно мляко', 'кисело мляко', 'сметана', 'мед']

const DISH_PARAMETER = 'dish'

const filters = dishes.reduce((sum: any, dish) => {
    const newSum = [...sum]
    for (const keyword of dish.keywords) {
        if (!sum.includes(keyword)
            && !dishTypeFilters.includes(keyword)
            && !dishQuicknessFilters.includes(keyword)
            && !dishHowFilters.includes(keyword)
            && !dishDiateryTypeFilters.includes(keyword)
            && !dishMeatFilters.includes(keyword)
            && !dishPlantsFilters.includes(keyword)
            && !dishAnimalProductsFilters.includes(keyword)){
            newSum.push(keyword)
        }
    }

    return newSum
}, [])

function CookBook (): ReactElement {
    const [filtered, setFiltered] = React.useState<string[]>([])

    const onClickFilter = (filter: string) => {
        if (filtered.includes(filter)) {
            const newFiltered = filtered.filter(item => item != filter)
            setFiltered(newFiltered)
        } else {
            const newFiltered = [...filtered, filter]
            setFiltered(newFiltered)
        }
        clearParameterFromURL(DISH_PARAMETER)
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
            <Filters title={'Тип ястие:'} filters={dishTypeFilters} filtered={filtered} onClickFilter={onClickFilter}/>
            <Filters title={'Бързина:'} filters={dishQuicknessFilters} filtered={filtered} onClickFilter={onClickFilter}/>
            <Filters title={'Как:'} filters={dishHowFilters} filtered={filtered} onClickFilter={onClickFilter}/>
            <Filters title={'Диета:'} filters={dishDiateryTypeFilters} filtered={filtered} onClickFilter={onClickFilter}/>
            <Filters title={'Месо:'} filters={dishMeatFilters} filtered={filtered} onClickFilter={onClickFilter}/>
            <Filters title={'Растителни:'} filters={dishPlantsFilters} filtered={filtered} onClickFilter={onClickFilter}/>
            <Filters title={'Животински:'} filters={dishAnimalProductsFilters} filtered={filtered} onClickFilter={onClickFilter}/>
            <Filters title={'Други:'} filters={filters} filtered={filtered} onClickFilter={onClickFilter}/>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
            }}>
                {filteredDishes.map(dish => <Dish key={dish.title} dish={dish} isDishExpanded={currentDish === dish.title}/>)}
            </div>
        </div>
    )
}

export default CookBook