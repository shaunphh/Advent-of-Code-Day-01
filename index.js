const inputs = document.querySelectorAll("input");
const min = document.querySelector(".minutes input");
const sec = document.querySelector(".seconds input");
const setting = document.querySelector(".settings");
const start = document.querySelector(".start");

const mp3 = "https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3";

const ring = document.querySelector(".ring");

const zeroPad = (num, places) => String(num).padStart(places, "0");

let minutes = min.value;
let seconds = sec.value;

let toggleSettings = false;
let startTimer = false;

let timer1 = null;

let progress = null;
let progressStart = 0;
let progressEnd = minutes * 60 + seconds;
let secRem = 0;
let minRem = 0;

function resetValues() {
  minutes = document.querySelector(".minutes input").value;
  seconds = document.querySelector(".seconds input").value;

  toggleSettings = false;
  min.disabled = true;
  sec.disabled = true;
}

function timeRemaining() {
  seconds = seconds - 1;
  if (seconds === -1) {
    minutes = minutes - 1;
    seconds = 59;
  }

  sec.value = `${zeroPad(seconds, 2)}`;
  min.value = `${zeroPad(minutes, 2)}`;

  if (sec.value === "00" && min.value === "00") {
    clearInterval(timer1);
    startTimer = false;
    start.innerHTML = "reset";
    ring.classList.add("ending");
    // new Audio(mp3).play();
  }
}

let intervals = () => {
  timer1 = setInterval(timeRemaining, 1000);
  timer2 = setInterval(progressEnd, 1000);
};

start.addEventListener("click", () => {
  if (!startTimer) {
    startTimer = true;
    start.innerHTML = "stop";

    resetValues();
    intervals();
  } else {
    clearInterval(timer1);
    startTimer = false;
    start.innerHTML = "start";
  }
  if (start.innerHTML === "RESET") {
    console.log("hi");
  }
});

setting.addEventListener("click", () => {
  if (!toggleSettings) {
    toggleSettings = true;
    min.disabled = false;
    sec.disabled = false;
    startTimer = false;
    console.log(startTimer);
    clearInterval(timer1);
  } else {
    toggleSettings = false;
    console.log(startTimer);
    resetValues();
  }

  if ((start.innerHTML = "stop")) {
    start.innerHTML = "start";
  }
});

inputs.forEach((input) => {
  input.addEventListener("input", () => {
    input.value = input.value.slice(-2);
  });
  ["keyup", "blur", "change"].forEach((event) =>
    input.addEventListener(event, () => {
      if (input.value < 1) {
        input.value = zeroPad(input.value, 2);
      } else if (input.value < 10 && input.value > 1 && input.value.length < 2) {
        input.value = zeroPad(input.value, 2);
      } else if (input.value > 59) {
        input.value = input.value.replace(input.value, "59");
      }
    })
  );
});
