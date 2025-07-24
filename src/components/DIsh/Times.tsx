
export interface ITimes {
    total?: number,
    work?: number
}

function getTimesText(props: ITimes): string | null {
    const {total, work} = props

    if (total && work) {
        return `Всичко ${total}мин, работа ${work}мин`
    } else if (total) {
        return `Всичко ${total}мин`
    } else if (work) {
        return `Работа ${work}мин`
    }

    return ''
}

export default getTimesText