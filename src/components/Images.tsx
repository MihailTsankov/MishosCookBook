import React, {ReactElement} from 'react'

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
        <div>
            {
                images.map((image: IImage) => {
                    const imageSource = `../resources/images/${image.src}`
                    return <img key={image.src} src={imageSource} alt={image.title}/>
                })
            }
        </div>
    )
}

export default Images