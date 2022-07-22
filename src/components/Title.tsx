import React, {ReactElement} from 'react'
import CardHeader from '@mui/material/CardHeader'

export interface ITitle {
    title: string,
    keywords: string[]
}

function Title (props: ITitle): ReactElement | null {
    const {title, keywords} = props

    const keywordsText = keywords.join(', ')

    return (
        <CardHeader
            title={title}
            subheader={keywordsText}
        />
    )
}

export default Title