//List of properties for scene from constructor
//----------------------------------------------------------
//Plane - [x, y, z, Rotate: x, y, z, width, height, color, isShade]
var planeProps = [
    [50, 50, 10, 0, 0, 0, 0, 0, "#000000", true]
]
//Cube - [x, y, z, Rotate: x, y, z, Scale: w, h, l, color, customZIndex, animationFromUp, animToward, Towardsize, framesCount]
var cubeProps = [
    [-11, 46, 0, -2, 19, -10, 455, 10, 350, "#303030", -10, true],     //table              0

    [-102, 1, -154, -2, 17, -10, 135, 87, 29, "#303030", 0, true, true, 2, 1],   //monitor  1
    [-102, 1, -154, -2, 17, -10, 135, 87, 2, "#000000", 100, true],   //monitor-frame       2
    [-102, 1, -154, -2, 17, -10, 135, 87, 2, "#000000", 90, true],   //monitor-frame        3
    [-102, 1, -154, -2, 17, -10, 135, 87, 2, "#000000", 80, true],   //monitor-frame        4
    [-102, 1, -154, -2, 17, -10, 135, 87, 2, "#000000", 70, true],   //monitor-frame        5

    [-95, 57, -164, -2, 24, -10, 25, 25, 20, "#A0A0A0", -1, true],    //neck                6
    [-86, 65, -164, -2, 24, -11, 100, 5, 70, "#D0D0D0", -2, true],    //place               7
    [30, 60, -84, -6, 41, -12, 25, 12, 53, "#FFFFFF", 0, true],      //mouse                8

    [-213, 112, -125, -10, 57, -18, 62, 6, 45, "#1050F0", 0, true],  //phone                9
    [-213, 110, -125, -10, 57, -18, 62, 2, 45, "#000000", 50, true],  //phone-frame          10
    [-213, 110, -125, -10, 57, -18, 62, 2, 45, "#000000", 40, true],  //phone-frame          11
    [-213, 110, -125, -10, 57, -18, 62, 2, 45, "#000000", 30, true],  //phone-frame          12
    [-213, 110, -125, -10, 57, -18, 62, 2, 45, "#000000", 20, true],  //phone-frame          13

    [-220, 200, -125, -10, 29, -4, 25, 170, 25, "#000000", -20, false], //table-leg         14
    [-284, 183, -195, -10, 26, -5, 20, 140, 20, "#000000", -20, false], //table-leg         15
    [100, 110, -195, -6, 35, -5, 17, 135, 17, "#000000", -20, false],    //table-leg        16
    [200, 125, -195, -12, 35, -10, 25, 152, 25, "#000000", -20, false],  //table-leg        17

    [118, 39, 1, -4, 42, -9, 80, 3, 80, "#FC0FC0", 0, true],  //poster1                     18
    [118, 39, 1, -4, 42, -9, 80, 2, 80, "#FC0FC0", 50, true],  //poster1-frame               19
    [118, 39, 1, -4, 42, -9, 80, 2, 80, "#FC0FC0", 49, true],  //poster1-frame               20
    [118, 39, 1, -4, 42, -9, 80, 2, 80, "#AC0AC0", 48, true],  //poster1-frame               21
    [118, 39, 1, -4, 42, -9, 80, 2, 80, "#5C05C0", 47, true],  //poster1-frame               22

    [150, -96, 0, -60, -14, -87, 100, 6, 90, "#303030", 0, false],  //poster2               23
    [145, -94, 0, -60, -14, -87, 100, 2, 90, "#00D6FF", 46, false],  //poster2-frame         24
    [145, -94, 0, -60, -14, -87, 100, 2, 90, "#00D6FF", 45, false],  //poster2-frame         25
    [145, -94, 0, -60, -14, -87, 100, 2, 90, "#0086AF", 44, false],  //poster2-frame         26
    [145, -94, 0, -60, -14, -87, 100, 2, 90, "#00365F", 43, false],  //poster2-frame         27

    [-49, 73, -84, -2, 24, -13, 141, 5, 84, "#DFDFDF", 0, true]     //keyboard              19
]
//Light - [x, y, z, color, intensity]
var lights = [
    [0, 0, -100, "#FFFFFF", 1]
]
const extraLight = false;
var extraInten = 1;
var w = 0;
var h = 0;
//----------------------------------------------------------

var mouseLight;
var mouseColor = "#FF0000";
var mouseInten = 100;
const intenMin = 0.01;
var id = new Array(cubeProps.length + 16);
var idmove = new Array(4*1);
var busy = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true];
var bugbusy = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true];

function moveCube(e, sx, sy, step, a, i) {
    busy[i] = false;
    var fx = parseFloat(e.style.getPropertyValue("--x")) + sx;
    var fy = parseFloat(e.style.getPropertyValue("--y")) + sy;
    var s = step;
    const anim = function frameCubeUp(dx, dy, i) {
        var x = parseFloat(e.style.getPropertyValue("--x"));
        var y = parseFloat(e.style.getPropertyValue("--y"));

        const dist = Math.abs(parseFloat(e.style.getPropertyValue("--y")) - fy);

        if (Math.abs(parseFloat(e.style.getPropertyValue("--y")) - fy) < 0.1) {
            e.style.setProperty("--y", fy + 'px');
            e.style.setProperty("--x", fx + 'px');
            busy[i] = true;
            clearInterval(idmove[i]);
            if (!bugbusy[i]) {
                bugbusy[i] = true;
                moveCube(e, -sx, -sy, step, a, i);
            }
        } else {
            e.style.setProperty("--y", y + sy/s + 'px');
            e.style.setProperty("--x", x + sx/s + 'px');
            if (sy > 0) {
                if (y + sy/s >= fy) {
                    e.style.setProperty("--y", fy + 'px');
                    e.style.setProperty("--x", fx + 'px');
                    busy[i] = true;
                    clearInterval(idmove[i]);
                    if (!bugbusy[i]) {
                        bugbusy[i] = true;
                        moveCube(e, -sx, -sy, step, a, i);
                    }
                }
            } else {
                if (y + sy/s <= fy) {
                    e.style.setProperty("--y", fy + 'px');
                    e.style.setProperty("--x", fx + 'px');
                    busy[i] = true;
                    clearInterval(idmove[i]);
                    if (!bugbusy[i]) {
                        bugbusy[i] = true;
                        moveCube(e, -sx, -sy, step, a, i);
                    }
                }
            }
        }
        s -= a;
    }
        clearInterval(idmove[i]);
        idmove[i] = setInterval(anim.bind(null, fx, fy, i), 1);
}

var t1 = document.getElementById("t1");
var img1 = document.getElementById("github");
var text = document.getElementById("text");
var hyper = document.getElementById("hyper");
t1.onmouseenter = function(e) {
    img1.style.animation = "fadeOut 1s";
    text.style.animation = "fadeOut 1s";
    img1.style.opacity = 1;
    text.style.opacity = 1;
    text.getElementsByTagName("p")[0].innerHTML = "I'm trying to create my own engine, but so far I've only just managed to set up a video card, here's my github with some code";
    text.getElementsByTagName("p")[1].innerHTML = "Click on monitor to get to github";
    if (busy[0]) { moveCube(document.getElementById('c3'), 100, 50, 10, 2, 0);} else { bugbusy[0] = false; }
    if (busy[1]) { moveCube(document.getElementById('c4'), 70, 40, 10, 2, 1); } else { bugbusy[1] = false; }
    if (busy[2]) { moveCube(document.getElementById('c5'), 50, 30, 10, 2, 2); } else { bugbusy[2] = false; }
    if (busy[3]) { moveCube(document.getElementById('c6'), 30, 20, 10, 2, 3); } else { bugbusy[4] = false; }
}
t1.onmouseleave = function(e) {
    img1.style.animation = "fadeIn 1s";
    text.style.animation = "fadeIn 1s";
    img1.style.opacity = 0;
    text.style.opacity = 0;
    if (busy[0]) { moveCube(document.getElementById('c3'), -100, -50, 10, 2, 0); } else { bugbusy[0] = false; }
    if (busy[1]) { moveCube(document.getElementById('c4'), -70, -40, 10, 2, 1);  } else { bugbusy[1] = false; }
    if (busy[2]) { moveCube(document.getElementById('c5'), -50, -30, 10, 2, 2);  } else { bugbusy[2] = false; }
    if (busy[3]) { moveCube(document.getElementById('c6'), -30, -20, 10, 2, 3);  } else { bugbusy[3] = false; }
}
t1.onmousedown = function(e) {
    window.open("https://github.com/Tunaxx-New", '_blank').focus();
}

var t2 = document.getElementById("t2");
var img2 = document.getElementById("androidstudio");
t2.onmouseenter = function(e) {
    img2.style.animation = "fadeOut 1s";
    text.style.animation = "fadeOut 1s";
    img2.style.opacity = 1;
    text.style.opacity = 1;
    text.getElementsByTagName("p")[0].innerHTML = "I made my music player app, but I'm redoing it at the moment, because there are too many bugs";
    text.getElementsByTagName("p")[1].innerHTML = "Click on phone to get app from PlayMarket";
    if (busy[4]) { moveCube(document.getElementById('c11'), 0, -50, 10, 1, 4);} else { bugbusy[4] = false; }
    if (busy[5]) { moveCube(document.getElementById('c12'), 0, -40, 10, 1.2, 5); } else { bugbusy[5] = false; }
    if (busy[6]) { moveCube(document.getElementById('c13'), 0, -30, 10, 1.5, 6); } else { bugbusy[6] = false; }
    if (busy[7]) { moveCube(document.getElementById('c14'), 0, -20, 10, 2, 7); } else { bugbusy[7] = false; }
}
t2.onmouseleave = function(e) {
    img2.style.animation = "fadeIn 1s";
    text.style.animation = "fadeIn 1s";
    img2.style.opacity = 0;
    text.style.opacity = 0;
    if (busy[4]) { moveCube(document.getElementById('c11'), 0, 50, 10, 1, 4); } else { bugbusy[4] = false; }
    if (busy[5]) { moveCube(document.getElementById('c12'), 0, 40, 10, 1.2, 5);  } else { bugbusy[5] = false; }
    if (busy[6]) { moveCube(document.getElementById('c13'), 0, 30, 10, 1.5, 6);  } else { bugbusy[6] = false; }
    if (busy[7]) { moveCube(document.getElementById('c14'), 0, 20, 10, 2, 7);  } else { bugbusy[7] = false; }
}
t2.onmousedown = function(e) {
    window.open("https://play.google.com/store/apps/details?id=com.nik.nvp", '_blank').focus();
}

var t3 = document.getElementById("t3");
var img3 = document.getElementById("contest");
t3.onmouseenter = function(e) {
    img3.style.animation = "fadeOut 1s";
    text.style.animation = "fadeOut 1s";
    img3.style.opacity = 1;
    text.style.opacity = 1;
    text.getElementsByTagName("p")[0].innerHTML = "I solved 10 weeks of university contester on c++. Unfortunately, I could not win any olympiads ;(";
    text.getElementsByTagName("p")[1].innerHTML = "Click on poster 1 to get to contester profile";
    if (busy[8]) { moveCube(document.getElementById('c20'), 0, -50, 10, 1, 8);} else { bugbusy[8] = false; }
    if (busy[9]) { moveCube(document.getElementById('c21'), 0, -40, 10, 1.2, 9); } else { bugbusy[9] = false; }
    if (busy[10]) { moveCube(document.getElementById('c22'), 0, -30, 10, 1.5, 10); } else { bugbusy[10] = false; }
    if (busy[11]) { moveCube(document.getElementById('c23'), 0, -20, 10, 2, 11); } else { bugbusy[11] = false; }
}
t3.onmouseleave = function(e) {
    img3.style.animation = "fadeIn 1s";
    text.style.animation = "fadeIn 1s";
    img3.style.opacity = 0;
    text.style.opacity = 0;
    if (busy[8]) { moveCube(document.getElementById('c20'), 0, 50, 10, 1, 8); } else { bugbusy[8] = false; }
    if (busy[9]) { moveCube(document.getElementById('c21'), 0, 40, 10, 1.2, 9);  } else { bugbusy[9] = false; }
    if (busy[10]) { moveCube(document.getElementById('c22'), 0, 30, 10, 1.5, 10);  } else { bugbusy[10] = false; }
    if (busy[11]) {moveCube(document.getElementById('c23'), 0, 20, 10, 2, 11);  } else { bugbusy[11] = false; }
}
t3.onmousedown = function(e) {
    window.open("http://moodle.astanait.edu.kz:31008/en/user-uid-195?us=50&smt=d", '_blank').focus();
}

var t4 = document.getElementById("t4");
var img4 = document.getElementById("grades");
t4.onmouseenter = function(e) {
    img4.style.animation = "fadeOut 1s";
    text.style.animation = "fadeOut 1s";
    img4.style.opacity = 1;
    text.style.opacity = 1;
    text.getElementsByTagName("p")[0].innerHTML = "So far i have gpa >= 0.7 at university. I like math and programming, i am student of 1 course";
    text.getElementsByTagName("p")[1].innerHTML = "Click on poster 2 to get my Moodle profile";
    if (busy[12]) { moveCube(document.getElementById('c25'), -50, -2, 10, 1, 12);} else { bugbusy[12] = false; }
    if (busy[13]) { moveCube(document.getElementById('c26'), -40, -2, 10, 1.2, 13); } else { bugbusy[13] = false; }
    if (busy[14]) { moveCube(document.getElementById('c27'), -30, -2, 10, 1.5, 14); } else { bugbusy[14] = false; }
    if (busy[15]) { moveCube(document.getElementById('c28'), -20, -2, 10, 2, 15); } else { bugbusy[15] = false; }
}
t4.onmouseleave = function(e) {
    img4.style.animation = "fadeIn 1s";
    text.style.animation = "fadeIn 1s";
    img4.style.opacity = 0;
    text.style.opacity = 0;
    if (busy[12]) { moveCube(document.getElementById('c25'), 50, 2, 10, 1, 12); } else { bugbusy[12] = false; }
    if (busy[13]) { moveCube(document.getElementById('c26'), 40, 2, 10, 1.2, 13);  } else { bugbusy[13] = false; }
    if (busy[14]) { moveCube(document.getElementById('c27'), 30, 2, 10, 1.5, 14);  } else { bugbusy[14] = false; }
    if (busy[15]) { moveCube(document.getElementById('c28'), 20, 2, 10, 2, 15);  } else { bugbusy[15] = false; }
}
t4.onmousedown = function(e) {
    window.open("https://moodle.astanait.edu.kz/user/profile.php?id=3177", '_blank').focus();
}

window.onload = function() {
    createKeyBoard();
    var planes = document.getElementsByClassName("plane");
    var cubes = document.getElementsByClassName("cube");
    var scene = document.getElementsByClassName("scene");

    var light = document.getElementsByClassName("fa-lightbulb");
    var x = scene[0].clientWidth/2 + lights[0][0];
    var y = scene[0].clientHeight/2 + lights[0][1];

    w = scene[0].clientWidth/2;
    h = scene[0].clientHeight/2;

    if (x < 0) x = 0;
    if (y < 0) y = 0;
    light[0].style.setProperty("left", x + "px");
    light[0].style.setProperty("top", y + "px");
    mouseLight = light[0];



    //Appending lights
    for (var i = 0; i < lights.length - 1; i++) {
        var l = light[0].cloneNode();
        var x = lights[i][0];
        var y = lights[i][1];
        if (x < 0) x = 0;
        if (y < 0) y = 0;
        l.style.setProperty("left", x + "px");
        l.style.setProperty("top", y + "px");
        document.appendChild(l);
    }

    //Appending planes
    for (var i = 0; i < planeProps.length - 1; i++) {
        scene[0].appendChild(planes[0].cloneNode());
    }

    //Appending cubes
    var movablei = 0;
    for (var i = 0; i < cubeProps.length - 1; i++) {
        var newcube = cubes[0].cloneNode();
        newcube.id = "c" + (i + 2).toString();
        for (var j = 0; j < 6; j++) {
            newcube.appendChild(planes[0].cloneNode());
        }
        scene[1].appendChild(newcube);
    }
    Refresher();
    every100MS();

    //Animation Up & Down
    var cbs = document.getElementsByClassName("cube");
    for (var i = 0; i < cbs.length; i++) {
        const yFinish = cubeProps[i][1] + h;
        var faces = cbs[i].getElementsByClassName("plane");
        if (cubeProps[i][11]) {
            cbs[i].style.setProperty("--y", -1000 + 'px');
        } else {
            cbs[i].style.setProperty("--y", 2000 + 'px');
        }
        const anim = function frameCubeUp(i, finish) {
            var y = parseFloat(cbs[i].style.getPropertyValue("--y"));
            if (cubeProps[i][11]) {
                y += 40;
                if (y >= yFinish) {
                    cbs[i].style.setProperty("--y", yFinish + 'px');
                    clearInterval(id[i]);
                } else {
                    cbs[i].style.setProperty("--y", y + 'px');
                }
            } else {
                y -= 40;
                if (y <= yFinish) {
                    cbs[i].style.setProperty("--y", yFinish + 'px');
                    clearInterval(id[i]);
                } else {
                    cbs[i].style.setProperty("--y", y + 'px');
                }
            }
        }
        clearInterval(id[i]);
        id[i] = setInterval(anim.bind(null, i, yFinish), 1);
    }
};

window.onresize = function () {
    var scene = document.getElementsByClassName("scene");
    w = scene[0].clientWidth/2;
    h = scene[0].clientHeight/2;
    Refresher();
}

function changeMousePosition() {
    var e = window.event;
    var x = e.clientX;
    var y = e.clientY;
    lights[0][0] = x - w;
    lights[0][1] = y - h;
    mouseLight.style.setProperty("left", x + "px");
    mouseLight.style.setProperty("top", y + "px");
}

var colorSwitch = true;

const every100MS = () => {
    setTimeout(() => {
        let v = every100MS()
        smallRefresher()
        if (colorSwitch) {
            mouseColor = addColorh(mouseColor, 1);
        } else {
            mouseColor = subColorh(mouseColor, 1);
        }
        if (mouseColor == "#ffffff") {
            colorSwitch = false;
        }
        if (mouseColor == "#000000") {
            colorSwitch = true;
        }
    }, 1)
    return "end ms"
}

function Refresher() {
    var planes = document.getElementsByClassName("plane");
    var cubes = document.getElementsByClassName("cube");
    var scene = document.getElementsByClassName("scene");

    //Positioning triggers
    var t1 = document.getElementById("t1");
    t1.style.left = cubeProps[1][0] - cubeProps[1][6]/2 + w + "px";
    t1.style.top = cubeProps[1][1] - cubeProps[1][7]/2 + h + "px";
    t1.style.width = cubeProps[1][6] + 10 + "px";

    var t2 = document.getElementById("t2");
    t2.style.left = cubeProps[9][0] - cubeProps[9][6]/2 + 5 + w + "px";
    t2.style.top = cubeProps[9][1] - cubeProps[9][7]*4 + h + "px";
    t2.style.width = cubeProps[9][6] + 10 + "px";
    t2.style.height = cubeProps[9][7]*8 + "px";

    var t3 = document.getElementById("t3");
    t3.style.left = cubeProps[18][0] - cubeProps[18][6] + w + "px";
    t3.style.top = cubeProps[18][1] - cubeProps[18][7]*2 - 5 + h + "px";
    t3.style.width = cubeProps[18][6] + 30 + "px";
    t3.style.height = cubeProps[18][7]*9 + "px";

    var t4 = document.getElementById("t4");
    t4.style.left = cubeProps[23][0] - cubeProps[23][6]/2 + w + "px";
    t4.style.top = cubeProps[23][1] - cubeProps[23][7]*2 - 5 + h + "px";
    t4.style.width = cubeProps[23][6] + "px";
    t4.style.height = cubeProps[23][7]*20 + "px";

    for (var i = 0; i < planes.length - cubes.length*7; i++) {
        setProps(planes[i], i);
    }
    for (var i = 0; i < cubes.length; i++) {
        cubeSetProps(cubes[i], i);
    }
    for (var i = 0; i < lights.length; i++) {
        lights[i][0] += scene[0].clientWidth / 2;
        lights[i][1] += scene[0].clientHeight / 2;
    }

    var zIndexes = new Array(planes.length);
    for (var i = 0; i < planes.length; i++) {
        zIndexes[i] = i;
    }
    for (var i = 0; i < planes.length; i++) {
        for (var j = 0; j < planes.length - i - 1; j++) {
            if (parseFloat(planes[j].style.getPropertyValue("--z")) > parseFloat(planes[j + 1].style.getPropertyValue("--z"))) {
                zIndexes[j] = zIndexes.splice(j + 1, 1, zIndexes[j])[0];
            }
        }
    }
    for (var i = 0; i < planes.length; i++) {
        planes[i].style.setProperty("z-index", zIndexes[i]);
    }
    for (var i = 0; i < cubes.length; i++) {
        cubes[i].style.setProperty("z-index", cubeProps[i][10]);
    }
}

function smallRefresher() {
    var cubes = document.getElementsByClassName("cube");
    var scene = document.getElementsByClassName("scene");

    for (var i = 0; i < cubes.length; i++) {
        cube(cubes[i]);
    }
}

function cubeSetProps(e, index) {
    var planes = e.getElementsByClassName("plane");
    var scene = document.getElementsByClassName("scene");

    e.style.setProperty("--x", scene[0].clientWidth / 2 + cubeProps[index][0] + "px");
    e.style.setProperty("--y", scene[0].clientHeight / 2 + cubeProps[index][1] + "px");
    e.style.setProperty("--z", cubeProps[index][2] + "px");
    e.style.setProperty("--rx", cubeProps[index][3] + "deg");
    e.style.setProperty("--ry", cubeProps[index][4] + "deg");
    e.style.setProperty("--rz", cubeProps[index][5] + "deg");
    e.style.setProperty("--width", cubeProps[index][6] + "px");
    e.style.setProperty("--height", cubeProps[index][7] + "px");
    e.style.setProperty("--length", cubeProps[index][8] + "px");
    e.style.setProperty("--color", cubeProps[index][9]);
    for (var i = 0; i < planes.length; i++) {
        planes[i].style.setProperty("--x", 0 + "px");
        planes[i].style.setProperty("--y", 0 + "px");
        planes[i].style.setProperty("--z", 0 + "px");
        planes[i].style.setProperty("--rx", 0 + "deg");
        planes[i].style.setProperty("--ry", 0 + "deg");
        planes[i].style.setProperty("--rz", 0 + "deg");
        planes[i].style.setProperty("--color", e.style.getPropertyValue("--color"));
        planes[i].style.setProperty("--true-color", e.style.getPropertyValue("--color"));
    }
    e.style.setProperty("--color", "transparent");
    cube(e);
}

function setProps(e, index) {
    var scene = document.getElementsByClassName("scene");
    
    e.style.setProperty("--x", scene[0].clientWidth / 2 + planeProps[index][0] + "px");
    e.style.setProperty("--y", scene[0].clientHeight / 2 + planeProps[index][1] + "px");
    e.style.setProperty("--z", planeProps[index][2] + "px");
    e.style.setProperty("--rx", planeProps[index][3] + "deg");
    e.style.setProperty("--ry", planeProps[index][4] + "deg");
    e.style.setProperty("--rz", planeProps[index][5] + "deg");
    e.style.setProperty("--width", planeProps[index][6] + "px");
    e.style.setProperty("--height", planeProps[index][7] + "px");
    e.style.setProperty("--color", planeProps[index][8]);
}

//Cube - [x, y, z, Rotate: x, y, z, Scale: w, h, l, color, customZIndex(10)]
function createKeyBoard() {
    var board = cubeProps[cubeProps.length -1].slice();
    var fkey = board;
    board[0] = -board[6] + 15;
    board[1] = board[8] + 10;
    board[2] = -board[7];
    board[6] = 2;
    board[7] = 2;
    board[8] = 4;
    fkey[9] = addColor(fkey[9], 10, 10, 10);
    fkey[10] = 10;
    cubeProps.push(fkey);

    for (var j = 0; j < 3; j++) {
        for (var i = 2 + j*6; i < 6 + j*6; i++) {
            fkey = board.slice();
            fkey[0] += 5*i;
            fkey[1] -= 1.3*i;
            fkey[9] = addColor(fkey[9], 10, 10, 10);
            fkey[10] = 10;
            cubeProps.push(fkey);
        }
    }
    for (var i = 20; i < 23; i++) {
        fkey = board.slice();
        fkey[0] += 5*i;
        fkey[1] -= 1.25*i;
        fkey[9] = addColor(fkey[9], 10, 10, 10);
        fkey[10] = 10;
        cubeProps.push(fkey);
    }
}

function addColorh(color, h) {
    var cr = 0;
    var cg = 0;
    var cb = 0;
    cr += parseInt(color.substr(1, 2), 16);
    cg += parseInt(color.substr(3, 2), 16);
    cb += parseInt(color.substr(5, 2), 16);
    
    cr += h; 
    if (cr > 255) { 
        cg += cr - 255;
        if (cg > 255) {
            cb += cg - 255;
            if (cb > 255) cb = 255;
            cg = 255;
        } 
        cr = 255;
    };

    var rs = cr.toString(16);
    var gs = cg.toString(16);
    var bs = cb.toString(16);
    if (cr < 16) rs = '0' + cr.toString(16);
    if (cg < 16) gs = '0' + cg.toString(16);
    if (cb < 16) bs = '0' + cb.toString(16);
    return '#' + rs + gs + bs;
}
function subColorh(color, h) {
    var cr = 0;
    var cg = 0;
    var cb = 0;
    cr += parseInt(color.substr(1, 2), 16);
    cg += parseInt(color.substr(3, 2), 16);
    cb += parseInt(color.substr(5, 2), 16);
    
    cr -= h; 
    if (cr < 0) { 
        cg -= -cr;
        if (cg < 0) {
            cb -= -cg;
            if (cb < 0) cb = 0;
            cg = 0;
        } 
        cr = 0;
    };

    var rs = cr.toString(16);
    var gs = cg.toString(16);
    var bs = cb.toString(16);
    if (cr < 16) rs = '0' + cr.toString(16);
    if (cg < 16) gs = '0' + cg.toString(16);
    if (cb < 16) bs = '0' + cb.toString(16);
    return '#' + rs + gs + bs;
}

function addColor(color, r, g, b) {
    var cr = 0;
    var cg = 0;
    var cb = 0;
    cr += parseInt(color.substr(1, 2), 16);
    cg += parseInt(color.substr(3, 2), 16);
    cb += parseInt(color.substr(5, 2), 16);
    
    cr += r; if (cr < 0) cr = 0; if (cr > 255) cr = 255;
    cg += g; if (cg < 0) cg = 0; if (cg > 255) cg = 255;
    cb += b; if (cb < 0) cb = 0; if (cb > 255) cb = 255;

    var rs = cr.toString(16);
    var gs = cg.toString(16);
    var bs = cb.toString(16);
    if (cr < 16) rs = '0' + cr.toString(16);
    if (cg < 16) gs = '0' + cg.toString(16);
    if (cb < 16) bs = '0' + cb.toString(16);
    return '#' + rs + gs + bs;
}

//Functions to draw----------------------------------------------------------------------------------------
function cube(e) {
    var planes = e.getElementsByClassName("plane");

    //Setting faces' width and height
    planes[0].style.setProperty("--width", parseInt(e.style.getPropertyValue("--length")) + "px");
    planes[0].style.setProperty("--height", parseInt(e.style.getPropertyValue("--height")) + "px");
    planes[1].style.setProperty("--width", parseInt(e.style.getPropertyValue("--length")) + "px");
    planes[1].style.setProperty("--height", parseInt(e.style.getPropertyValue("--height")) + "px");
    planes[2].style.setProperty("--width", parseInt(e.style.getPropertyValue("--width")) + "px");
    planes[2].style.setProperty("--height", parseInt(e.style.getPropertyValue("--height")) + "px");
    planes[3].style.setProperty("--width", parseInt(e.style.getPropertyValue("--width")) + "px");
    planes[3].style.setProperty("--height", parseInt(e.style.getPropertyValue("--length")) + "px");
    planes[4].style.setProperty("--width", parseInt(e.style.getPropertyValue("--width")) + "px");
    planes[4].style.setProperty("--height", parseInt(e.style.getPropertyValue("--length")) + "px");
    planes[5].style.setProperty("--width", parseInt(e.style.getPropertyValue("--width")) + "px");
    planes[5].style.setProperty("--height", parseInt(e.style.getPropertyValue("--height")) + "px");

    //Positions faces in one dot axis
    for (var i = 0; i < planes.length; i++) { 
        planes[i].style.setProperty("--x", -parseInt(planes[i].style.getPropertyValue("--width"))/2 + "px");
        planes[i].style.setProperty("--y", -parseInt(planes[i].style.getPropertyValue("--height"))/2 + "px");
    }

    //Rotating faces
    planes[0].style.setProperty("--ry", "90deg");
    planes[1].style.setProperty("--ry", "-90deg");
    planes[3].style.setProperty("--rx", "90deg");
    planes[4].style.setProperty("--rx", "-90deg");

    //Changing X in faces
    planes[0].style.setProperty("--x", parseInt(planes[0].style.getPropertyValue("--x")) - parseInt(e.style.getPropertyValue("--width"))/2 + "px");
    planes[1].style.setProperty("--x", parseInt(planes[1].style.getPropertyValue("--x")) + parseInt(e.style.getPropertyValue("--width"))/2 + "px");

    //Changing Y in faces
    planes[3].style.setProperty("--y", parseInt(planes[3].style.getPropertyValue("--y")) - parseInt(e.style.getPropertyValue("--height"))/2 + "px");
    planes[4].style.setProperty("--y", parseInt(planes[4].style.getPropertyValue("--y")) + parseInt(e.style.getPropertyValue("--height"))/2 + "px");

    //Changing Z in faces
    planes[0].style.setProperty("--z", -parseInt(e.style.getPropertyValue("--length"))/2 + "px");
    planes[1].style.setProperty("--z", -parseInt(e.style.getPropertyValue("--length"))/2 + "px");
    planes[2].style.setProperty("--z", -parseInt(e.style.getPropertyValue("--length")) + "px");
    planes[3].style.setProperty("--z", -parseInt(e.style.getPropertyValue("--length"))/2 + "px");
    planes[4].style.setProperty("--z", -parseInt(e.style.getPropertyValue("--length"))/2 + "px");

    var notfindDark = true;

    for (var i = 0; i < planes.length; i++) {
        var lightColors = new Array(lights.length + 2);
        var intensities = new Array(lights.length + 2);
        for (var j = 0; j < lights.length; j++) {
            var normalMain = [0, 0, 1];
            var coords = [
                parseFloat(e.style.getPropertyValue("--rx")),
                parseFloat(e.style.getPropertyValue("--ry")),
                parseFloat(e.style.getPropertyValue("--rz"))
            ];
            for (var z = 0; z < 3; z++) {
                coords[z] *= Math.PI / 180;
            }
            normalMain = rotateVector(normalMain, coords[0], coords[1], coords[2]);
            var angles = [
                parseFloat(planes[i].style.getPropertyValue("--rx")),
                parseFloat(planes[i].style.getPropertyValue("--ry")),
                parseFloat(planes[i].style.getPropertyValue("--rz"))
            ];

            for (var z = 0; z < 3; z++) {
                angles[z] *= Math.PI / 180;
            }
            coords = rotateVector(normalMain, angles[0], angles[1], angles[2]);

            var plen = len(coords);
            var llen = len(lights[j]);

            var poses = [
                parseFloat(planes[i].style.getPropertyValue("--x")) + parseFloat(e.style.getPropertyValue("--x")) - w,
                parseFloat(planes[i].style.getPropertyValue("--y")) + parseFloat(e.style.getPropertyValue("--y")) - h,
                parseFloat(planes[i].style.getPropertyValue("--z")) + parseFloat(e.style.getPropertyValue("--z"))
            ];
            var rv = new Array(3);
            for (var k = 0; k < 3; k++) {
                rv[k] = poses[k] - lights[j][k];
            }
            var r = mouseInten/len(rv);

            if (r > 1) r = 1;
            var dotprod = coords[0]*lights[j][0] + coords[1]*lights[j][1] + coords[2]*lights[j][2];

            var cros = plen*llen;
            var rcos;
            if (cros != 0) {
                rcos = dotprod / cros;
            } else {
                rcos = 0;
            }
            if (extraLight) {
                if (rcos < 0) {
                    for (var k = 0; k < lightColors.length; k++) {
                        lightColors[k] = "#000000";
                        intensities[k] = extraInten;
                        notfindDark = false;
                    }
                    break;
                }
            }

            rcos++;
            rcos /= 2;
            rcos *= lights[j][4];
            lightColors[lightColors.length - 1] = mouseColor;
            intensities[intensities.length - 1] = r;
            rcos = (rcos*0.1 + r*0.9) / 2;
            lightColors[j] = lights[j][3];
            intensities[j] = rcos;
        }
        if (notfindDark) {
            lightColors[lights.length] = planes[i].style.getPropertyValue("--true-color");
            intensities[lights.length] = 1;
        } else {
            lightColors[lights.length] = "#000000";
            intensities[lights.length] = 1;
        }
        var color = mixColor(lightColors, intensities);
        planes[i].style.setProperty("--color", color);
    }
}

function len(v) {
    return Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2) + Math.pow(v[2], 2));
}

function mixColor(colors, intensities) {
    var r = 0;
    var g = 0;
    var b = 0;
    for (var i = 0; i < colors.length; i++) {
        r += parseInt(colors[i].substr(1, 2), 16) * intensities[i];
        g += parseInt(colors[i].substr(3, 2), 16) * intensities[i];
        b += parseInt(colors[i].substr(5, 2), 16) * intensities[i];
    }
    r /= colors.length;
    g /= colors.length;
    b /= colors.length;
    r = parseInt(r);
    g = parseInt(g);
    b = parseInt(b);
    var rs = r.toString(16);
    var gs = g.toString(16);
    var bs = b.toString(16);
    if (r < 16) rs = '0' + r.toString(16);
    if (g < 16) gs = '0' + g.toString(16);
    if (b < 16) bs = '0' + b.toString(16);

    return '#' + rs + gs + bs;
}

function rotateVector(v, rx, ry, rz) {
    var matrixX = [
        [1, 0, 0],
        [0, Math.cos(rx), -Math.sin(rx)],
        [0, Math.sin(rx), Math.cos(rx)]
    ];
    var matrixY = [
        [Math.cos(ry), 0, Math.sin(ry)],
        [0, 1, 0],
        [-Math.sin(ry), 0, Math.cos(ry)]
    ];
    var matrixZ = [
        [Math.cos(rz), -Math.sin(rz), 0],
        [Math.sin(rz), Math.cos(rz), 0],
        [0, 0, 1]
    ];
    var vec = vXMatrix(matrixX, v);
    vec = vXMatrix(matrixY, vec);
    vec = vXMatrix(matrixZ, vec);
    return vec;
}
function vXMatrix(matrix, v) {
    var vec = v;
    for (var i = 0; i < 3; i++) {
        var sum = 0;
        for (var j = 0; j < 3; j++) {
            sum += matrix[i][j] * vec[j];
        }
        vec[i] = sum;
    }
    return vec;
}
//---------------------------------------------------------------------------------------------------------