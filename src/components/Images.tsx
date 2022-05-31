import React, {ReactElement} from 'react'
import {CardContent, CardMedia} from '@mui/material'

export interface IImage {
    title: string,
    src: string,
}

interface IImageProps {
    images?: IImage[]
}

function Images (props: IImageProps): ReactElement | null {
    const {images} = props
    if (!images || !images.length) return null

    return (
        <CardContent style={{display: 'flex'}}>
            {
                images.map((image: IImage) => {
                    const imageSource = `../resources/images/${image.src}`
                    return <CardMedia
                        component='img'
                        key={image.src}
                        height='194'
                        image={imageSource}
                        alt={image.title}
                    />
                })
            }
        </CardContent>


    )
}

export default Images