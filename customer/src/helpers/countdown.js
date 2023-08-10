function countdown(minutes) {
    let seconds = minutes * 60;

    let string = '';
    const countdownInterval = setInterval(() => {
        const minutesDisplay = Math.floor(seconds / 60)
            .toString()
            .padStart(2, '0');
        const secondsDisplay = (seconds % 60).toString().padStart(2, '0');
        string = `${minutesDisplay}:${secondsDisplay}`;
        console.log(string);
        seconds--;

        if (seconds < 0) {
            clearInterval(countdownInterval);
        }
    }, 1000);

    return string;
}

export default countdown;
