import React, {ReactElement} from 'react'
import CardHeader from '@mui/material/CardHeader'
import getTimesText, {ITimes} from './Times'

export interface ITitle {
    title: string,
    keywords: string[],
    times?: ITimes
}

function Title (props: ITitle): ReactElement | null {
    const {title, keywords, times} = props

    const timesText = times ? getTimesText(times) : undefined
    const keywordsText = keywords.join(', ')

    const subheaderText = timesText ? `${timesText}, ${keywordsText}` : keywordsText

    return (
        <CardHeader
            title={title}
            subheader={subheaderText}
        />
    )
}

export default Title