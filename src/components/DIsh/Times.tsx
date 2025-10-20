import React from 'react'

export interface ITimes {
    total?: number,
    work?: number
}

const dishQuickness: Record<number, string> = {
    15: 'бързо',
    30: 'средно-бързо',
    60: 'средно',
    90: 'средно-бавно',
    120: 'бавно',
    180: 'много-бавно',
    3600: 'от преден ден',
}

function formatTimesText({ total, work }: ITimes): string {
    if (total && work) {
        return `Всичко ${total}мин\nРабота ${work}мин`
    } else if (total) {
        return `Всичко ${total}мин`
    } else if (work) {
        return `Работа ${work}мин`
    }
    return ''
}

function getTimeBucket(total: number) {
    let bucket = dishQuickness[total] ? total : undefined

    if (!bucket) {
        const keys = Object.keys(dishQuickness)
        .map(Number)
        .sort((a, b) => a - b)
        if (keys.length === 0) return undefined

        // If time is less than or equal to first midpoint, return first key
        for (let i = 0; i < keys.length - 1; i++) {
            const current = keys[i]
            const next = keys[i + 1]
            const midpoint = (current + next) / 2
            if (total <= midpoint) {
                bucket = current
                break
            }
        }
    }

    return bucket
}

function getTimeLabel(total: number) {
    const bucket = getTimeBucket(total)
    if (bucket) return dishQuickness[bucket]
}

const Times: React.FC<ITimes> = props => {
    const { total } = props
    if (!total) return null

    const tooltip = formatTimesText(props) || undefined

    const label = getTimeLabel(total)

    return <span title={tooltip} style={{ cursor: 'help' }}>{label}</span>
}

export { dishQuickness }
export { getTimeLabel }
export { getTimeBucket }
export default Times