const approx = 0;
var currentObject = null;
var lights = [
    [10, 10, 10, "#000000", 0.5]
]

/*
$(document).ready(function() {
    $(this).on("click", function(e) {
        var x = e.pageX;
        var y = e.pageY;
        var console = document.getElementById("console");
        console.style.top = y + "px";
        console.style.left = x + "px";
    })
})
*/

function placeConsole(e) {
    currentObject = e;
    e.addEventListener('mousedown', function(event) {
        var x = event.clientX;
        var y = event.clientY;
        var cons = document.getElementById("console");
        var inputX = document.getElementById("x");
        var inputY = document.getElementById("y");
        var inputZ = document.getElementById("z");
        const computedStyle = window.getComputedStyle(e);
        var scene = document.getElementsByClassName("scene");

        inputX.value = parseInt(parseFloat(window.getComputedStyle(e).getPropertyValue('--x')) - parseFloat(scene[0].clientWidth / 2));
        inputY.value = parseInt(parseFloat(window.getComputedStyle(e).getPropertyValue('--y')) - parseFloat(scene[0].clientHeight / 2));
        inputZ.value = parseInt(parseFloat(window.getComputedStyle(e).getPropertyValue('--z')));

        cons.style.top = y + "px";
        cons.style.left = x + "px";
    })
}

function cube(e, first) {
    var planes = e.getElementsByClassName("plane");
    var scene = document.getElementsByClassName("scene");

    if (first) {
        e.style.setProperty("--x", parseFloat(e.style.getPropertyValue("--x")) + scene[0].clientWidth / 2);
        e.style.setProperty("--y", parseFloat(e.style.getPropertyValue("--y")) + scene[0].clientHeight / 2);
        e.style.setProperty("--color", "#888888");
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

        //For tests---------------------------------
        e.style.setProperty("--x", scene[0].clientWidth / 2 + "px");
        e.style.setProperty("--y", scene[0].clientHeight / 2 + "px");
        e.style.setProperty("--z", 0 + "px");
        e.style.setProperty("--width", 100 + "px");
        e.style.setProperty("--height", 100 + "px");
        e.style.setProperty("--length", 100 + "px");
        //-------------------------------------------

        e.style.setProperty("--rx", 0 + "deg");
        e.style.setProperty("--ry", 0 + "deg");
        e.style.setProperty("--rz", 0 + "deg");
        e.style.setProperty("--color", "transparent");
    }

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

    for (var i = 0; i < planes.length; i++) {
        var lightness = 1;
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

            var plen = Math.sqrt(Math.pow(coords[0], 2) + Math.pow(coords[1], 2) + Math.pow(coords[2], 2));
            var llen = Math.sqrt(Math.pow(lights[j][0], 2) + Math.pow(lights[j][1], 2) + Math.pow(lights[j][2], 2));
            var dotprod = coords[0]*lights[j][0] + coords[1]*lights[j][1] + coords[2]*lights[j][2];
            var rcos = dotprod / (plen*llen);
            rcos *= lights[j][4];
            lightness *= rcos;
        }
        lightness++;
        var color = planes[i].style.getPropertyValue("--true-color");
        var num = lightness / 2;
        var r = parseInt(parseInt(color.substr(1, 2), 16) * num);
        var g = parseInt(parseInt(color.substr(3, 2), 16) * num);
        var b = parseInt(parseInt(color.substr(5, 2), 16) * num);
        planes[i].style.setProperty("--color", '#' + r.toString() + g.toString() + b.toString());
    }
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

function refreshCube() {
    if (currentObject.id[0] == 'c') {
        cube(currentObject, false);
    }
}

function closeConsole(e) {
    e.addEventListener('mousedown', function(e) {
        var cons = document.getElementById("console");
        cons.style.top = -1000 + "px";
        cons.style.left = -1000 + "px";
    })
}

window.onload = function(e){
    cube(document.getElementById("c1"), true);
}

document.getElementById("x").addEventListener("change", function(e) {
    var scene = document.getElementsByClassName("scene");
    currentObject.style.setProperty("--x", parseFloat(scene[0].clientWidth / 2) + parseFloat(document.getElementById("x").value) + "px");
    refreshCube();
})
document.getElementById("y").addEventListener("change", function(e) {
    var scene = document.getElementsByClassName("scene");
    currentObject.style.setProperty("--y", parseFloat(scene[0].clientHeight / 2) + parseFloat(document.getElementById("y").value) + "px");
    refreshCube();
})
document.getElementById("z").addEventListener("change", function(e) {
    currentObject.style.setProperty("--z", document.getElementById("z").value + "px");
    refreshCube();
})

document.getElementById("rx").addEventListener("change", function(e) {
    currentObject.style.setProperty("--rx", document.getElementById("rx").value + "deg");
    refreshCube();
})
document.getElementById("ry").addEventListener("change", function(e) {
    currentObject.style.setProperty("--ry", document.getElementById("ry").value + "deg");
    refreshCube();
})
document.getElementById("rz").addEventListener("change", function(e) {
    currentObject.style.setProperty("--rz", document.getElementById("rz").value + "deg");
    refreshCube();
})

document.getElementById("w").addEventListener("change", function(e) {
    currentObject.style.setProperty("--width", document.getElementById("w").value + "px");
    refreshCube();
})
document.getElementById("h").addEventListener("change", function(e) {
    currentObject.style.setProperty("--height", document.getElementById("h").value + "px");
    refreshCube();
})

document.getElementById("l").addEventListener("change", function(e) {
    currentObject.style.setProperty("--length", document.getElementById("l").value + "px");
    refreshCube();
})