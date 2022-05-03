import React, {ReactElement} from 'react'

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
        <div>
            {
                directions.map(direction => (
                    <div key={direction.content}>
                        {direction.content}
                    </div>
                ))
            }
        </div>
    )
}

export default Directions