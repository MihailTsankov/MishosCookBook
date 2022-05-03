import React, {ReactElement} from 'react'
import Ingredients, {IIngredient} from './Ingredients'

export interface IPart {
    name: string,
    ingredients: IIngredient[]
}

interface IPartsProps {
    parts: IPart [] | undefined
}

function Parts (props: IPartsProps): ReactElement | null {
    const {parts} = props

    if (!parts || !parts.length) return null

    return (
        <div>
            {parts ? parts.map(part => <Ingredients key={part.name} title={part.name} ingredients={part.ingredients} />) : null}
        </div>
    )
}

export default Parts