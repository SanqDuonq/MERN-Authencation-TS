export function formatDate(dateString:Date) {
    const date = new Date(dateString)
    if (isNaN(date.getTime()))
        return 'Invalid Date'
    return date.toLocaleString('en-US',{
        year: 'numeric',
        month: 'long',
        day: 'numeric'

    })
}