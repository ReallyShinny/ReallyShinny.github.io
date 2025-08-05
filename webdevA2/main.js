// Cache DOM elements
const intro = document.querySelector('.intro');
const composerButton = document.getElementById('composerbut');
const historyButton = document.getElementById('historybut');
const pianoButton = document.getElementById('pianobut');
const returnButtons = document.querySelectorAll('.returnbut');
const composerInputs = document.querySelectorAll('.inscompos');
const composerSection = document.getElementById('composersec');
const composerSelectionBox = document.getElementById('composerselect');
const historySection = document.getElementById('historysec');
const mozartSection = document.getElementById('amadeussec');
const beethovenSection = document.getElementById('beethovensec');
const chopinSection = document.getElementById('chopinsec');
const mozartSelect = document.getElementById('mozartselect');
const beethovenSelect = document.getElementById('beethovenselect');
const chopinSelect = document.getElementById('chopinselect');
const pianoSection = document.getElementById('typesecs');
const interactiveKeys = document.querySelectorAll(".keys .key");
const metroButton = document.getElementById('metro');
const interactivePiano = document.getElementById('interactivep');
const mainButton = document.getElementById('mainbutt');
const pianoButtonInteractive = document.getElementById('pianobutton');
const mobmainButton = document.getElementById('mobmainbutt');
const mobpianoButtonInteractive = document.getElementById('mobpianobutton');
const mainItems = document.getElementById('mainstuff');
const menubutt = document.getElementById('navopener');

// Audio files
const audioFiles = {
  c6: new Audio('audio/c6.mp3'),
  f6: new Audio('audio/f6.mp3'),
  g6: new Audio('audio/g6.mp3'),
  noc6: new Audio('audio/noc6.mp3'),
  eine: new Audio('audio/eine.mp3'),
  moonlight: new Audio('audio/moolightson.mp3'),
  metronome: new Audio('audio/metronome.mp3')
};
audioFiles.metronome.loop = true;
audioFiles.metronome.volume = 0.2;

// Section visibility setup
[composerSection, historySection, pianoSection].forEach(function(section) {
  section.style.maxHeight = "0";
  section.style.opacity = "0";
});
interactivePiano.style.display = "none";

// Slide show/hide functions
function showSection(section) {
  section.style.maxHeight = "100%";
  section.style.opacity = "1";
}

function hideSection(section) {
  section.style.maxHeight = "0";
  section.style.opacity = "0";
}

// Intro animation
window.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    intro.style.left = '-200vh';
  }, 1000);
});

// Sticky header
window.addEventListener("scroll", function() {
  const header = document.getElementById("mainHeaderHead");
  header.classList.toggle("sticky", window.scrollY > 100);
});

/* Open the sidenav */
menubutt.addEventListener("click", function () {
  const sidenav = document.getElementById("mySidenav");
  const currentWidth = getComputedStyle(sidenav).width;

  if (currentWidth === "0px") {
    sidenav.style.width = "25%";
    menubutt.style.left = "200px";
  } else {
    sidenav.style.width = "0%";
    menubutt.style.left = "0"; // Optional: reset button position
  }
});
// Section toggle buttons
composerButton.addEventListener("click", function() {
  showSection(composerSection);
  hideSection(historySection);
  hideSection(pianoSection);
  composerInputs.forEach(function(input) {
    input.style.display = "none";
  });
  composerSelectionBox.style.display = "";
  audioFiles.c6.cloneNode().play();
});

historyButton.addEventListener("click", function() {
  hideSection(composerSection);
  showSection(historySection);
  hideSection(pianoSection);
  audioFiles.f6.cloneNode().play();
});

pianoButton.addEventListener("click", function() {
  hideSection(composerSection);
  hideSection(historySection);
  showSection(pianoSection);
  audioFiles.g6.cloneNode().play();
});

function showInteractivePiano() {
  mainItems.style.display = "none";
  interactivePiano.style.display = "block";
  audioFiles.g6.cloneNode().play();
}

pianoButtonInteractive.addEventListener("click", showInteractivePiano);
mobpianoButtonInteractive.addEventListener("click", showInteractivePiano);

function showMainItems() {
  mainItems.style.display = "block";
  interactivePiano.style.display = "none";
  audioFiles.g6.cloneNode().play();
}

mainButton.addEventListener("click", showMainItems);
mobmainButton.addEventListener("click", showMainItems);


// Composer selections
mozartSelect.addEventListener("click", function() {
  audioFiles.eine.cloneNode().play();
  composerSelectionBox.style.display = "none";
  mozartSection.style.display = "block";
});

beethovenSelect.addEventListener("click", function() {
  audioFiles.moonlight.cloneNode().play();
  composerSelectionBox.style.display = "none";
  beethovenSection.style.display = "block";
});

chopinSelect.addEventListener("click", function() {
  audioFiles.noc6.cloneNode().play();
  composerSelectionBox.style.display = "none";
  chopinSection.style.display = "block";
});

// Hover descriptions
const hoverDescriptions = {
  mozartselect: "Mozart, <br><br><br><br><br><br><br>The King of Classical Music",
  beethovenselect: "Beethoven, <br><br><br><br><br><br><br>Deaf To All But The Song",
  chopinselect: "Chopin, <br><br><br><br><br><br>Virtuist of Harmonic Resonance"
};
if (window.innerWidth > 800) {
  [mozartSelect, beethovenSelect, chopinSelect].forEach(function(select) {
    select.addEventListener("mouseenter", function() {
      select.innerHTML = hoverDescriptions[select.id];
    });
    select.addEventListener("mouseleave", function() {
      select.textContent = select.id.replace("select", "").charAt(0).toUpperCase() + select.id.slice(1, -6);
    });
  });
}

// Return buttons
returnButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    showSection(composerSection);
    composerInputs.forEach(function(input) {
      input.style.display = "none";
    });
    [mozartSection, beethovenSection, chopinSection].forEach(function(sec) {
      sec.style.display = "none";
    });
    composerSelectionBox.style.display = "";
    audioFiles.f6.cloneNode().play();
  });
});

const pianoDescriptions = {
  upright: "The upright piano is compact and great for homes.",
  electric: "The electric piano produces sound using electronics.",
  grand: "The grand piano has a horizontal frame and rich tone."
};

// Handle clicks on each piano box
pianoSection.addEventListener("click", function (event) {
  let target = event.target;

  // Climb up if <h2> or <p> is clicked
  while (target && target !== pianoSection && !pianoDescriptions[target.id]) {
    target = target.parentElement;
  }

  if (!target || target === pianoSection) return;

  const id = target.id;
  const isShowingDescription = target.querySelector("p");

  if (isShowingDescription) {
    target.innerHTML = `<h2>${id.charAt(0).toUpperCase() + id.slice(1)}</h2>`;
  } else {
    target.innerHTML = `<p>${pianoDescriptions[id]}</p>`;
  }
});

// Interactive piano
interactiveKeys.forEach(function(key) {
  key.addEventListener("click", function() {
    const note = key.dataset.key;
    if (note) {
      const audio = new Audio(`audio/${note}.mp3`);
      audio.play();
    }
  });
});

// Metronome toggle
metroButton.addEventListener("click", function() {
  if (audioFiles.metronome.paused) {
    audioFiles.metronome.play();
  } else {
    audioFiles.metronome.pause();
  }
});
