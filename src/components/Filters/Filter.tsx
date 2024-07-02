import React, { ReactElement } from 'react'
import { Chip} from '@mui/material'

interface IFilterProps {
    filter: string,
    filtered: string[],
    onClickFilter: (filter:string)=>void
}

function Filter (props: IFilterProps): ReactElement | null {
    const {filter, onClickFilter, filtered} = props

    return (
        <Chip
            style={{
                margin: 5,
                backgroundColor: filtered.includes(filter)
                    ? '#eadbbe'
                    : '#fff',
            }}
            key={filter}
            label={filter}
            onClick={() => onClickFilter(filter)}
            variant={filtered.includes(filter) ? 'filled' : 'outlined'}
        />
    )
}

export default Filter