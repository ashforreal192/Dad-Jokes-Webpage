gsap.to("#page2 h1", {
    transform: "translateX(-80%)",
    // fontWeight:"500",
    scrollTrigger:{
        trigger: "#page2",
        scroller: "body",
        // markers: true,
        start: "top 0",
        end: "top -250%",
        scrub: 3,
        pin: true
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

