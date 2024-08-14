const displayDistance = 100 // distance in px to display another photo
const nDisplay = 8 // number of pictures to display at once

const images = document.getElementsByClassName("image")

let globalIndex = 0 // used to count up the images
let lastMousePosition = {x: 0, y: 0} // used to get the last mouse position

// function to activate photos
function activatePic(img, x, y){
    // Reset the scale of all images
    for (let i = 0; i < images.length; i++) {
        images[i].style.transform = "translate(-50%, -50%) scale(0.3)";
    }
    
    // Activate the current image and scale it up
    img.dataset.status = "active";
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
    img.style.zIndex = globalIndex; // otherwise the last pic will always be at the top
    img.style.transform = "translate(-50%, -50%) scale(1.25)"; // Scale up the active image
    lastMousePosition = {x: x, y: y}; // update the last mouse position
}

// compute mouse distance 
function mouseDistance(x, y){
    return Math.hypot(x - lastMousePosition.x, y - lastMousePosition.y)
}

// onmousemove 
window.onmousemove = e => {
    if (mouseDistance(e.clientX, e.clientY) > displayDistance){
        let activePic = images[globalIndex % images.length];
        let inactivePic = images[(globalIndex - nDisplay) % images.length];

        activatePic(activePic, e.clientX, e.clientY);
        if (inactivePic){
            inactivePic.dataset.status = "inactive";
        }

        globalIndex++;
    }
}