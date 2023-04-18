import React, {ReactElement} from 'react'
import {CardContent, CardMedia} from '@mui/material'

export interface IImage {
    title: string,
    src: string,
}

interface IImageProps {
    images?: IImage[]
    expanded: boolean
}

function Images (props: IImageProps): ReactElement | null {
    const {images, expanded} = props
    if (!images || !images.length) return null

    return (
        <CardContent style={{display: 'flex'}}>
            {
                images.map((image: IImage) => {
                    const imageSource = `../static/images/${image.src}`
                    return <CardMedia
                        component='img'
                        key={image.src}
                        height={expanded ? 400 : 194}
                        image={imageSource}
                        alt={image.title}
                    />
                })
            }
        </CardContent>


    )
}

export default Images