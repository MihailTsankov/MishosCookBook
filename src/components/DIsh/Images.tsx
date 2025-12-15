import React, { ReactElement } from 'react'
import { Box } from '@mui/material'

export interface IImage {
    title: string,
    src: string,
}

interface IImageProps {
    images?: IImage[]
    expanded: boolean
}

function Images(props: IImageProps): ReactElement | null {
    const { images, expanded } = props
    if (!images || !images.length) return null

    const imgHeight = 200
    const maxWidth = imgHeight * 2 // width not more than double the height

    if (!expanded) {
        const img = images[0]
        return (
            <Box sx={{ height: imgHeight, overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
                <Box
                    component='img'
                    src={`static/images/${img.src}`}
                    alt={img.title ?? ''}
                    sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        maxWidth: `${maxWidth}px`,
                    }}
                />
            </Box>
        )
    }

    return (
        <Box
            sx={{
                display: 'grid',
                gap: 1,
                justifyItems: 'center',
                gridTemplateColumns: {
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(4, 1fr)',
                },
                '& img': {
                    width: '100%',
                    height: imgHeight,
                    objectFit: 'cover',
                    display: 'block',
                    maxWidth: `${maxWidth}px`,
                },
            }}
        >
            {images.map((img, i) => <Box key={i} component='img' src={`static/images/${img.src}`} alt={img.title ?? `image-${i}`} />)}
        </Box>
    )
}

export default Images