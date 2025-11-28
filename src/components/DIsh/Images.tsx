import React, {ReactElement} from 'react'
import {Box} from '@mui/material'

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

    if (!expanded) {
        // Collapsed: show only the first image with a fixed height and cover cropping
        const img = images[0]
        return (
            <Box sx={{ height: 200, overflow: 'hidden' }}>
                <Box
                    component='img'
                    src={`static/images/${img.src}`}
                    alt={img.title ?? ''}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
            </Box>
        )
    }

    // Expanded: show all images in a responsive grid (1-2 columns)
    const cols = images.length === 1 ? 1 : images.length === 2 ? 2 : 2
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gap: 1,
                '& img': { width: '100%', height: 200, objectFit: 'cover', display: 'block' },
            }}
        >
            {images.map((img, i) => <Box key={i} component='img' src={`static/images/${img.src}`} alt={img.title ?? `image-${i}`} />)}
        </Box>


    )
}

export default Images