let audioUrl = "";
let audio = null;
let isPlaying = false;

// Import the data to customize and insert them into page
const fetchData = () => {
  fetch("wishes.json")
    .then((data) => data.json())
    .then((data) => {
      dataArr = Object.keys(data);
      dataArr.map((customData) => {
        if (data[customData] !== "") {
          if (customData === "imagePath") {
            document
              .querySelector(`[data-node-name*="${customData}"]`)
              .setAttribute("src", data[customData]);
          } else if (customData === "fonts") {
            data[customData].forEach((font) => {
              const link = document.createElement("link");
              link.rel = "stylesheet";
              link.href = font.path;
              document.head.appendChild(link);
              document.body.style.fontFamily = font.name;
            });
          } else if (customData === "music") {
            audioUrl = data[customData];
            audio = new Audio(audioUrl);
            audio.preload = "auto";
          } else {
            document.querySelector(
              `[data-node-name*="${customData}"]`
            ).innerText = data[customData];
          }
        }

        // Check if the iteration is over
        // Run amimation if so
        if (dataArr.length === dataArr.indexOf(customData) + 1) {
          document
            .querySelector("#startButton")
            .addEventListener("click", () => {
              document.querySelector(".startSign").style.display = "none";
              animationTimeline();
            });
          // animationTimeline()
        }
      });
    });
};

// Animation Timeline
const animationTimeline = () => {
  // Spit chars that needs to be animated individually
  const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
  const hbd = document.getElementsByClassName("wish-hbd")[0];
  
  // Split credits text into words for word-by-word animation - moved to end

  textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
    .split("")
    .join("</span><span>")}</span`;

  hbd.innerHTML = `<span>${hbd.innerHTML
    .split("")
    .join("</span><span>")}</span`;

  const ideaTextTrans = {
    opacity: 0,
    y: -20,
    rotationX: 5,
    skewX: "15deg",
  };

  const ideaTextTransLeave = {
    opacity: 0,
    y: 20,
    rotationY: 5,
    skewX: "-15deg",
  };

  const tl = new TimelineMax();

  tl.to(".container", 0.1, {
    visibility: "visible",
  })
    .from(".one", 1.5, {
      opacity: 0,
      y: 10,
    })
    .from(".two", 1.0, {
      opacity: 0,
      y: 10,
    })
    .to(
      ".one",
      1.2,
      {
        opacity: 0,
        y: 10,
      },
      "+=4"
    )
    .to(
      ".two",
      1.2,
      {
        opacity: 0,
        y: 10,
      },
      "-=1.5"
    )
    .from(".three", 1.2, {
      opacity: 0,
      y: 10,
      // scale: 0.7
    })
    .to(
      ".three",
      1.2,
      {
        opacity: 0,
        y: 10,
      },
      "+=3.5"
    )
    .from(".four", 1.2, {
      scale: 0.2,
      opacity: 0,
    })
    .from(".fake-btn", 0.8, {
      scale: 0.2,
      opacity: 0,
    })
    .staggerTo(
      ".hbd-chatbox span",
      0.8,
      {
        visibility: "visible",
      },
      0.08
    )
    .to(".fake-btn", 0.3, {
      backgroundColor: "#8FE3B6",
    })
    .to(
      ".four",
      1.0,
      {
        scale: 0.2,
        opacity: 0,
        y: -150,
      },
      "+=1.5"
    )
    .from(".idea-1", 1.2, ideaTextTrans)
    .to(".idea-1", 1.2, ideaTextTransLeave, "+=2.5")
    .from(".idea-2", 1.2, ideaTextTrans)
    .to(".idea-2", 1.2, ideaTextTransLeave, "+=2.5")
    .from(".idea-3", 1.2, ideaTextTrans)
    .to(".idea-3 strong", 0.8, {
      scale: 1.2,
      x: 10,
      backgroundColor: "rgb(21, 161, 237)",
      color: "#fff",
    })
    .to(".idea-3", 1.2, ideaTextTransLeave, "+=2.5")
    .from(".idea-4", 1.2, ideaTextTrans)
    .to(".idea-4", 1.2, ideaTextTransLeave, "+=2.5")
    .from(
      ".idea-5",
      1.5,
      {
        rotationX: 15,
        rotationZ: -10,
        skewY: "-5deg",
        y: 50,
        z: 10,
        opacity: 0,
      },
      "+=1"
    )
    .to(
      ".idea-5 .smiley",
      1.0,
      {
        rotation: 90,
        x: 8,
      },
      "+=0.8"
    )
    .to(
      ".idea-5",
      1.2,
      {
        scale: 0.2,
        opacity: 0,
      },
      "+=3"
    )
    .staggerFrom(
      ".idea-6 span",
      1.5,
      {
        scale: 3,
        opacity: 0,
        rotation: 15,
        ease: Expo.easeOut,
      },
      0.4
    )
    .staggerTo(
      ".idea-6 span",
      1.5,
      {
        scale: 3,
        opacity: 0,
        rotation: -15,
        ease: Expo.easeOut,
      },
      0.4,
      "+=2"
    )
    .staggerFromTo(
      ".baloons img",
      4.0,
      {
        opacity: 0.9,
        y: 1400,
      },
      {
        opacity: 1,
        y: -1000,
      },
      0.3
    )
    .from(
      ".panda-dp",
      1.2,
      {
        scale: 3.5,
        opacity: 0,
        x: 25,
        y: -25,
        rotationZ: -45,
      },
      "-=3"
    )
    .from(".hat", 1.0, {
      x: -100,
      y: 350,
      rotation: -180,
      opacity: 0,
    })
    .staggerFrom(
      ".wish-hbd span",
      1.2,
      {
        opacity: 0,
        y: -50,
        // scale: 0.3,
        rotation: 150,
        skewX: "30deg",
        ease: Elastic.easeOut.config(1, 0.5),
      },
      0.15
    )
    .staggerFromTo(
      ".wish-hbd span",
      1.2,
      {
        scale: 1.4,
        rotationY: 150,
      },
      {
        scale: 1,
        rotationY: 0,
        color: "#ff69b4",
        ease: Expo.easeOut,
      },
      0.15,
      "party"
    )
    .from(
      ".wish h5",
      1.0,
      {
        opacity: 0,
        y: 10,
        skewX: "-15deg",
      },
      "party"
    )
    .staggerTo(
      ".eight svg",
      2.5,
      {
        visibility: "visible",
        opacity: 0,
        scale: 80,
        repeat: 3,
        repeatDelay: 2.5,
      },
      0.5
    )
    .to(".six", 1.0, {
      opacity: 0,
      y: 30,
      zIndex: "-1",
    })
    .staggerFrom(".nine p", 1.8, ideaTextTrans, 2.0)
    .to(
      ".last-smile",
      1.0,
      {
        rotation: 90,
      },
      "+=2"
    )
    .to(".nine", 1.0, {
      opacity: 0,
      y: -30,
    }, "+=3")
    .to(".ten", 0.1, {
      visibility: "visible"
    })
    .from(".ten", 1.5, {
      opacity: 0,
      y: 50,
    })
    .from(".credits-title", 1.5, {
      opacity: 0,
      y: 20,
      scale: 0.8,
    }, "-=0.5")
    .call(() => {
      // Split credits text into words for word-by-word animation
      const creditsText = document.getElementsByClassName("credits-text")[0];
      if (creditsText && creditsText.innerHTML.trim()) {
        const text = creditsText.innerHTML.trim();
        console.log("Credits text found:", text.substring(0, 50) + "...");
        creditsText.innerHTML = `<span>${text
          .split(" ")
          .join("</span> <span>")}</span>`;
        console.log("Credits spans created:", creditsText.querySelectorAll("span").length);
      } else {
        console.log("Credits text not found or empty");
      }
    })
    .to({}, 0.2, {}) // Small delay to ensure spans are ready
    .staggerFrom(
      ".credits-text span",
      0.6,
      {
        opacity: 0,
        y: 20,
        rotationX: 90,
        transformOrigin: "50% 50% -20px",
        ease: Back.easeOut.config(1.7),
      },
      0.25
    );

  // tl.seek("currentStep");
  // tl.timeScale(2);

  // Restart Animation on click
  const replayBtn = document.getElementById("replay");
  replayBtn.addEventListener("click", () => {
    tl.restart();
  });
};

// Run fetch and animation in sequence
fetchData();

const playPauseButton = document.getElementById("playPauseButton");

document.getElementById("startButton").addEventListener("click", () => {
  if (audio) {
    togglePlay(true);
  }
});

playPauseButton.addEventListener("click", () => {
  if (audio) {
    togglePlay(!isPlaying);
  }
});

function togglePlay(play) {
  if (!audio) return;

  isPlaying = play;
  play ? audio.play() : audio.pause();
  playPauseButton.classList.toggle("playing", play);
}
