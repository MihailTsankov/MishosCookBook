import React, {ReactElement} from 'react'
import CardHeader from '@mui/material/CardHeader'
import Times, {ITimes} from './Times'

export interface ITitle {
    title: string,
    keywords: string[],
    times?: ITimes
}

function Title (props: ITitle): ReactElement | null {
    const {title, keywords, times} = props

    const timesComponent = times ? <Times {...times} /> : null
    const keywordsText = keywords.join(', ')

    const subheaderText = timesComponent ? <span>{timesComponent}, {keywordsText}</span> : keywordsText

    return (
        <CardHeader
            title={title}
            subheader={subheaderText}
        />
    )
}

export default Title