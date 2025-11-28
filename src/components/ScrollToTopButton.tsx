// File: `src/components/ScrollToTopButton.tsx`
import React from 'react'
import Fab from '@mui/material/Fab'
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

const ScrollToTopButton: React.FC = () => {
    const handleClick = () => {
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    return (
        <Tooltip title='Scroll to top' arrow TransitionComponent={Zoom}>
            <Fab
                color='primary'
                aria-label='scroll to top'
                onClick={handleClick}
                sx={{
                    position: 'fixed',
                    top: 12,
                    right: 12,
                    zIndex: theme => theme.zIndex.appBar + 1,
                }}
                size='medium'
            >
                <KeyboardArrowUpIcon />
            </Fab>
        </Tooltip>
    )
}

export default ScrollToTopButton