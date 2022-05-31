import React, {ReactElement} from 'react'
import Typography from '@mui/material/Typography'

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
        <Typography>
            {
                directions.map(direction => (
                    <div key={direction.content}>
                        {direction.content}
                    </div>
                ))
            }
        </Typography>
    )
}

export default Directions