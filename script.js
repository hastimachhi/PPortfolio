//------------------------------------- Time ----------------------------------------------
let time = document.getElementById("left-end-time");

setInterval( () => {
  let date = new Date();
  time.innerHTML = date.toLocaleTimeString();
},1000)

//------------------------------------- Locomotive Scroll ----------------------------------------------
function loco(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}
loco()


//------------------------------------- Word Apperance ----------------------------------------------
var clutter = "";

document.querySelector(".about-right-content>p").textContent.split("").forEach(function(dets){
    clutter += `<span>${dets}</span>`

    document.querySelector(".about-right-content>p").innerHTML = clutter;
})

gsap.to(".about-right-content>p>span",{
    scrollTrigger:{
        trigger:`.about-right-content>p>span`,
        start:`top bottom`,
        end:`bottom top`,
        scroller:`#main`,
        scrub:.5,
    },
    stagger:.2,
    color:`#000`
})

//------------------------------------- MouseMove Effect About Me ----------------------------------------------

document.addEventListener("mousemove", parallax);

function parallax (e) {
    document.querySelectorAll(".aboutme-button").forEach(function(move){
        var moving_value = move.getAttribute("data-value");
        var x = (e.clientX * moving_value)/100;
        var y = (e.clientY * moving_value)/100;

        move.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";
    }); 
}

//------------------------------------- MouseMove Effect Project ----------------------------------------------

document.addEventListener("mousemove", parallax1);

function parallax1 (e) {
    document.querySelectorAll(".work-title").forEach(function(move){
        var moving_value = move.getAttribute("data-value");
        var x = (e.clientX * moving_value)/100;
        var y = (e.clientY * moving_value)/100;

        move.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";
    }); 
}

//------------------------------------- Testimonail Slider ----------------------------------------------

const swiper = new Swiper('.js-testimonials-slider', {
  grabCursor: true,
  spaceBetween: 30,
  breakpoints: {
    767:{
      slidesPerView: 3
    }
  }
});