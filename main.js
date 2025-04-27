// let myWindow = document.getElementById("window-title")
let geditWindow = null
// let closeBtn = document.getElementsByClassName("close")[0];
let minBtn = document.getElementsByClassName("minimise")[0];
let maxBtn = document.getElementsByClassName("maximise")[0];
let geditIcon = document.getElementsByClassName("gedit-icon");
let maximised = false;
let previousWindowPosition = { x: 0, y: 0 };


function dragWindow(e) {
    // margin is a string that returns "30px"
    let myWindow = document.getElementById("window");
    let margin = Number(window.getComputedStyle(myWindow)
        .getPropertyValue("margin-top").replace("px", ""));
    e = e || window.event;
    e.preventDefault();
    // console.log(myWindow)
    // console.log(e)
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    // Need to be careful and add -30px offset due to window size
    myWindow.style.top = (myWindow.offsetTop - pos2) - margin + "px";
    // myWindow.style.top = (myWindow.offsetTop - pos2) - margin + "px";
    myWindow.style.left = (myWindow.offsetLeft - pos1) + "px";
    myWindow.style.position = "absolute"
    myWindow.dataset.position = "absolute"
}

function closeDragElement(e) {
    // stop moving when mouse button is released:
    document.onpointerup = null;
    document.onpointermove = null;
}


function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onpointerup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onpointermove = dragWindow;
}

function updateTime() {
    let clock = document.getElementById("clock")
    clock.innerHTML = new Intl.DateTimeFormat("en-GB", {
        dateStyle: "short",
        timeStyle: "medium",
    }).format(new Date()).replace(",", "<br>");
}

// updateTime()
setInterval(updateTime, 1000);

// Adding an event listener via js
// closeBtn.addEventListener("click", e => {
//     res = e.target.closest("#window");
//     geditWindow = res;
//     res.remove();
// });

// NOTE: Event listener's added via the onClick attribute in HTML are persistent!
closeBtn = (e) => {
    res = e.target.closest("#window");
    geditWindow = res;
    res.remove();
};

// Add an event listener via js to the maximise window function
maximiseBtn = (e) => {
    currGeditWindow = document.getElementById("window");
    if (!maximised) {
        taskbarTop = document.getElementById("taskbar");
        taskbarBottom = document.getElementById("taskbar-bottom");
        taskbarTopHeight = getComputedStyle(taskbarTop).height
        taskbarBottomHeight = getComputedStyle(taskbarBottom).height
        previousWindowPosition.x = currGeditWindow.style.left;
        previousWindowPosition.y = currGeditWindow.style.top;
        currGeditWindow.style.height = `calc(100vh - ${taskbarBottomHeight} - ${taskbarTopHeight} - 5px)`;
        currGeditWindow.style.width = "100%";
        currGeditWindow.style.top = "0px";
        currGeditWindow.style.left = "0px";

    }
    else {
        currGeditWindow.style.height = "calc(100vh - 5vh - 100px)";
        currGeditWindow.style.width = "650px";
        currGeditWindow.style.left = previousWindowPosition.x;
        currGeditWindow.style.top = previousWindowPosition.y;
    }
    maximised = !maximised;
};

reopenGedit = (e) => {
    if (e.target.closest(".gedit-icon") && geditWindow != null) {
        res = document.getElementsByClassName("root")[0];
        //   allow only 1 geditWindow
        res.insertAdjacentHTML("afterBegin", geditWindow.outerHTML);
        document.getElementsByClassName("minimise")[0].addEventListener("click", closeBtn);
        document.getElementsByClassName("maximise")[0].addEventListener("click", maximiseBtn);
        geditWindow = null;
    }
};
minBtn.addEventListener("click", closeBtn);
maxBtn.addEventListener("click", maximiseBtn);


// document.addEventListener("click", (e) => {
//     if (e.target.closest(".gedit-icon") && geditWindow != null) {
//         res = document.getElementsByClassName("root")[0];
//         // Only allow 1 geditWindow
//         res.insertAdjacentHTML("afterBegin", geditWindow.outerHTML);
//         geditWindow = null
//     }
// });

