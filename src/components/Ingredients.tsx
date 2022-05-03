import React, {ReactElement} from 'react'

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
        <div>
            Съставки:
            {
                ingredients.map((ingredient: IIngredient) => (
                    <div key={ingredient.name}>
                        {ingredient.name}
                        {ingredient.quantity ? ` : ${ingredient.quantity}` : null }
                    </div>
                ))
            }
        </div>
    )
}

export default Ingredients