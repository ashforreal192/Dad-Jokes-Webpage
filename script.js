// const scroll = new LocomotiveScroll({
//     el: document.querySelector('#main'),
//     smooth: true
//   });

function loco(){
    gsap.registerPlugin(ScrollTrigger);
    
    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
    
    // tell ScrollTrigger to use these proxy methods for the "body" element since Locomotive Scroll is hijacking things
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





gsap.to("#page2 h1", {
    transform: "translateX(-180%)",
    // color: "#e5989b",
    fontSize: "20vw",
    // fontWeight:"500",
    // ease: "power1.inOut",
    scrollTrigger:{
        trigger: "#page2",
        scroller: "#main",
        // markers: true,
        start: "top 0",
        end: "top -500%",
        scrub: 2,
        pin: true,
        ease: "power1.inOut",
    }
})



// const button = document.querySelector("button")

const addNewJoke = async () => {
    const jokeText = await getDadJoke()
    // console.log(jokeText)

    // const newJoke = document.querySelector("#page4 h1").innerHTML
    // newJoke.append(jokeText)
    // jokes.append(newJoke)

    if(jokeText){
        const newJoke = document.createElement("h1")
        newJoke.textContent =  `"${jokeText}"`

        const page4 = document.querySelector("#page4")
        page4.append(newJoke)
    }
}

const getDadJoke = async () => {
    try{
        const config = {headers: {Accept: 'application/json'}}
        const res = await axios.get("https://icanhazdadjoke.com/", config)
        return res.data.joke
        // console.log("Here's your dad joke", res)
        // console.log(res.data.joke)
    }
    catch(e){
        console.log("Uh oh, looks like a laugh wasn't in your luck today", e)
    }
}



let jokePresence = false
const btn = document.querySelector("button")

const toggleJoke = () => {
    const existingJoke = document.querySelector("#page4 h1");

const noJokeNotification = () => {
    const noJokeNotificationInner = document.createElement("h1")
    noJokeNotificationInner.innerHTML = "Currently no joke on the screen, click on the button again to get a new joke."
    noJokeNotificationInner.style.color = "red"
    noJokeNotificationInner.id = "noJokeNotification";
    const page = document.querySelector("#page4")
    page.append(noJokeNotificationInner)
}
const removeNoJokeNotification = () => {
    const existingNoJokeNotification = document.querySelector("#noJokeNotification");
    if (existingNoJokeNotification) {
        existingNoJokeNotification.remove();
    }
};

    if (!jokePresence) {
        // If no joke is present, add a new joke
        btn.innerHTML = "Remove existing joke";
        addNewJoke(); // Call the function to add a new joke
        removeNoJokeNotification()
        jokePresence = true; // Set the flag to indicate the presence of a joke
    } else if(existingJoke){
        // If a joke is present, remove the existing joke
        existingJoke.remove(); // Remove the existing joke
        btn.innerHTML = "Get a Joke";
        // noJokeNotification.innerHTML.append = "Currently no joke on the screen, click on the button to get a new joke"
        noJokeNotification()
        jokePresence = false; // Set the flag to indicate no joke is present
    }
};

btn.addEventListener("click", toggleJoke);

