import React, { ReactElement } from 'react'
import {  Typography } from '@mui/material'
import Filter from './Filter'
import {dishQuickness} from '../DIsh/Times'

interface ITimeFiltersProps {
    title: string,
    filters: number[],
    filtered: string[],
    onClickFilter: (filter:string)=>void
}

function TimeFilterGroup (props: ITimeFiltersProps): ReactElement | null {
    const {title, filters, filtered, onClickFilter} = props
    if (!filters || !filters.length) return null

    return (
        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
            <Typography style={{ marginLeft: 10 }}>{title}</Typography>
            {
                filters.map(filter => {
                    const filterLabel = dishQuickness[Number(filter)]
                    return <Filter key={filter}
                        filter={filterLabel}
                        filtered={filtered}
                        onClickFilter={onClickFilter}/>
                })
            }
        </div>
    )
}

export default TimeFilterGroup