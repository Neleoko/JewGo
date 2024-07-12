export default function characterUtils(string: string) {
    return string.split(' ').map((word: string) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
}