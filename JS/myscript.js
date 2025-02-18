
let generate = document.getElementById("generate")
let mainContainer = document.getElementById("container_f")
let numContainer = document.getElementById("number_container")
let inputContainer = document.getElementById("input_container")
let clickIndex = 0
let writeIndex = 0


let numbers = []
let guesses = []

function generateNums() {
    clickIndex = 0
    writeIndex = 0
    numbers = []
    guesses = []
    function clearAllTimers() {
        let id = setTimeout(() => { }, 0);
        while (id--) {
            clearTimeout(id);
            clearInterval(id);
        }
    }
    clearAllTimers()
    win.classList.remove("grow")
    loss.classList.remove("grow")
    numContainer.innerHTML = ""
    inputContainer.innerHTML = ""
    numbers = []
    for (let i = 0; i < 6;) {
        let randomNum = Math.floor(Math.random() * 10 + 1)

        if (!numbers.includes(randomNum)) {
            numbers.push(randomNum)
            i++
            console.log(randomNum)
        }
    }

    for (let x = 0; x < numbers.length;) {
        setTimeout(() => {
            displayNums(numbers[x - 1])
            setTimeout(() => {
                [...document.getElementsByClassName("square")].forEach(element => {
                    element.classList.add("grow")
                });
            }, x * 5);
        }, x * 300);
        x++
        if (x == (numbers.length - 1)) {
            setTimeout(() => {
                [...document.getElementsByClassName("square")].forEach(element => {
                    element.classList.add("shrink_text")
                    setTimeout(() => {
                        element.innerHTML = ""
                    }, 500);
                });
                setTimeout(() => {
                    inputContainer.innerHTML = ""

                    for (let z = 0; z < 10; z++) {
                        inputContainer.innerHTML += ` <div class="input grow">${z + 1}</div>`
                    }
                    setTimeout(() => {
                        let allInputs = document.getElementsByClassName("input");
                        let allSquares = document.getElementsByClassName("square");

                        [...allInputs].forEach(element => {
                            element.addEventListener("click", function () {
                                // se un elemenon non ah active
                                if (!element.classList.contains("active")) {
                                    element.classList.add("active")
                                    allSquares[writeIndex].classList.remove("shrink_text")
                                    allSquares[writeIndex].innerHTML = element.innerHTML
                                    // controllo che non ci siano doppioni nell array e pusho
                                    if (!guesses.includes(element.innerHTML)) {
                                        guesses.push(element.innerHTML)
                                        console.log(guesses);
                                        console.log(numbers)
                                    }
                                    clickIndex++
                                    writeIndex = clickIndex
                                } else {
                                    element.classList.remove("active")
                                    clickIndex--
                                    console.log(clickIndex);


                                    [...allSquares].forEach((singleSquare, x) => {
                                        //se il numero e gia  presente
                                        if (singleSquare.innerHTML == element.innerHTML) {
                                            singleSquare.innerHTML = ""
                                            singleSquare.classList.add("shrink_text")
                                            writeIndex = x
                                            //se il numero e nuovo
                                        } else if (!singleSquare.innerHTML == element.innerHTML) {
                                            allSquares[writeIndex].innerHTML = ""
                                            allSquares[writeIndex].classList.add("shrink_text")
                                        }
                                    });

                                    guesses = guesses.filter(item => item !== element.innerHTML);
                                    console.log(guesses);
                                }

                                if (clickIndex == 6) {

                                    if (guesses.slice().sort().toString() == numbers.slice().sort().toString()) {
                                        console.log("ciu sei");
                                        let win = document.getElementById("win")
                                        // setTimeout(() => {
                                        win.classList.add("grow")
                                        // }, 10);
                                    } else {
                                        console.log("noon broski");
                                        let loss = document.getElementById("loss")
                                        setTimeout(() => {
                                            loss.classList.add("grow")
                                        }, 10);
                                    }

                                    let replayBtn = document.getElementsByClassName("replay");

                                    [...replayBtn].forEach(debug => {
                                        debug.addEventListener("click", generateNums)
                                    });

                                }
                            })
                        });
                    }, 50);
                }, 310);
            }, 4000);
        }
    }

}


function displayNums(number) {
    numContainer.innerHTML += ` <div class="square">${number}</div>`
}






generate.addEventListener("click", generateNums)