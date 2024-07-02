import React, {ReactElement} from 'react'
import {ListItemText, Typography} from '@mui/material'

export interface IIngredient {
    name: string,
    quantity?: string
}

interface IIngredientsProps {
    title: string,
    ingredients: IIngredient[]
}

function Ingredients (props: IIngredientsProps): ReactElement | null {
    const {ingredients, title} = props
    if (!ingredients) {
        return null
    }
    return (
        <span>
            <Typography variant={'h6'}>
                {title || 'Съставки'}:
            </Typography>
            {
                ingredients.map((ingredient: IIngredient) => (
                    <ListItemText
                        sx={{ display: 'list-item', listStyleType: 'disc', marginLeft: 2 }}
                        key={ingredient.name}
                        primary={`${ingredient.name} ${ingredient.quantity ? ` : ${ingredient.quantity}` : '' }`}
                    />
                ))
            }
        </span>

    )
}

export default Ingredients