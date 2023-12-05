export const updateQueryParams = (parameter: string, value: string, isExpanded: boolean) => {
    // Parse the current URL
    const url = new URL(window.location.href)

    // Update or add or delete the query parameter
    if (isExpanded) {
        url.searchParams.set(parameter, value)
    } else if (url.searchParams.get(parameter) === value) {
        url.searchParams.delete(parameter)
    }

    // Replace the current URL with the updated one
    window.history.replaceState({}, '', url.href)
}

export const clearParameterFromURL = (parameterName: string) => {
    // Parse the current URL
    const url = new URL(window.location.href)
    url.searchParams.delete(parameterName)
    // Replace the current URL with the updated one
    window.history.replaceState({}, '', url.href)
}


export const scrollToDish = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
        ref.current.scrollIntoView({
            behavior: 'smooth', // You can use 'auto' or 'smooth' for the scrolling behavior
            block: 'start',     // You can use 'start', 'center', 'end', or 'nearest'
            inline: 'start',    // You can use 'start', 'center', 'end', or 'nearest'
        })
    }
}