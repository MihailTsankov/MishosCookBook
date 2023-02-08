import React, {ReactElement} from 'react'
import {Typography} from '@mui/material'

interface IURL {
    url: string
}
interface IURLsProps {
    urls: IURL[]
}

function URLs (props: IURLsProps): ReactElement | null {
    const {urls} = props
    if (!urls) {
        return null
    }
    return (
        <div>
            <Typography>Линкове:</Typography>
            {
                urls.map((urlItem: IURL) => (
                    <Typography key={urlItem.url}>
                        <a href={urlItem.url}>{urlItem.url}</a>
                    </Typography>
                ))
            }
        </div>
    )
}

export default URLs