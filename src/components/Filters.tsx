import React, {ReactElement} from 'react'
import {Chip, Typography} from '@mui/material'

interface IFiltersProps {
    title: string,
    filters: string[],
    filtered: string[],
    onClickFilter: (filter:string)=>void
}

function Filters (props: IFiltersProps): ReactElement | null {
    const {title, filters, filtered, onClickFilter} = props
    if (!filters || !filters.length) return null

    return (
        <div style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
            <Typography style={{marginLeft: 10}}>{title}</Typography>
            {
                filters.map(filter => <Chip
                    style={{
                        margin: 5,
                    }}
                    key={filter}
                    label={filter}
                    onClick={() => onClickFilter(filter)}
                    variant={filtered.includes(filter) ? 'filled' : 'outlined'}
                />)

            }
        </div>
    )
}

export default Filters