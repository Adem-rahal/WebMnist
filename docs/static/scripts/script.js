let content = document.getElementById("content");
let digits = [];

for(let i = 0; i < 10; i++) {
    let digit = {
        container: document.createElement("div"),
        content: {
            bar: document.createElement("div"),
            label: document.createElement("div"),
        }
    }

    digit.container.id = i;
    digit.content.bar.id = "bar_" + i;
    digit.content.label.id = "label_" + i;

    digit.content.bar.classList.add("bar");
    digit.content.label.classList.add("label");

    content.appendChild(digit.container);
    digit.container.appendChild(digit.content.bar);
    digit.container.appendChild(digit.content.label);

    digit.content.label.innerHTML = i;

    digits.push(digit);
}


let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");
let rect = cvs.getBoundingClientRect();

let paint_color = "#ffffffff";
let clear_color = "#000000ff";
let stroke_size = 20;

let clear_cvs = () => {
    ctx.fillStyle = clear_color;
    ctx.fillRect(0, 0, cvs.width, cvs.height);
};
clear_cvs();

cvs.addEventListener("mousemove", e => {
    let new_pos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    
    if(painting) {
        ctx.beginPath();
        ctx.strokeStyle = paint_color;
        ctx.lineJoin = ctx.lineCap = "round";
        ctx.lineWidth = stroke_size;
        ctx.moveTo(new_pos.x, new_pos.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        ctx.closePath();
    }

    pos = new_pos;
});

cvs.addEventListener("mousedown", () => { painting = true; clear_cvs(); });
cvs.addEventListener("mouseup",   () => { painting = false; infer(); });
cvs.addEventListener("mouseout",  () => { painting = false; });

// let model;
// (async function () {
//     model = await tf.loadGraphModel("static/lenet5/model.json");
// })();

//classifier.js
var model;
var predResult = document.getElementById("result");

async function initialize() {
    model = await tf.loadLayersModel("static/lenet5/model.json");
}

async function predict(ctx) {
    let image = ctx 
    let tensorImg =   
    tf.browser.fromPixels(image).resizeNearestNeighbor(
        [28, 28]).toFloat().expandDims();

    prediction = await model.predict(tensorImg).data();
    let y = await tf.argMax(prediction[0]);
    return y
}

initialize();

