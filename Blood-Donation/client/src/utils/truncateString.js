export const truncateString = (String) => {
    if (String.length < 25) {
        return String;
    } else {
        return String.substring(0,40) + "..."
    }
}