
export function convertTimeToMinutes(seconds: number) {
    // Hours, minutes and seconds
    let hrs = ~~(seconds / 3600);
    let mins = ~~((seconds % 3600) / 60);
    let secs = ~~seconds % 60;

    let ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}