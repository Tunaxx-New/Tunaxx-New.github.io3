const WeekLength = 7;
const TimeStart = 9;
const TimeEnd = 20;

var users = new XMLHttpRequest();
var request = function() {
    users.open("GET", "../users/users.json", true);
    users.send(null);
}
users.onload = function() {
    addTimeLine(30);
}

var timeToString = function(h, m) {
    var hour, minutes;
    if (h < 10) {
        hour = '0' + h.toString();
    } else {
        hour = h.toString();
    }
    if (m < 10) {
        minutes = '0' + m.toString();
    } else {
        minutes = m.toString();
    }
    return hour + ':' + minutes;
}
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

var addBlock = function(count) {
    var block = document.createElement("td");

    var c = count;
    while (c > 10) {
        c /= 10;
    }
    var hslColor = "hsl(0, 30%, " + c*20 + "%)";
    block.style.backgroundColor = hslColor;
    return block;
}
var addRaw = function(time, goodTime, hour, minute) {
    var table = document.getElementById("toadd");
    var raw = document.createElement("tr");

    var timeBlock = document.createElement("td");
    timeBlock.textContent = time;
    if (goodTime) {
        timeBlock.className = "even";
    } else {
        timeBlock.className = "odd";
    }
    raw.appendChild(timeBlock);

    if (users.status === 200) {
        var usersList = JSON.parse(users.responseText);
        for (var k = 1; k < WeekLength + 1; k++) {
            var count = 0;
            for (var i = 0; i < usersList.users.length; i++) {
                    var h = 0;
                    var m = 0;
                    var length = 0;
                    for (var j = 0; j < usersList.users[i].time.length; j++) {
                        var string = usersList.users[i].time[j];
                        var bufferString = "";
                        var firstBool = true;
                        var wrongWeekDay = true;
                        for (var o = 0; o < string.length; o++) {
                            if (string[o] == '|') {
                                switch (bufferString) {
                                    case "Mon": {
                                        if (k != 1) {
                                            wrongWeekDay = false;
                                            break;
                                        }
                                    }
                                    break;
                                    case "Tue": {
                                        if (k != 2) {
                                            wrongWeekDay = false;
                                            break;
                                        }
                                    }
                                        break;
                                }
                                bufferString = "";
                            } else if (string[o] == ':') {
                                if (firstBool) {
                                    h = parseInt(bufferString);
                                    firstBool = false;
                                } else {
                                    m = parseInt(bufferString);
                                }
                                bufferString = "";
                            } else if (string[o] == '+') {
                                length = parseInt(bufferString);
                                bufferString = "";
                            } else {
                                bufferString += string[o];
                            }
                        }
                        if (wrongWeekDay) {
                            var time1 = hour * 60 + minute;
                            var time2 = h * 60 + m;
                            if (time1 <= time2 + length && time1 >= time2) {
                                count++;
                            }
                        }
                    }
                }
            var block = addBlock(count);
            raw.appendChild(block);
            }
        }
        table.appendChild(raw);
}
var addTimeLine = function(scaleInMinutes) {
    var hours = TimeStart;
    var minutes = 0;
    while (hours < TimeEnd) {
        var time = timeToString(hours, minutes);
        if (minutes == 0) {
            addRaw(time, true, hours, minutes);
        } else {
            addRaw(time, false, hours, minutes);
        }

        minutes += scaleInMinutes;
        if (minutes >= 60) {
            minutes = minutes % 60;
            hours++;
        }
    }
}