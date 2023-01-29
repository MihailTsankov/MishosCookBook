import React, {ReactElement} from 'react'
import {Typography} from '@mui/material'

export interface IIngredient {
    name: string,
    quantity?: string
}

interface IIngredientsProps {
    title: string,
    ingredients: IIngredient[]
}

function Ingredients (props: IIngredientsProps): ReactElement | null {
    const {ingredients} = props
    if (!ingredients) {
        return null
    }
    return (
        <Typography>
            Съставки:
            {
                ingredients.map((ingredient: IIngredient) => (
                    <Typography key={ingredient.name}>
                        - {ingredient.name}
                        {ingredient.quantity ? ` : ${ingredient.quantity}` : null }
                    </Typography>
                ))
            }
        </Typography>
    )
}

export default Ingredients