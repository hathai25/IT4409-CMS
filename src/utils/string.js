export const formatCurrency = (number) => {
    return number.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
}

//format time
export const formatTime = (time) => {
    return time.toLocaleString('it-IT', {timeStyle : 'short'});
}