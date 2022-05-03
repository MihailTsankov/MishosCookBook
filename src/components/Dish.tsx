import React, {ReactElement} from 'react'
import Directions, {IDirection} from './Directions'
import Parts, {IPart} from './Parts'
import Images, {IImage} from './Images'

export interface IDish {
    title: string,
    urls?: any,
    keywords?: string[],
    parts?: IPart[],
    directions?: IDirection[],
    images?: IImage[],
}

interface IDishProps {
    dish: IDish
}

function Dish (props: IDishProps): ReactElement {
    const {title, directions, parts, images} = props.dish
    return (
        <div style={{
            border: 'grey 1px solid',
            margin: 5,

        }}
        key={title}>
            {title}
            <Images images={images} />
            <Directions directions={directions} />
            <Parts parts={parts} />
        </div>
    )
}

export default Dish