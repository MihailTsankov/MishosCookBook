import React, {ReactElement, useRef, useEffect} from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Directions, {IDirection} from './Directions'
import Parts, {IPart} from './Parts'
import Images, {IImage} from './Images'
import Title from './Title'
import URLs from './URLs'
import {updateQueryParams, scrollToDish} from './windowUtils'

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const DISH_PARAMETER = 'dish'

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props
    return <IconButton {...other} />
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}))

export interface IDish {
    title: string,
    urls?: any,
    keywords: string[],
    parts?: IPart[],
    directions?: IDirection[],
    images?: IImage[],
}

interface IDishProps {
    dish: IDish,
    isDishExpanded: boolean
}

function Dish (props: IDishProps): ReactElement {
    const {isDishExpanded, dish} = props
    const {title, directions, parts, images, keywords, urls} = dish
    const [expanded, setExpanded] = React.useState(isDishExpanded)
    const dishRef = useRef<HTMLDivElement>(null)

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }


    useEffect(() => {
        if (expanded) {
            scrollToDish(dishRef)
        }
        updateQueryParams(DISH_PARAMETER, title, expanded)
    }, [expanded])

    return (
        <Card ref={dishRef}
            sx={{
                width: expanded ? 'calc(100% - 10px)' : 345,
                margin: 1,
            }}>
            <Title title={title} keywords={keywords} />
            <Images images={images} expanded={expanded}/>
            <Collapse in={expanded} timeout='auto' unmountOnExit>
                <CardContent>
                    <Parts parts={parts} />
                    <Directions directions={directions} />
                </CardContent>
            </Collapse>
            <CardContent>
                <URLs urls={urls} />
            </CardContent>
            <CardActions disableSpacing>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label='show more'
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
        </Card>
    )
}

export default Dish