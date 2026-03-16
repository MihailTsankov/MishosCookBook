import React, { ReactElement, useState } from 'react'
import FilterGroup from './FilterGroup'
import TimeFilterGroup from './TimeFilterGroup'
import dishes from '../../resources/dishes.json'
import {clearParameterFromURL} from '../windowUtils'
import {Button, Typography} from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { makeStyles } from '@mui/styles'
import {dishQuickness, getTimeBucket} from '../DIsh/Times'

const DISH_PARAMETER = 'dish'

const dishTypeFilters = [
    'аламинут',
    'вегетариянско',
    'гарнитура',
    'дресинг',
    'десерт',
    'закуска',
    'заготовка',
    'манджа',
    'марината',
    'подправка',
    'предястие',
    'салата',
    'сос',
    'супа',
    'тест',
    'яхния',
]

/* Референция към dishQuickness
    15: 'бързо',
    30: 'средно-бързо',
    60: 'средно',
    90: 'средно-бавно',
    120: 'бавно',
    180: 'много-бавно',
    3600: 'от преден ден',
*/
const dishQuicknessFilters: string[] = Object.values(dishQuickness)
const dishQuicknessTimesFilters: number[] = Object.keys(dishQuickness)
.map(Number)
.filter(Number.isFinite)
.sort((a, b) => a - b)
const dishHowFilters = [
    'air-fryer',
    'бланширане',
    'варене',
    'запечатване',
    'касерола',
    'миксер',
    'multi-cooker',
    'пасатор',
    'печене',
    'пържене',
    'скара',
    'тава',
    'тенджера',
    'тиган',
    'блендер',
    'фурна',
]
const dishDiateryTypeFilters = [
    'веган',
    'вегетарианско',
    'кето',
    'фибри',
]
const dishMeatFilters = [
    'агнешко',
    'бекон',
    'кайма',
    'месо',
    'пиле',
    'риба',
    'свинско',
    'телешко',
]
const dishPlantsFilters = [
    'авокадо',
    'боб',
    'брашно',
    'брюкселско зеле',
    'бургер',
    'бутер тесто',
    'гъби',
    'домати',
    'карфиол',
    'картофи',
    'кисело зеле',
    'козунак',
    'кори',
    'леща',
    'макарони',
    'моркови',
    'ориз',
    'панировка',
    'паста',
    'пица',
    'тесто',
    'тиквички',
    'хляб',
    'чесън',
]
const dishAnimalProductsFilters = [
    'кисело мляко',
    'мед',
    'прясно мляко',
    'сирене',
    'сметана',
    'шоколад',
    'яйца',
]


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const filters = dishes.reduce((sum: string[], dish: any) => {
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

    if (dish.times && dish.times.total) {
        const timeBucket = getTimeBucket(dish.times.total)
        if (timeBucket !== undefined) {
            const timeBucketStr = timeBucket.toString()
            if (!sum.includes(timeBucketStr)){
                newSum.push(timeBucketStr)
            }
        }
    }

    return newSum
}, [] as string[])

interface FiltersProps {
    handleChangeFiltered: (newFiltered: string[]) => void;
}

function Filters ({ handleChangeFiltered }: FiltersProps): ReactElement | null {

    const [filtered, setFiltered] = useState<string[]>([])
    const [isExpanded, setIsExpanded] = useState(true)
    const classes = useStyles()

    const toggleExpand = () => {
        setIsExpanded(!isExpanded)
    }

    const onClickFilter = (filter: string) => {
        if (filtered.includes(filter)) {
            const newFiltered = filtered.filter(item => item != filter)
            setFiltered(newFiltered)
            handleChangeFiltered(newFiltered)
        } else {
            const newFiltered = [...filtered, filter]
            setFiltered(newFiltered)
            handleChangeFiltered(newFiltered)
        }
        clearParameterFromURL(DISH_PARAMETER)
    }

    return (
        <div style={{marginTop: 20}}>
            <div style={{display: 'flex', alignItems: 'left', marginLeft: 10}}>
                <Button
                    onClick={toggleExpand}
                    style={{
                        /*position: 'absolute',
                        top: 10,
                        right: 50,*/
                        backgroundColor: 'white',
                        color: 'black',
                        borderRadius: '50%',
                        padding: '5px',
                        boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
                    }}
                >
                    {isExpanded ?  <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                </Button>
                <Typography variant='h5' style={{ marginLeft: 10, color: isExpanded ? 'black' : '#888888' }}>Филтри:</Typography>
            </div>

            {isExpanded && (
                <div className={`${classes.filterContent} ${isExpanded ? classes.expanded : ''}`}>
                    <FilterGroup title={'Тип ястие:'} filters={dishTypeFilters} filtered={filtered} onClickFilter={onClickFilter}/>
                    <TimeFilterGroup
                        title={'Бързина:'}
                        filters={dishQuicknessTimesFilters}
                        filtered={filtered} onClickFilter={onClickFilter}/>
                    <FilterGroup title={'Как:'} filters={dishHowFilters} filtered={filtered} onClickFilter={onClickFilter}/>
                    <FilterGroup title={'Диета:'} filters={dishDiateryTypeFilters} filtered={filtered} onClickFilter={onClickFilter}/>
                    <FilterGroup title={'Месо:'} filters={dishMeatFilters} filtered={filtered} onClickFilter={onClickFilter}/>
                    <FilterGroup title={'Растителни:'} filters={dishPlantsFilters} filtered={filtered} onClickFilter={onClickFilter}/>
                    <FilterGroup title={'Животински:'} filters={dishAnimalProductsFilters} filtered={filtered} onClickFilter={onClickFilter}/>
                    <FilterGroup title={'Други:'} filters={filters} filtered={filtered} onClickFilter={onClickFilter}/>
                </div>)
            }
        </div>
    )
}

const useStyles = makeStyles({
    filterContent: {
        transition: 'max-height 0.3s ease-in-out',
        overflow: 'hidden',
        maxHeight: 'fit-content',
    },
    expanded: {
        //maxHeight: '500px', // Adjust this value to your desired maximum height
    },
})

export default Filters