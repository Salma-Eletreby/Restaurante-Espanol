let state = {
  cardIndex: 0,
  lvlIndex: 0,
  checkAnswer: false,
  score: 0,
  name: "",
  questionScore: 0,
  rewardImgStatus: 0,
  showReward: false,
};

var rewardHtml = `
          <h1 id="reward-title"> </h1>
          <h4 id="reward-sub"> </h4>
        <div id="reward-img">
          <div id="block1" class="block"></div>
          <div id="block2" class="block"></div>
          <div id="block3" class="block"></div>
            <div id="info1" class="info"></div>
          <div id="info2" class="info"></div>
          <div id="info3" class="info"></div>
          <img src="Style/reward.jpg" alt="reward" id="rewardImg">
        </div>
`;

function setState(newState, data) {
  state = { ...state, ...newState };

  render(data);
}

window.onDragStart = function (event) {
  event.dataTransfer.setData("text/plain", event.target.id);
  // event.currentTarget.style.backgroundColor = 'rgb(253, 255, 210)';
};

window.onDragOver = function (event) {
  event.preventDefault();
};

window.onDrop = function (event) {
  event.preventDefault();
  const id = event.dataTransfer.getData("text");
  const draggableElement = document.getElementById(id);
  let dropzone = event.target;

  if (!dropzone.classList.contains("label-dropzone")) {
    dropzone = dropzone.closest(".label-dropzone");
  }

  if (dropzone && dropzone.children.length === 0) {
    dropzone.appendChild(draggableElement);
    draggableElement.style.backgroundColor = "rgb(253, 255, 210)";
  } else {
    alert("This drop zone can only have one label.");
    draggableElement.style.backgroundColor = "cyan";
  }
  event.dataTransfer.clearData();
};

window.toggleCard = function (card) {
  card.classList.toggle("active");
};

function render(data) {
  var cardHTML = ``;

  if (state.showReward == true) {
    var failSoundHtml = `
    <audio autoplay>
            <source src="Style/fail.mp3" type="audio/mpeg">
        </audio>
    `;

    var trumpetHtml = `
    <audio autoplay>
            <source src="Style/trumpets.mp3" type="audio/mpeg">
        </audio>
    `;
    cardHTML = rewardHtml;
    document.getElementById("game-area").innerHTML = cardHTML;

    if (data[state.lvlIndex].type == "MCQ") {
      if (state.questionScore >= 30) {
        document.getElementById("game-area").innerHTML += trumpetHtml;
        state.rewardImgStatus = state.rewardImgStatus + 1;
        document.getElementById("reward-title").textContent = "Congratulations!";
        document.getElementById("reward-sub").textContent = "You have unlocked part of the image";

        document.getElementById("block1").style.opacity = "0%";
        document.getElementById("block2").style.paddingBottom = "18em";
        document.getElementById("block2").style.top = "28em";
        document.getElementById("block3").style.top = "10em";
        var achievmentHtml = `
                <div class="animation">
                    <div class="circle">
                        <div class="img trophy_animate trophy_img">
                        <img class="trophy_1" src="https://dl.dropboxusercontent.com/s/m9xt201vymisc91/trophy_full.svg" alt="Xbox Logo" />
                        <img class="trophy_2" src="https://dl.dropboxusercontent.com/s/e7lqmrylmva92oi/trophy_no_handles.svg" alt="Xbox Logo" />
                        </div>
                        <div class="img xbox_img">
                        <img src="https://www.svgrepo.com/show/526499/chef-hat-minimalistic.svg" alt="" />
                        </div>
                    </div>
                    <div class="banner-outer">
                        <div class="banner">
                        <div class="achieve_disp">
                            <span class="unlocked">Achievement Unlocked!</span>
                            <div class="score_disp">
                            <div class="gamerscore">
                                <img width="20px" src="https://dl.dropboxusercontent.com/s/5nu0ep8ranqahq6/G.svg" alt="gamerscore" />
                                <input disabled type="text" class="acheive_score" />
                            </div>
                            <span class="hyphen_sep">Triple Threat</span>
                            <input disabled type="text" class="achiev_name" />
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                `;

        document.getElementById("game-area").innerHTML += achievmentHtml;

        const animatedElements = [
          {
            el: document.querySelector(".circle"),
            class: "circle_animate",
          },
          {
            el: document.querySelector(".banner"),
            class: "banner-animate",
          },
          {
            el: document.querySelector(".achieve_disp"),
            class: "achieve_disp_animate",
          },
        ];

        animatedElements.forEach((element) => {
          if (element.el) {
            element.el.classList.add(element.class); // Add the class
            setTimeout(() => {
              element.el.classList.remove(element.class); // Remove the class after a delay
            }, 10000); // Adjust duration if needed
          }
        });
      } else {
        document.getElementById("game-area").innerHTML += failSoundHtml;
        document.getElementById("reward-title").textContent = "Sorry!";
        document.getElementById("reward-sub").textContent = "You failed to unlock part of the image";
        document.getElementById("block2").style.paddingBottom = "18em";
      }
    } else if (data[state.lvlIndex].type == "labels") {
      state.rewardImgStatus = state.rewardImgStatus + 1;
      if (state.questionScore >= 50) {
        document.getElementById("game-area").innerHTML += trumpetHtml;
        document.getElementById("reward-title").textContent = "Congratulations!";
        document.getElementById("reward-sub").textContent = "You have unlocked part of the image";

        document.getElementById("block2").style.opacity = "0%";

        document.getElementById("block3").style.paddingBottom = "25em";
        var achievmentHtml = `
            <div class="animation">
                <div class="circle">
                    <div class="img trophy_animate trophy_img">
                    <img class="trophy_1" src="https://dl.dropboxusercontent.com/s/m9xt201vymisc91/trophy_full.svg" alt="Xbox Logo" />
                    <img class="trophy_2" src="https://dl.dropboxusercontent.com/s/e7lqmrylmva92oi/trophy_no_handles.svg" alt="Xbox Logo" />
                    </div>
                    <div class="img xbox_img">
                    <img src="https://www.svgrepo.com/show/526499/chef-hat-minimalistic.svg" alt="" />
                    </div>
                </div>
                <div class="banner-outer">
                    <div class="banner">
                    <div class="achieve_disp">
                        <span class="unlocked">Achievement Unlocked!</span>
                        <div class="score_disp">
                        <div class="gamerscore">
                            <img width="20px" src="https://dl.dropboxusercontent.com/s/5nu0ep8ranqahq6/G.svg" alt="gamerscore" />
                            <input disabled type="text" class="acheive_score" />
                        </div>
                        <span class="hyphen_sep">Labelling Genius</span>
                        <input disabled type="text" class="achiev_name" />
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            `;

        document.getElementById("game-area").innerHTML += achievmentHtml;

        const animatedElements = [
          {
            el: document.querySelector(".circle"),
            class: "circle_animate",
          },
          {
            el: document.querySelector(".banner"),
            class: "banner-animate",
          },
          {
            el: document.querySelector(".achieve_disp"),
            class: "achieve_disp_animate",
          },
        ];

        animatedElements.forEach((element) => {
          if (element.el) {
            element.el.classList.add(element.class); // Add the class
            setTimeout(() => {
              element.el.classList.remove(element.class); // Remove the class after a delay
            }, 10000); // Adjust duration if needed
          }
        });
      } else {
        document.getElementById("game-area").innerHTML += failSoundHtml;
        document.getElementById("reward-title").textContent = "Sorry!";
        document.getElementById("reward-sub").textContent = "You failed to unlock part of the image";
        document.getElementById("block2").style.paddingBottom = "18em";
      }
    } else if (data[state.lvlIndex].type == "sort") {
      state.rewardImgStatus = state.rewardImgStatus + 1;

      //remove before pushing
      state.rewardImgStatus = 3;
      state.questionScore = 80;

      if (state.questionScore >= 80) {
        document.getElementById("game-area").innerHTML += trumpetHtml;
        document.getElementById("block3").style.opacity = "0%";

        //remove before pushing
        document.getElementById("block1").style.opacity = "0%";
        document.getElementById("block2").style.opacity = "0%";

        if (state.rewardImgStatus == 3) {
          document.getElementById("reward-title").textContent = "You unlocked the image!";
          document.getElementById("reward-sub").textContent = "Hover over each image to learn more about it.";

          document.getElementById("info1").innerHTML = `
            <p style="opacity=100%;">The view is from the Mirador de San Nicolás offers a breathtaking panorama of the Alhambra with the Sierra Nevada mountains in the background. A beautiful view of Granada.</p>
            `;

          document.getElementById("info2").innerHTML = `
            <p>Delicious tapas! The word "tapas", a plural, is derived from the Spanish verb tapar, "to cover", a cognate of the English "top“. Tapas is a famous appetizer or snack that can be served hot or cold </p>
            `;
          document.getElementById("info3").innerHTML = `
            <p>Pablo Ruiz Picasso was a Spanish painter, sculptor, printmaker, and theater designer who spent most of his life in France. Painting in a naturalistic manner through his childhood and adolescence, he became one of the best-known figures in 20th-century art</p>
            `;
        } else {
          document.getElementById("reward-title").textContent = "Congratulations!";
          document.getElementById("reward-sub").textContent = "You have unlocked part of the image";
        }
        var achievmentHtml = `
                <div class="animation">
                    <div class="circle">
                        <div class="img trophy_animate trophy_img">
                        <img class="trophy_1" src="https://dl.dropboxusercontent.com/s/m9xt201vymisc91/trophy_full.svg" alt="Xbox Logo" />
                        <img class="trophy_2" src="https://dl.dropboxusercontent.com/s/e7lqmrylmva92oi/trophy_no_handles.svg" alt="Xbox Logo" />
                        </div>
                        <div class="img xbox_img">
                        <img src="https://www.svgrepo.com/show/526499/chef-hat-minimalistic.svg" alt="" />
                        </div>
                    </div>
                    <div class="banner-outer">
                        <div class="banner">
                        <div class="achieve_disp">
                            <span class="unlocked">Achievement Unlocked!</span>
                            <div class="score_disp">
                            <div class="gamerscore">
                                <img width="20px" src="https://dl.dropboxusercontent.com/s/5nu0ep8ranqahq6/G.svg" alt="gamerscore" />
                                <input disabled type="text" class="acheive_score" />
                            </div>
                            <span class="hyphen_sep">Sentence Master</span>
                            <input disabled type="text" class="achiev_name" />
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                `;

        document.getElementById("game-area").innerHTML += achievmentHtml;

        const animatedElements = [
          {
            el: document.querySelector(".circle"),
            class: "circle_animate",
          },
          {
            el: document.querySelector(".banner"),
            class: "banner-animate",
          },
          {
            el: document.querySelector(".achieve_disp"),
            class: "achieve_disp_animate",
          },
        ];

        animatedElements.forEach((element) => {
          if (element.el) {
            element.el.classList.add(element.class); // Add the class
            setTimeout(() => {
              element.el.classList.remove(element.class); // Remove the class after a delay
            }, 10000); // Adjust duration if needed
          }
        });
      } else {
        document.getElementById("game-area").innerHTML += failSoundHtml;
        document.getElementById("reward-title").textContent = "Sorry!";
        document.getElementById("reward-sub").textContent = "You failed to unlock part of the image";
        document.getElementById("block2").style.paddingBottom = "18em";
      }
    }
  } else if (data[state.lvlIndex].type == "vocab") {
    state.questionScore = 0;
    cardHTML = `
        <h1>${data[state.lvlIndex].title}</h1>
        <h4>${data[state.lvlIndex].desc}</h4>
        <div class="card" onclick="toggleCard(this)">
                <div class="vocab-img">
                    <img src="${data[state.lvlIndex].elements[state.cardIndex].img}" alt="${data[state.lvlIndex].elements[state.cardIndex].english}">
                </div>
                <audio controls>
                    <source src="${data[state.lvlIndex].elements[state.cardIndex].audio}" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
                <p class="spanish">${data[state.lvlIndex].elements[state.cardIndex].spanish}</p>
                <div class="card__content" style="
                    background-image: url(${data[state.lvlIndex].elements[state.cardIndex].img});
                    background-color: rgba(255,255,255,0.7);
                    background-blend-mode: lighten;
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                "
                >
                    <p class="card__title">${data[state.lvlIndex].elements[state.cardIndex].english}</p>
                </div>
        </div>
        `;

    document.getElementById("game-area").innerHTML = cardHTML;
  } else if (data[state.lvlIndex].type == "MCQ") {
    const choicesHTML = data[state.lvlIndex].elements[state.cardIndex].choices
      .map(
        (c, i) => `
                <input type="radio" id="choice${i}" name="choice" value="${c}">
                <label for="choice${i}">${c}</label>
                <br>
            `
      )
      .join("");

    cardHTML = `
        <h1>${data[state.lvlIndex].title}</h1>
        <h4>${data[state.lvlIndex].desc}</h4>
        <div class="element">
                <div class="vocab-img">
                    <img src="${data[state.lvlIndex].elements[state.cardIndex].img}" alt="${data[state.lvlIndex].elements[state.cardIndex].english}">
                </div>
                <div class="choices">
                    ${choicesHTML}
                <div>
                <div>
                    <p id="MCQ-Answer">The answer is: ${data[state.lvlIndex].elements[state.cardIndex].answer}</p>
                </div>
        </div>
        `;
    state = {
      cardIndex: state.cardIndex,
      lvlIndex: state.lvlIndex,
      checkAnswer: true,
      score: state.score,
      name: state.name,
    };

    document.getElementById("game-area").innerHTML = cardHTML;
  } else if (data[state.lvlIndex].type == "sort") {
    const choicesHTML = data[state.lvlIndex].elements[state.cardIndex].labels
      .map(
        (c, i) => `
                <div id="draggable-${i}" class="draggable-label" ${c.ignore == false ? 'draggable="true"' : 'draggable="false" style="background-color: rgba(0, 0, 0, 0);"'} draggable="true" ondragstart="onDragStart(event);">
                    ${c.txt}
                </div>
            `
      )
      .join("");

    const sortedHTML = data[state.lvlIndex].elements[state.cardIndex].answer
      .map(
        (c, i) => `
            <div id="zone-${i}" class="label-dropzone" ondragover="onDragOver(event);" ondrop="onDrop(event);" ${c.ignore == false ? "" : ' style="background-color: rgba(0, 0, 0, 0);"'}">
            ${c.ignore == true ? `${c.txt}` : ""}
            </div>
            `
      )
      .join("");

    cardHTML = `
            <h1>${data[state.lvlIndex].title}</h1>
            <h4>${data[state.lvlIndex].desc}</h4>
            <div class="sort-area">
                    <div class="labels-to-sort">
                    ${choicesHTML}
                    </div>
                    <div class="sorted-labels">
                    ${sortedHTML}
                    </div>
                    <div id="sentence"></div>
            </div>
            `;

    state = {
      cardIndex: state.cardIndex,
      lvlIndex: state.lvlIndex,
      checkAnswer: true,
      score: state.score,
      name: state.name,
    };

    document.getElementById("game-area").innerHTML = cardHTML;
  } else if (data[state.lvlIndex].type == "labels") {
    const choicesHTML = data[state.lvlIndex].elements[state.cardIndex].labels
      .map(
        (c, i) => `
            <div id="draggable-${i}" class="draggable-label" draggable="true" ondragstart="onDragStart(event);">
                ${c}
            </div>
        `
      )
      .join("");

    const areasHTML = data[state.lvlIndex].elements[state.cardIndex].answer
      .map(
        (c, i) => `
            <div id="zone-${i}" class="label-dropzone img-drop" ondragover="onDragOver(event);" ondrop="onDrop(event);"  style="left: ${c.x}px; top: ${c.y}px;color:white">
            ${c.ignore == true ? `${c.txt}` : ""}${i}
            </div>
            `
      )
      .join("");

    cardHTML = `
            <h1>${data[state.lvlIndex].title}</h1>
            <h4>${data[state.lvlIndex].desc}</h4>
            <div class="label-picture">
                <div class="labels-to-sort">
                        ${choicesHTML}
                </div>
                <div id="labelled-picture" style="
                width: 100%;
                height: 100%;
                background-image: url('${data[state.lvlIndex].elements[state.cardIndex].img}');
                background-size: contain;
                background-position: center; 
                background-repeat: no-repeat;
                max-height:43em
                ">
                ${areasHTML}
                </div>
            </div>
        `;

    state = {
      cardIndex: state.cardIndex,
      lvlIndex: state.lvlIndex,
      checkAnswer: true,
      score: state.score,
      name: state.name,
    };

    document.getElementById("game-area").innerHTML = cardHTML;
  }

  // document.getElementById('game-area').innerHTML = cardHTML
}

function checkAnswer(data) {
  var sucessSoundHtml = `
        <audio autoplay>
            <source src="Style/success.mp3" type="audio/mpeg">
        </audio>
    `;

  var failSoundHtml = `
    <audio autoplay>
            <source src="Style/fail.mp3" type="audio/mpeg">
        </audio>
    `;
  if (data[state.lvlIndex].type == "MCQ") {
    var answer = document.querySelector(`input[name="choice"][value="${data[state.lvlIndex].elements[state.cardIndex].answer}"]`);
    var label = document.querySelector(`label[for="${answer.id}"]`);
    const textElement = document.getElementById("MCQ-Answer");

    let selectedChoice = document.querySelector('input[name="choice"]:checked');

    if (selectedChoice == null) {
      alert("You need to select an answer");
      state.checkAnswer = true;
    } else if (selectedChoice != null && answer.id != selectedChoice.id) {
      textElement.classList.add("bounceInFromLeft");
      textElement.style.backgroundColor = "lightsalmon";
      textElement.style.borderRadius = "10px";
      textElement.style.textShadow = "0 0 15px white, 0 0 25px white, 0 0 50px white";

      document.getElementById("game-area").innerHTML += failSoundHtml;

      state.checkAnswer = false;

      document.querySelector(`label[for="${selectedChoice.id}"]`).style.backgroundColor = "#FAEDCE";
    } else {
      textElement.classList.add("bounceInFromLeft");
      textElement.style.backgroundColor = "lightgreen";
      textElement.style.borderRadius = "10px";
      textElement.style.textShadow = "0 0 15px white, 0 0 25px white, 0 0 50px white";

      document.querySelector(`label[for="${selectedChoice.id}"]`).style.backgroundColor = "#FAEDCE";

      document.getElementById("game-area").innerHTML += sucessSoundHtml;

      state.score = state.score + 10;

      state.checkAnswer = false;
    }

    state.questionScore = state.score;
  } else if (data[state.lvlIndex].type == "sort") {
    data[state.lvlIndex].elements[state.cardIndex].answer.forEach((a, i) => {
      if (a.ignore == false) {
        var studentAns = document.getElementById(`zone-${i}`).textContent.replace(/\s+/g, "");

        if (studentAns.toLowerCase() == a.txt.toLowerCase()) {
          document.getElementById(`zone-${i}`).style.backgroundColor = "lightgreen";
          state.score = state.score + 10;
        } else {
          document.getElementById(`zone-${i}`).style.backgroundColor = "lightsalmon";
        }
      }
      state.checkAnswer = false;
    });

    var sentence = data[state.lvlIndex].elements[state.cardIndex].answer.map((item) => item.txt).join(" ");
    document.getElementById("sentence").innerHTML += `<h4>Answer: ${sentence}</h4>`;
  } else if (data[state.lvlIndex].type == "labels") {
    document.getElementsByClassName("labels-to-sort")[0].innerHTML = ``;
    data[state.lvlIndex].elements[state.cardIndex].answer.forEach((a, i) => {
      var studentAns = document.getElementById(`zone-${i}`).textContent.replace(/\d+/g, "").replace(/\s+/g, " ").trim();

      document.getElementsByClassName("labels-to-sort")[0].innerHTML += `
      <div id="draggable-${i}" class="draggable-label ans-label">
            ${i} - ${a.label}
            </div>
      `;

      if (studentAns.toLowerCase() == a.label.toLowerCase()) {
        document.getElementById(`zone-${i}`).style.backgroundColor = "lightgreen";
        state.score = state.score + 10;
      } else {
        document.getElementById(`zone-${i}`).style.backgroundColor = "lightsalmon";
      }
      state.checkAnswer = false;
    });
  }

  document.getElementById("score").innerHTML = `Score: ${state.score}`;

  if (data[state.lvlIndex].type != "vocab" && data[state.lvlIndex].elements.length == state.cardIndex + 1) {
    state.showReward = true;
  }
}

fetch("/api/game")
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("next").onclick = () => {
      if (state.checkAnswer == true) {
        checkAnswer(data);
      } else if (state.showReward == true) {
        setState(
          {
            cardIndex: state.cardIndex,
            lvlIndex: state.lvlIndex,
            checkAnswer: state.checkAnswer,
            score: state.score,
            name: state.name,
            questionScore: state.questionScore,
            rewardImgStatus: state.rewardImgStatus,
            showReward: true,
          },
          data
        );
        state.showReward = false;
      } else if (state.cardIndex + 1 == data[state.lvlIndex].elements.length && state.lvlIndex + 1 == data.length) {
        // var cardHTML = `
        //     <h1>Congratulations</h1>
        //     <h4> You have reached the end of this stage!</h4>
        //     <div class="enter-score">
        //         <h3>New High Score!</h3>
        //         <h5>Enter your username to go onto the leaderboard</h5>
        //         <div>
        //             <label for="user">User:</label>
        //             <input type="text" id="user" name="user">
        //         <div>
        //         <p>Score: ${state.score}</p>
        //         <div id="button-nav">
        //             <button type="button" id="nextStageButton">Go to Next Stage</button>
        //             <a href="index.html" onclick="AddToLeaderboard()" >Go back to Leaderboard</a>
        //         </div>
        //     </div>
        //     `;

        var cardHTML = `
   <div class="results-summary-container">
      <div class="confetti">
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
        <div class="confetti-piece"></div>
      </div>
      <div class="results-summary-container__result">
        <div class="heading-tertiary">Your Result</div>
        <div class="result-box">
          <div class="heading-primary">${state.score}</div>
          <!-- <p class="result">of 100</p> -->
        </div>
        <div class="result-text-box">
          <div class="heading-secondary">excellent</div>
          <p class="paragraph">
            We will send a certicate to your email to share your success with family and friends!
          </p>
        </div>
        <div style="font-size:20pt; color:white;">
            <label for="user">Name:</label>
            <input type="text" id="user" name="user" style="font-size:20pt; ">
        </div>
        <br>
        <div style="font-size:20pt; color:white;">
            <label for="age">Age:</label>
            <input type="number" id="age" name="age" style="font-size:20pt; ">
        </div>    
        <div class="summary__cta">
          <button class="btn btn__continue">Continue 
        </button>
        </div>
      </div>
    </div>
        `;
        document.getElementById("game-area").innerHTML = cardHTML;
        document.getElementById('nav').style.opacity="0%"
      } else if (state.cardIndex + 1 == data[state.lvlIndex].elements.length) {
        setState(
          {
            cardIndex: 0,
            lvlIndex: ++state.lvlIndex,
            checkAnswer: false,
            score: state.score,
            name: state.name,
          },
          data
        );
      } else {
        setState(
          {
            cardIndex: ++state.cardIndex,
            lvlIndex: state.lvlIndex,
            checkAnswer: false,
            score: state.score,
            name: state.name,
          },
          data
        );
      }
    };

    render(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

window.AddToLeaderboard = async function (event) {
  state.name = document.getElementById("user").value;

  let user = {
    userName: state.name,
    score: state.score,
    ignore: false,
  };

  const response = await fetch("/api/scores", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};

function LoadNextStage() {
  AddToLeaderboard();
  var cardHTML = `
            <h1>New Stage: Talking with a friend</h1>
            <h4>Learn how to mantain small talk with your spanish friend!</h4>
            <div class="enter-score">
                <div class="loader"></div>
            </div>
            `;
  document.getElementById("game-area").innerHTML = cardHTML;
}
