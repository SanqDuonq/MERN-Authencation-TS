export function formatDate(dateString:string) {
    const date = new Date(dateString)
    if (isNaN(date.getTime()))
        return 'Invalid Date'
    return date.toLocaleString('en-US',{
        year: 'numeric',
        month: 'long',
        day: 'numeric'
        
    })
}