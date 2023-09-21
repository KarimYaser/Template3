// import express from "express";
// const e = express();
// require('lspconfig').tsserver.setup({
//     init_options: {
//         preferences: {
//             disableSuggestions: true,
//         },
//     },
// })
// import express from 'express';

// const e = require("express");

// const e = express();
// module = "script type";
// const settings = require("./settings.json");


// Check if there is Local Storage Color Option

// Handle Active State
function handleActive(e) {
    //Remove Class From All Children
    e.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    //Add Class Actie On Self
    e.target.classList.add("active");
}



let maincolors = localStorage.getItem("color_option");


if (maincolors !== null) {
    // console.log("local Storage Is Not Empty You Can Set It On Root Now");
    // console.log(localStorage.getItem("color_option"));

    document.documentElement.style.setProperty('--main--color', localStorage.getItem("color_option"));

    // Remove Active Class From All Colors List Item
    document.querySelectorAll(".colors-list li").forEach(element => {

        element.classList.remove("active");



        //Add Active Class On Element With Data-color ===Local Storage O=Item
        if (element.dataset.color === maincolors) {
            //Add Active Class
            element.classList.add("active");
        }

    });
}
//Random Background option
let backgroundOption = true;

//Variable To Control The Interval
let backgroundInterval;

// Check if there is local storage random Background Item
let backgroundlocalitem = localStorage.getItem("background-option");

// // Check if there is local storage random Background is not empty
if (backgroundlocalitem !== null) {

    if (backgroundlocalitem === 'true') {
        backgroundOption = true;
    } else {
        backgroundOption = false;
    }
    //Remove Active Class Form All Spans
    document.querySelectorAll(".option-box span").forEach(element => {
        element.classList.remove("active");
    });

    if (backgroundlocalitem === 'true') {
        document.querySelector(".option-box .yes").classList.add("active")
    } else {
        document.querySelector(".option-box .no").classList.add("active")

    }

}
// Switch Random Backgrounds option
const randombackel = document.querySelectorAll(".option-box span");

// console.log(colorsli);

// Loop on All Spans
randombackel.forEach(span => {

    // Loop on Every Span
    span.addEventListener("click", (e) => {
        // console.log(e.target.dataset.color);

        // Remove Active Class From All Children
        e.target.parentElement.querySelectorAll(".active").forEach(element => {

            element.classList.remove("active");

        });
        // Add Active Class on Self
        e.target.classList.add("active");
        if (e.target.dataset.background === "yes") {
            // console.log("Yes");
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("background-option", true);

        } else {
            // console.log("No");
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background-option", false);

        }
    });

});

//Toggle Spin Class On Icon
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
    // Toggle Class Fa-Spin For Rotaion on Self
    this.classList.toggle("fa-spin");
    // Toggle Class open on Main Settings Box
    document.querySelector(".settings-box").classList.toggle("open");
};

// Switch Colors
const colorsli = document.querySelectorAll(".colors-list li");

// console.log(colorsli);

// Loop on All List Items
colorsli.forEach(li => {

    // Loop on Every List Items
    li.addEventListener("click", (e) => {
        // console.log(e.target.dataset.color);

        //Set Color On Root
        document.documentElement.style.setProperty('--main--color', e.target.dataset.color);

        //Set Color On Local Storage
        localStorage.setItem("color_option", e.target.dataset.color);

        // Remove Active Class From All Children
        e.target.parentElement.querySelectorAll(".active").forEach(element => {

            element.classList.remove("active");


            // Add Active Class on Self
            e.target.classList.add("active");


        });

    });
});



// Select Landing Page Element
let landingpage = document.querySelector(".landing-page");

// Get Array of Imgs
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];


//Function To Randomize Imgs
function randomizeImgs() {
    if (backgroundOption === true) {

        backgroundInterval = setInterval(() => {
            //Get Random Number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            // console.log(randomNumber);
            // Change Background Image Url
            landingpage.style.backgroundImage = 'url("imgs/' + imgsArray[randomNumber] + '")';
        }, 10000)
    }
}
randomizeImgs();

// Select Skills Selector
let ourskills = document.querySelector(".skills");
window.onscroll = function () {
    // Skills Offset Top
    let skillsoffsettop = ourskills.offsetTop;

    //Skills Outer Height
    let skillsouterheight = ourskills.offsetHeight;

    // window Height
    let windoheight = this.innerHeight;

    //window Scroll Top

    let windoscrolltop = this.pageYOffset;

    if (windoscrolltop > (skillsoffsettop + skillsouterheight - windoheight)) {

        let allskills = document.querySelectorAll(".skill-box .skill-progress span");

        allskills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });

    }
}

//Create Popup with The Image
let ourgallery = document.querySelectorAll(".gallery img");

ourgallery.forEach(img => {

    img.addEventListener('click', (e) => {

        //Create Overlay Element
        let overlay = document.createElement("div");

        //Add Class To Overlay
        overlay.className = "popup-overlay";

        //Append Overlay To the Body
        document.body.appendChild(overlay);

        //Create The Popup
        let popupbox = document.createElement("div");

        // Add Class To the popup Box
        popupbox.className = 'popup-box';

        if (img.alt !== null) {
            // Create Heading
            let imgheading = document.createElement("h3");

            //Create Text For Heading 
            let imgText = document.createTextNode(img.alt);

            // Append To the heading
            imgheading.appendChild(imgText);

            // Append the Heading To The Popup Box
            popupbox.appendChild(imgheading);


        }

        // Create the image
        let popupimage = document.createElement("img");

        // Set image Source
        popupimage.src = img.src;

        // Add Image To Popup Box
        popupbox.appendChild(popupimage);

        // Add Image the Popup Box to the body
        document.body.appendChild(popupbox);

        // Create The Close Span
        let closebutton = document.createElement("span");

        // Craete The Close Button Text
        let closebuttontext = document.createTextNode("X");

        // Append Text To The Close Button
        closebutton.appendChild(closebuttontext);

        // Add Class To Close Button
        closebutton.className = 'close-button';

        // Add Close ButtonTo The popup Box
        popupbox.appendChild(closebutton);


    });

});

// Close Popup
document.addEventListener("click", function (e) {
    if (e.target.className == "close-button") {

        // remove The Current Popup
        e.target.parentNode.remove();

        // REmove Overlay
        document.querySelector(".popup-overlay").remove();

    }
})

// Select All Bullets
const allbullets = document.querySelectorAll(".nav-bullets .bullet");

allbullets.forEach(bullet => {
    bullet.addEventListener("click", (e) => {

        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: "smooth"
        });

    });
});

// Select All Links
const alllinks = document.querySelectorAll(".links a");

alllinks.forEach(bullet => {
    bullet.addEventListener("click", (e) => {
        e.preventDefault();

        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: "smooth"
        });

    });
});
// document.querySelector(".bullets-option .yes").classList.add("active");

let bulletsspan = document.querySelectorAll(".bullets-option span");

let bulletscontainer = document.querySelector(".nav-bullets");

let bulletlocalitem = localStorage.getItem("bullets-option");

if (bulletlocalitem !== null) {
    bulletsspan.forEach(span => {
        span.classList.remove("active");
        // console.log("Not Empty");

    });

    if (bulletlocalitem === 'block') {

        bulletscontainer.style.display = 'block';
        document.querySelector(".bullets-option .yes").classList.add("active");

    } else {

        bulletscontainer.style.display = 'none';
        document.querySelector(".bullets-option .no").classList.add("active");

    }


}

bulletsspan.forEach(span => {
    span.addEventListener("click", (e) => {

        if (span.dataset.display === 'block') {

            bulletscontainer.style.display = 'block';
            // document.querySelector(".bullets-option .yes").classList.add("active");

            localStorage.setItem("bullets-option", 'block');

        } else {

            bulletscontainer.style.display = 'none';
            localStorage.setItem("bullets-option", 'none');

        }
        handleActive(e);

    });
});

// //Reset Button
document.querySelector(".reset-options").onclick = function () {

    localStorage.clear();
    // localStorage.removeItem("Bullets-option");
    // localStorage.removeItem("color-option");
    // localStorage.removeItem("background-option");

    //Reload Window
    window.location.reload();
};

// Toggle Menu
let togglebtn = document.querySelector(".toggle-menu");
let tlinks = document.querySelector(".links");
togglebtn.onclick = function () {
    // Stop Propagation
    // e.stopPropagation();

    // Toggle Class "menu-active" On Button
    this.classList.toggle("menu-active");

    // Toggle Class "open" on Links
    tlinks.classList.toggle("open");
};

// Click AnyWhere Outside Menu And Toggle Button
document.addEventListener("click", (e) => {
    // console.log(e.target);
    if (e.target !== togglebtn && e.target !== tlinks) {
        // console.log("This Is not The Button");

        // Check if Menu is Open
        if (tlinks.classList.contains("open")) {
            // Toggle Class "menu-active" On Button
            togglebtn.classList.toggle("menu-active");

            // Toggle Class "open" on Links
            tlinks.classList.toggle("open");
        }
    }
});


tlinks.onclick = function (e) {
    e.stopPropagation();
}