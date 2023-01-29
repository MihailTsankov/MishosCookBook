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
        <Typography>
            Линкове:
            {
                urls.map((urlItem: IURL) => (
                    <Typography key={urlItem.url}>
                        <div>
                            <a href={urlItem.url}>{urlItem.url}</a>
                        </div>
                    </Typography>
                ))
            }
        </Typography>
    )
}

export default URLs