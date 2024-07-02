import React, { ReactElement } from 'react'
import {  Typography } from '@mui/material'
import Filter from './Filter'

interface IFiltersProps {
    title: string,
    filters: string[],
    filtered: string[],
    onClickFilter: (filter:string)=>void
}

function FilterGroup (props: IFiltersProps): ReactElement | null {
    const {title, filters, filtered, onClickFilter} = props
    if (!filters || !filters.length) return null

    return (
        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
            <Typography style={{ marginLeft: 10 }}>{title}</Typography>
            {
                filters.map(filter => <Filter key={filter} filter={filter} filtered={filtered} onClickFilter={onClickFilter}/>)

            }
        </div>
    )
}

export default FilterGroup