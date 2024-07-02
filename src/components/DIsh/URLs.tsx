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
        <>
            <Typography variant={'h6'}>
                Линкове:
            </Typography>
            {
                urls.map((urlItem: IURL) => (
                    <Typography key={urlItem.url}>
                        <a href={urlItem.url} target='_blank' rel='noopener'>{urlItem.url}</a>
                    </Typography>
                ))
            }
        </>
    )
}

export default URLs