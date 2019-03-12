
//Simple hepler function that canverts ms to min
const getMinutesFromMilliseconds = function (milliseconds) {
    if (!milliseconds) return 0;
    return Math.floor(milliseconds / 60000);
}

//Get the difference between two times in minutes
const getMinutesDiff = function (d1, d2) {
    if (!d1 || !d2) return 0;
    var mileseconds = Math.abs(d1 - d2);
    var res = getMinutesFromMilliseconds(mileseconds);
    return res;
}

//Returns UserList as a markup for easier linking
const getUserListMessage = function (instaUserNames) {
    var result = "";
    for (var i = 0; i < instaUserNames.length; i++) {
        var currentInstaUser = instaUserNames[i];
        result = result + '<a href="http://instagram.com/_u/' + currentInstaUser.substring(1, currentInstaUser.length) + '">' 
                    + currentInstaUser + '</a>\r\n';
    }
    return result;
}

module.exports.getMinutesFromMilliseconds = getMinutesFromMilliseconds;
module.exports.getMinutesDiff = getMinutesDiff;
module.exports.getUserListMessage = getUserListMessage;