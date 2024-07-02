import React, {ReactElement} from 'react'
import Typography from '@mui/material/Typography'
import {List, ListItemText} from '@mui/material'

export interface IDirection {
    content: string
}

interface IDirectionsProps {
    directions: IDirection[] | undefined
}

function Directions (props: IDirectionsProps): ReactElement | null {
    const {directions} = props
    if (!directions) {
        return null
    }
    return (
        <List
            subheader={
                <Typography variant={'h6'}>
                    Инструкции:
                </Typography>
            }
            style={{paddingTop: 10}}>
            {
                directions.map(direction => <ListItemText
                    sx={{ display: 'list-item', listStyleType: 'circle', marginLeft: 2 }}
                    key={direction.content}
                    primary={direction.content}
                />)
            }
        </List>
    )
}

export default Directions