export function log(message: string, status: 'success' | 'error' | 'info' = 'info') {
    let bg = '\x1b[1;97;43m'

    if (status === 'success') {
        bg = '\x1b[1;97;42m'
    } else if (status === 'error') {
        bg = '\x1b[1;97;41m'
    } else if (status === 'info') {
        bg = '\x1b[1;97;43m'
    }

    console.log(bg + message + '\x1b[0m')
}
