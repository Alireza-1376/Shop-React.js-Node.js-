export default function shortenText(text: string, length: number) {
    if (text.length < length) return text;
    return text.slice(0, length) + "..."
}