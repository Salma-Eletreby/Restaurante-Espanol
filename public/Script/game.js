let state = {
  cardIndex: 0,
  lvlIndex: -3,
  checkAnswer: false,
  score: 0,
  name: "",
  age: 0,
  rewardImgStatus: ["", "", ""],
  showReward: false,
  confirmation: false,
  questionScore: [0, 0, 0],
};

var rewardHtml = `
    <h1 id="reward-title"> </h1>
    <h4 id="reward-sub"> </h4>
    <div id="reward-img-1">
      <img id="img-reward-1" src="../Style/images/reward.jpg" alt="reward">
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
    draggableElement.style.fontSize = "1.5rem";
    draggableElement.style.color = "black";
  } else {
    alert("This drop zone can only have one label.");
    draggableElement.style.backgroundColor = "cyan";
  }
  event.dataTransfer.clearData();
};

window.toggleCard = function (card) {
  card.classList.toggle("active");
};

var check = 0;
async function render(data) {
  var cardHTML = ``;

  if (state.showReward == true) {
    var mediaQuery = window.matchMedia("(min-width: 1800px)");
    ++check;

    let user = {
      userName: state.name,
      age: state.age,
      questionScore: {
        MCQ: state.questionScore[0],
        label: state.questionScore[1],
        sort: state.questionScore[2],
      },
      totalScore: state.score,
    };

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

    var endScreenHTML = `
        <h1 id="reward-title">Congratulations!</h1>
        <h4 id="reward-sub">You have cleared the image</h4>
        <div id="reward-img">
          <div id="reward-score">
            <img id="img-reward" src="../Style/images/reward.jpg" alt="reward">
            <p id="reward-text">
              Delicious tapas!
              the word tapas, a plural is derived from <br>
              the spanish verb tapar, "to cover", a cognate <br>
              of the English top. <br>
              Tapas is a famous appetizer that can be served <br>
              hot or cold
            </p>
          </div>
        </div>
    `;
    if (state.score >= 80 && check == 3) {
      if (state.rewardImgStatus[2] == "") {
        state.rewardImgStatus[2] = "80";

        if (state.rewardImgStatus[1] == "50" && state.rewardImgStatus[0] == "30") {
          document.getElementById("game-area").innerHTML = endScreenHTML;
        } else if (state.rewardImgStatus[1] == "50" || state.rewardImgStatus[0] == "30") {
          document.getElementById("reward-title").textContent = "Try harder next time!";
          document.getElementById("reward-sub").textContent = "You were close but did not fully clear the image";
        } else {
          document.getElementById("reward-title").textContent = "Amazing!";
          document.getElementById("reward-sub").textContent = "You have cleared part of the image";
        }
      } else {
        state.rewardImgStatus.push("fail");
        document.getElementById("reward-title").textContent = "Oops!";
        document.getElementById("reward-sub").textContent = "No clarity gained. try next round";
      }

      function handleScreenSizeChange(event) {
        if (event.matches) {
          document.getElementById("reward-img").style.marginTop = "5rem";
        }
      }

      handleScreenSizeChange(mediaQuery);

      var allScores = await fetch("/api/scores").then((res) => res.json());
      allScores.push(user);

      allScores.sort((a, b) => b - a);
      var position = allScores.findIndex((u) => u === user) + 1;

      document.getElementById("reward-title").style.margin = "0.5rem";
      document.getElementById("reward-sub").style.margin = "0.5rem";
      document.getElementById("img-reward").style.filter = "blur(0px)";

      var leaderboardHTML = `
      <div id="leaderboard">
        <div class="ribbon"></div>
        <table>
          <tr>
            <td class="number">1</td>
            <td class="name">${allScores[0].userName}</td>
            <td class="points">${allScores[0].totalScore} <img class="gold-medal" src="https://github.com/malunaridev/Challenges-iCodeThis/blob/master/4-leaderboard/assets/gold-medal.png?raw=true" alt="gold medal" /></td>
          </tr>
          <tr>
            <td class="number">2</td>
            <td class="name">${allScores[1].userName}</td>
            <td class="points">${allScores[1].totalScore}</td>
          </tr>
          <tr>
            <td class="number">3</td>
            <td class="name">${allScores[2].userName}</td>
            <td class="points">${allScores[2].totalScore}</td>
          </tr>
          <tr>
            <td class="number">${position}</td>
            <td class="name">${state.name}</td>
            <td class="points">${state.score}</td>
          </tr>
        </table>
      </div>
      `;
      document.getElementById("game-area").innerHTML += leaderboardHTML;
      document.getElementById("game-area").innerHTML += trumpetHtml;
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

      function handleScreenSizeChange1(event) {
        if (event.matches) {
          document.getElementById("reward-img").style.marginTop = "5rem";
        }
      }

      handleScreenSizeChange1(mediaQuery);
    } else if (state.score >= 50 && check == 2) {
      if (state.rewardImgStatus[1] == "") {
        state.rewardImgStatus[1] = "50";

        if (state.rewardImgStatus[0] == "30") {
          document.getElementById("reward-title").textContent = "Impressive Progress!";
          document.getElementById("reward-sub").textContent = "Another part has cleared up.";
        } else {
          document.getElementById("reward-title").textContent = "Amazing!";
          document.getElementById("reward-sub").textContent = "You have cleared part of the image";
        }
      } else {
        state.rewardImgStatus.push("fail");
        document.getElementById("reward-title").textContent = "Oops!";
        document.getElementById("reward-sub").textContent = "No clarity gained. try next round";
      }

      function handleScreenSizeChange(event) {
        if (event.matches) {
          document.getElementById("img-reward-1").style.filter = "blur(15px)";
        }
      }

      handleScreenSizeChange(mediaQuery);

      var allScores = await fetch("/api/scores").then((res) => res.json());
      allScores.push(user);

      allScores.sort((a, b) => b.score - a.score);
      var position = allScores.findIndex((u) => u === user) + 1;

      document.getElementById("reward-title").style.margin = "0.5rem";
      document.getElementById("reward-sub").style.margin = "0.5rem";
      document.getElementById("img-reward-1").style.filter = "blur(2px)";

      var leaderboardHTML = `
      <div id="leaderboard">
        <div class="ribbon"></div>
        <table>
          <tr>
            <td class="number">1</td>
            <td class="name">${allScores[0].userName}</td>
            <td class="points">${allScores[0].totalScore} <img class="gold-medal" src="https://github.com/malunaridev/Challenges-iCodeThis/blob/master/4-leaderboard/assets/gold-medal.png?raw=true" alt="gold medal" /></td>
          </tr>
          <tr>
            <td class="number">2</td>
            <td class="name">${allScores[1].userName}</td>
            <td class="points">${allScores[1].totalScore}</td>
          </tr>
          <tr>
            <td class="number">3</td>
            <td class="name">${allScores[2].userName}</td>
            <td class="points">${allScores[2].totalScore}</td>
          </tr>
          <tr>
            <td class="number">${position}</td>
            <td class="name">${state.name}</td>
            <td class="points">${state.score}</td>
          </tr>
        </table>
      </div>
      `;
      document.getElementById("game-area").innerHTML += leaderboardHTML;
      document.getElementById("game-area").innerHTML += trumpetHtml;

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

      function handleScreenSizeChange1(event) {
        if (event.matches) {
          document.getElementById("img-reward-1").style.filter = "blur(15px)";
        }
      }

      handleScreenSizeChange1(mediaQuery);
    } else if (state.score >= 30) {
      if (state.rewardImgStatus[0] == "") {
        state.rewardImgStatus[0] = "30";

        document.getElementById("reward-title").textContent = "Amazing!";
        document.getElementById("reward-sub").textContent = "You have cleared part of the image";
      } else {
        document.getElementById("reward-title").textContent = "Oops!";
        document.getElementById("reward-sub").textContent = "No clarity gained. try next round";
      }

      function handleScreenSizeChange(event) {
        if (event.matches) {
          document.getElementById("img-reward-1").style.filter = "blur(36px)";
        }
      }

      handleScreenSizeChange(mediaQuery);

      var allScores = await fetch("/api/scores").then((res) => res.json());
      allScores.push(user);

      allScores.sort((a, b) => b - a);
      var position = allScores.findIndex((u) => u === user) + 1;

      document.getElementById("reward-title").style.margin = "0.5rem";
      document.getElementById("reward-sub").style.margin = "0.5rem";
      document.getElementById("img-reward-1").style.filter = "blur(4px)";

      var leaderboardHTML = `
      <div id="leaderboard">
        <div class="ribbon"></div>
        <table>
          <tr>
            <td class="number">1</td>
            <td class="name">${allScores[0].userName}</td>
            <td class="points">${allScores[0].totalScore} <img class="gold-medal" src="https://github.com/malunaridev/Challenges-iCodeThis/blob/master/4-leaderboard/assets/gold-medal.png?raw=true" alt="gold medal" /></td>
          </tr>
          <tr>
            <td class="number">2</td>
            <td class="name">${allScores[1].userName}</td>
            <td class="points">${allScores[1].totalScore}</td>
          </tr>
          <tr>
            <td class="number">3</td>
            <td class="name">${allScores[2].userName}</td>
            <td class="points">${allScores[2].totalScore}</td>
          </tr>
          <tr>
            <td class="number">${position}</td>
            <td class="name">${state.name}</td>
            <td class="points">${state.score}</td>
          </tr>
        </table>
      </div>
      `;
      document.getElementById("game-area").innerHTML += leaderboardHTML;

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
      document.getElementById("game-area").innerHTML += trumpetHtml;

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

      function handleScreenSizeChange1(event) {
        if (event.matches) {
          document.getElementById("img-reward-1").style.filter = "blur(36px)";
        }
      }

      handleScreenSizeChange1(mediaQuery);
    } else {
      document.getElementById("reward-title").textContent = "Oops!";
      document.getElementById("reward-sub").textContent = "No clarity gained. try next round";

      function handleScreenSizeChange(event) {
        if (event.matches) {
          document.getElementById("img-reward-1").style.filter = "blur(50px)";
        }
      }

      handleScreenSizeChange(mediaQuery);

      var allScores = await fetch("/api/scores").then((res) => res.json());
      allScores.push(user);

      allScores.sort((a, b) => b - a);
      var position = allScores.findIndex((u) => u === user) + 1;

      document.getElementById("reward-title").style.margin = "0.5rem";
      document.getElementById("reward-sub").style.margin = "0.5rem";
      document.getElementById("img-reward-1").style.filter = "blur(6px)";

      var leaderboardHTML = `
        <div id="leaderboard">
          <div class="ribbon"></div>
          <table>
            <tr>
              <td class="number">1</td>
              <td class="name">${allScores[0].userName}</td>
              <td class="points">${allScores[0].totalScore} <img class="gold-medal" src="https://github.com/malunaridev/Challenges-iCodeThis/blob/master/4-leaderboard/assets/gold-medal.png?raw=true" alt="gold medal" /></td>
            </tr>
            <tr>
              <td class="number">2</td>
              <td class="name">${allScores[1].userName}</td>
              <td class="points">${allScores[1].totalScore}</td>
            </tr>
            <tr>
              <td class="number">3</td>
              <td class="name">${allScores[2].userName}</td>
              <td class="points">${allScores[2].totalScore}</td>
            </tr>
            <tr>
              <td class="number">${position}</td>
              <td class="name">${state.name}</td>
              <td class="points">${state.score}</td>
            </tr>
          </table>
        </div>
        `;
      document.getElementById("game-area").innerHTML += leaderboardHTML;

      function handleScreenSizeChange1(event) {
        if (event.matches) {
          document.getElementById("img-reward-1").style.filter = "blur(50px)";
        }
      }

      handleScreenSizeChange1(mediaQuery);
    }
  } else if (state.lvlIndex === -2) {
    cardHTML = `
    <div id="user-info-guide">
    <svg id="tooltip" fill="#000000" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" id="memory-tooltip-above"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M2 1H20V2H21V16H20V17H15V18H14V19H13V20H12V21H10V20H9V19H8V18H7V17H2V16H1V2H2V1M3 3V15H8V16H9V17H10V18H12V17H13V16H14V15H19V3H3Z"></path></g><div id="tip-1">Please enter <br>your name<br> and age</div></svg>
          <svg id="Matador1" width="256px" height="256px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#000000" transform="matrix(-1, 0, 0, 1, 0, 0)">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <title>matador</title>
              <g id="matador">
                <path d="M17,34H29V62l-1.061-1.191A7.376,7.376,0,0,1,26.4,58.067L23.972,40.4,18,62h0a9.814,9.814,0,0,1-2.008-5.4Z" style="fill: #f53e28; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></path>
                <path d="M33,26.8a2.007,2.007,0,0,1-1.019-.554l-7.6-7.7a2,2,0,1,1,2.847-2.809l6.858,6.951,9.568-1.7a2,2,0,0,1,.7,3.938l-10.6,1.889A2,2,0,0,1,33,26.8Z" style="fill: #ffce56; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></path>
                <rect x="19" y="7" width="5" height="8" style="fill: #ffe8dc; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></rect>
                <path d="M11.722,28.311a2,2,0,0,0,.957-.655l6.766-8.439a2,2,0,1,0-3.12-2.5l-6.109,7.618-6.692-.715a2,2,0,0,0-.294,3.99l7.741.791A1.994,1.994,0,0,0,11.722,28.311Z" style="fill: #ffce56; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></path>
                <path d="M22,1h1a4,4,0,0,1,4,4v7a0,0,0,0,1,0,0H22.317A4.317,4.317,0,0,1,18,7.683V5A4,4,0,0,1,22,1Z" style="fill: #ffe8dc; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></path>
                <path d="M19.258,15h5.8A3.941,3.941,0,0,1,29,18.941V34a0,0,0,0,1,0,0H17a0,0,0,0,1,0,0V17.258A2.258,2.258,0,0,1,19.258,15Z" style="fill: #ffce56; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></path>
                <line x1="23.972" y1="40.402" x2="28.681" y2="34.407" style="fill: none; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></line>
                <path d="M48.117,18.459l6.6,3.865a4.4,4.4,0,0,1,2.936,3.385l5.161,28.385a2.7,2.7,0,0,1-3.565,3.027l-2.523-1.616c-1.564-.558-1.246-.708-2.885-.435l-1.174.2c-3.664.61-6.346-.985-8.407-4.076h0a12.119,12.119,0,0,0-8.58-5.3l-.959-.12-3.231-10.5L43.349,19.911A4.305,4.305,0,0,1,48.117,18.459Z" style="fill: #f53e28; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></path>
                <line x1="50.857" y1="54.95" x2="51" y2="44" style="fill: #f53e28; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></line>
                <polyline points="38 28 42 33 41 36" style="fill: none; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></polyline>
                <line x1="50" y1="20" x2="51" y2="31" style="fill: none; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></line>
                <line x1="61" y1="45" x2="58" y2="48" style="fill: none; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></line>
                <line x1="50" y1="13" x2="50" y2="10" style="fill: none; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></line>
                <line x1="53" y1="13" x2="55" y2="11" style="fill: none; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></line>
                <line x1="47" y1="13" x2="45" y2="11" style="fill: none; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></line>
              </g>
            </g>
          </svg>
          </div>
        <div id="user-details">
            <div id="age-name-input">
              <div class="coolinput">
                <label class="text" for="name" id="name-label">Name:</label>
                <input class="input" name="name" id="name" placeholder="Write your name here" type="text" />
              </div>
                <div class="coolinput">
                  <label class="text" for="age" id="age-label">Age:</label>
                  <input class="input" name="age" id="age" placeholder="Write your name here" type="number" />
                </div>
            </div>
            <button class="btn" id="play-btn">NEXT</button>
        </div>
      `;

    document.getElementById("game-area").innerHTML = cardHTML;
    document.getElementById("play-btn").style.position = "static";
    document.getElementById("play-btn").style.marginLeft = "0rem";

    const mediaQuery = window.matchMedia("(min-width: 1800px)");

    function handleScreenSizeChange(event) {
      if (event.matches) {
        document.getElementById("play-btn").style.transform = "scale(3)";
        document.getElementById("play-btn").style.marginTop = "20%";
      }
    }

    handleScreenSizeChange(mediaQuery);

    document.getElementById("play-btn").onclick = () => {
      var userName = document.getElementById("name").value;
      var userAge = document.getElementById("age").value;

      if (userName == "") {
        document.getElementById("name").style.border = "0.2rem solid red";
      }
      if (userAge == "") {
        document.getElementById("age").style.border = "0.2rem solid red";
      }
      if (userName != "" && userAge != "") {
        setState(
          {
            cardIndex: 0,
            lvlIndex: 1 + state.lvlIndex,
            checkAnswer: false,
            score: state.score,
            name: userName,
            age: userAge,
            rewardImgStatus: state.rewardImgStatus,
            showReward: state.showReward,
            confirmation: state.confirmation,
            questionScore: state.questionScore,
          },
          data
        );
      }
    };
  } else if (state.lvlIndex == -1) {
    cardHTML = `
    <svg id="tooltip" fill="#000000" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" id="memory-tooltip-above"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M2 1H20V2H21V16H20V17H15V18H14V19H13V20H12V21H10V20H9V19H8V18H7V17H2V16H1V2H2V1M3 3V15H8V16H9V17H10V18H12V17H13V16H14V15H19V3H3Z"></path></g><div id="tip-1">Score higher <br>to uncover<br> the image</div></svg>
          <svg id="Matador1" width="256px" height="256px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#000000" transform="matrix(-1, 0, 0, 1, 0, 0)">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <title>matador</title>
              <g id="matador">
                <path d="M17,34H29V62l-1.061-1.191A7.376,7.376,0,0,1,26.4,58.067L23.972,40.4,18,62h0a9.814,9.814,0,0,1-2.008-5.4Z" style="fill: #f53e28; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></path>
                <path d="M33,26.8a2.007,2.007,0,0,1-1.019-.554l-7.6-7.7a2,2,0,1,1,2.847-2.809l6.858,6.951,9.568-1.7a2,2,0,0,1,.7,3.938l-10.6,1.889A2,2,0,0,1,33,26.8Z" style="fill: #ffce56; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></path>
                <rect x="19" y="7" width="5" height="8" style="fill: #ffe8dc; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></rect>
                <path d="M11.722,28.311a2,2,0,0,0,.957-.655l6.766-8.439a2,2,0,1,0-3.12-2.5l-6.109,7.618-6.692-.715a2,2,0,0,0-.294,3.99l7.741.791A1.994,1.994,0,0,0,11.722,28.311Z" style="fill: #ffce56; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></path>
                <path d="M22,1h1a4,4,0,0,1,4,4v7a0,0,0,0,1,0,0H22.317A4.317,4.317,0,0,1,18,7.683V5A4,4,0,0,1,22,1Z" style="fill: #ffe8dc; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></path>
                <path d="M19.258,15h5.8A3.941,3.941,0,0,1,29,18.941V34a0,0,0,0,1,0,0H17a0,0,0,0,1,0,0V17.258A2.258,2.258,0,0,1,19.258,15Z" style="fill: #ffce56; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></path>
                <line x1="23.972" y1="40.402" x2="28.681" y2="34.407" style="fill: none; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></line>
                <path d="M48.117,18.459l6.6,3.865a4.4,4.4,0,0,1,2.936,3.385l5.161,28.385a2.7,2.7,0,0,1-3.565,3.027l-2.523-1.616c-1.564-.558-1.246-.708-2.885-.435l-1.174.2c-3.664.61-6.346-.985-8.407-4.076h0a12.119,12.119,0,0,0-8.58-5.3l-.959-.12-3.231-10.5L43.349,19.911A4.305,4.305,0,0,1,48.117,18.459Z" style="fill: #f53e28; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></path>
                <line x1="50.857" y1="54.95" x2="51" y2="44" style="fill: #f53e28; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></line>
                <polyline points="38 28 42 33 41 36" style="fill: none; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></polyline>
                <line x1="50" y1="20" x2="51" y2="31" style="fill: none; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></line>
                <line x1="61" y1="45" x2="58" y2="48" style="fill: none; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></line>
                <line x1="50" y1="13" x2="50" y2="10" style="fill: none; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></line>
                <line x1="53" y1="13" x2="55" y2="11" style="fill: none; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></line>
                <line x1="47" y1="13" x2="45" y2="11" style="fill: none; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></line>
              </g>
            </g>
          </svg>
        <h1 id="reward-title">An Image to uncover!</h1>
        <div id="reward-img">
          <div id="reward-score">
            <img id="img-reward" src="../Style/images/reward.jpg" alt="reward">
            <p id="reward-text">
            Reveal the Image: <br>
            <br> Level 1: 30 points
            <br> Level 2: 50 points
            <br>Level 3: 80 points 
            <br><br>Collect points at each level to uncover the image!
            </p>
          </div>
          <button class="btn" id="play-btn">PLAY</button>
        </div>
    `;
    document.getElementById("game-area").innerHTML = cardHTML;

    document.getElementById("play-btn").style.position = "static";
    document.getElementById("play-btn").style.marginLeft = "0rem";

    const mediaQuery = window.matchMedia("(min-width: 1800px)");

    function handleScreenSizeChange(event) {
      if (event.matches) {
        document.getElementById("play-btn").style.transform = "scale(2)";
      }
    }

    handleScreenSizeChange(mediaQuery);

    document.getElementById("play-btn").onclick = () => {
      setState(
        {
          cardIndex: 0,
          lvlIndex: 1 + state.lvlIndex,
          checkAnswer: false,
          score: state.score,
          name: state.name,
          age: state.age,
          rewardImgStatus: state.rewardImgStatus,
          showReward: state.showReward,
          confirmation: state.confirmation,
          questionScore: state.questionScore,
        },
        data
      );
    };
  } else if (data[state.lvlIndex].type == "vocab") {
    document.getElementById("body").style.backgroundImage = `url(${data[state.lvlIndex].bkg})`;
    if (state.cardIndex == 0) {
      var initialHtML = `
        <audio autoplay>
            <source src="Style/start.mp3" type="audio/mpeg">
        </audio>
          <svg id="Matador2" width="256px" height="256px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#000000" transform="matrix(-1, 0, 0, 1, 0, 0)">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <title>matador</title>
              <g id="matador">
                <path d="M17,34H29V62l-1.061-1.191A7.376,7.376,0,0,1,26.4,58.067L23.972,40.4,18,62h0a9.814,9.814,0,0,1-2.008-5.4Z" style="fill: #f53e28; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></path>
                <path d="M33,26.8a2.007,2.007,0,0,1-1.019-.554l-7.6-7.7a2,2,0,1,1,2.847-2.809l6.858,6.951,9.568-1.7a2,2,0,0,1,.7,3.938l-10.6,1.889A2,2,0,0,1,33,26.8Z" style="fill: #ffce56; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></path>
                <rect x="19" y="7" width="5" height="8" style="fill: #ffe8dc; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></rect>
                <path d="M11.722,28.311a2,2,0,0,0,.957-.655l6.766-8.439a2,2,0,1,0-3.12-2.5l-6.109,7.618-6.692-.715a2,2,0,0,0-.294,3.99l7.741.791A1.994,1.994,0,0,0,11.722,28.311Z" style="fill: #ffce56; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></path>
                <path d="M22,1h1a4,4,0,0,1,4,4v7a0,0,0,0,1,0,0H22.317A4.317,4.317,0,0,1,18,7.683V5A4,4,0,0,1,22,1Z" style="fill: #ffe8dc; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></path>
                <path d="M19.258,15h5.8A3.941,3.941,0,0,1,29,18.941V34a0,0,0,0,1,0,0H17a0,0,0,0,1,0,0V17.258A2.258,2.258,0,0,1,19.258,15Z" style="fill: #ffce56; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></path>
                <line x1="23.972" y1="40.402" x2="28.681" y2="34.407" style="fill: none; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></line>
                <path d="M48.117,18.459l6.6,3.865a4.4,4.4,0,0,1,2.936,3.385l5.161,28.385a2.7,2.7,0,0,1-3.565,3.027l-2.523-1.616c-1.564-.558-1.246-.708-2.885-.435l-1.174.2c-3.664.61-6.346-.985-8.407-4.076h0a12.119,12.119,0,0,0-8.58-5.3l-.959-.12-3.231-10.5L43.349,19.911A4.305,4.305,0,0,1,48.117,18.459Z" style="fill: #f53e28; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></path>
                <line x1="50.857" y1="54.95" x2="51" y2="44" style="fill: #f53e28; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></line>
                <polyline points="38 28 42 33 41 36" style="fill: none; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></polyline>
                <line x1="50" y1="20" x2="51" y2="31" style="fill: none; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></line>
                <line x1="61" y1="45" x2="58" y2="48" style="fill: none; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></line>
                <line x1="50" y1="13" x2="50" y2="10" style="fill: none; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></line>
                <line x1="53" y1="13" x2="55" y2="11" style="fill: none; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></line>
                <line x1="47" y1="13" x2="45" y2="11" style="fill: none; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></line>
              </g>
            </g>
          </svg>
        <h1 id="data-title">${data[state.lvlIndex].title}</h1>
        <h4 id="data-subtitle">${data[state.lvlIndex].desc}</h4>
        <div class="card" style="height: 60%;" onclick="toggleCard(this)">
            <h1 style="font-size:5em">Level ${data[state.lvlIndex].id} - Start !</h1>
        </div>
        `;
      document.getElementById("game-area").innerHTML = initialHtML;
      document.getElementById("nav").style.display = "none"

      setTimeout(function () {
        document.getElementById("nav").style.display = "flex";
        document.getElementById("game-area").style.height = "85%";

        var progressPrecentage = ((state.cardIndex + 1) / data[state.lvlIndex].elements.length) * 100;

        document.getElementById("left-side").innerHTML = `
            <div id="progress-bar-outside">
              <div id="progress-bar-inside" style="width:${progressPrecentage}%">  ${state.cardIndex + 1}/${data[state.lvlIndex].elements.length} </div>
            </div>
          `;
        cardHTML = `
          <svg id="tooltip2" fill="#000000" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" id="memory-tooltip-above"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M2 1H20V2H21V16H20V17H15V18H14V19H13V20H12V21H10V20H9V19H8V18H7V17H2V16H1V2H2V1M3 3V15H8V16H9V17H10V18H12V17H13V16H14V15H19V3H3Z"></path></g><div id="tip-2">Click on <br>the card<br> to view the <br>English word</div></svg>
                <svg id="Matador2" width="256px" height="256px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#000000" transform="matrix(-1, 0, 0, 1, 0, 0)">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <title>matador</title>
                    <g id="matador">
                      <path d="M17,34H29V62l-1.061-1.191A7.376,7.376,0,0,1,26.4,58.067L23.972,40.4,18,62h0a9.814,9.814,0,0,1-2.008-5.4Z" style="fill: #f53e28; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></path>
                      <path d="M33,26.8a2.007,2.007,0,0,1-1.019-.554l-7.6-7.7a2,2,0,1,1,2.847-2.809l6.858,6.951,9.568-1.7a2,2,0,0,1,.7,3.938l-10.6,1.889A2,2,0,0,1,33,26.8Z" style="fill: #ffce56; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></path>
                      <rect x="19" y="7" width="5" height="8" style="fill: #ffe8dc; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></rect>
                      <path d="M11.722,28.311a2,2,0,0,0,.957-.655l6.766-8.439a2,2,0,1,0-3.12-2.5l-6.109,7.618-6.692-.715a2,2,0,0,0-.294,3.99l7.741.791A1.994,1.994,0,0,0,11.722,28.311Z" style="fill: #ffce56; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></path>
                      <path d="M22,1h1a4,4,0,0,1,4,4v7a0,0,0,0,1,0,0H22.317A4.317,4.317,0,0,1,18,7.683V5A4,4,0,0,1,22,1Z" style="fill: #ffe8dc; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></path>
                      <path d="M19.258,15h5.8A3.941,3.941,0,0,1,29,18.941V34a0,0,0,0,1,0,0H17a0,0,0,0,1,0,0V17.258A2.258,2.258,0,0,1,19.258,15Z" style="fill: #ffce56; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></path>
                      <line x1="23.972" y1="40.402" x2="28.681" y2="34.407" style="fill: none; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></line>
                      <path d="M48.117,18.459l6.6,3.865a4.4,4.4,0,0,1,2.936,3.385l5.161,28.385a2.7,2.7,0,0,1-3.565,3.027l-2.523-1.616c-1.564-.558-1.246-.708-2.885-.435l-1.174.2c-3.664.61-6.346-.985-8.407-4.076h0a12.119,12.119,0,0,0-8.58-5.3l-.959-.12-3.231-10.5L43.349,19.911A4.305,4.305,0,0,1,48.117,18.459Z" style="fill: #f53e28; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></path>
                      <line x1="50.857" y1="54.95" x2="51" y2="44" style="fill: #f53e28; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></line>
                      <polyline points="38 28 42 33 41 36" style="fill: none; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></polyline>
                      <line x1="50" y1="20" x2="51" y2="31" style="fill: none; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></line>
                      <line x1="61" y1="45" x2="58" y2="48" style="fill: none; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></line>
                      <line x1="50" y1="13" x2="50" y2="10" style="fill: none; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></line>
                      <line x1="53" y1="13" x2="55" y2="11" style="fill: none; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></line>
                      <line x1="47" y1="13" x2="45" y2="11" style="fill: none; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></line>
                    </g>
                  </g>
                </svg>
              <h1 id="data-title">${data[state.lvlIndex].title}</h1>
              <h4 id="data-subtitle">${data[state.lvlIndex].desc}</h4>
              <div class="card" onclick="toggleCard(this)">
                      <div class="vocab-img">
                          <img src="${data[state.lvlIndex].elements[state.cardIndex].img}" alt="img">
                      </div>
                      <audio controls>
                          <source src="${data[state.lvlIndex].elements[state.cardIndex].audio}" type="audio/mpeg">
                          Your browser does not support the audio element.
                      </audio>
                      <p class="spanish">${data[state.lvlIndex].elements[state.cardIndex].spanish}</p>
                      <div class="card__content">
                          <div class="vocab-img">
                              <img src="${data[state.lvlIndex].elements[state.cardIndex].img}" alt="img">
                          </div>
                          <p class="card__title">${data[state.lvlIndex].elements[state.cardIndex].english}</p>
                      </div>
              </div>
              `;

        document.getElementById("game-area").innerHTML = cardHTML;
        document.getElementById("next").innerHTML = `
                    <span class="text">Next</span>
                <span class="icon-Container">
                  <svg width="16" height="19" viewBox="0 0 16 19" fill="nones" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="1.61321" cy="1.61321" r="1.5" fill="black"></circle>
                    <circle cx="5.73583" cy="1.61321" r="1.5" fill="black"></circle>
                    <circle cx="5.73583" cy="5.5566" r="1.5" fill="black"></circle>
                    <circle cx="9.85851" cy="5.5566" r="1.5" fill="black"></circle>
                    <circle cx="9.85851" cy="9.5" r="1.5" fill="black"></circle>
                    <circle cx="13.9811" cy="9.5" r="1.5" fill="black"></circle>
                    <circle cx="5.73583" cy="13.4434" r="1.5" fill="black"></circle>
                    <circle cx="9.85851" cy="13.4434" r="1.5" fill="black"></circle>
                    <circle cx="1.61321" cy="17.3868" r="1.5" fill="black"></circle>
                    <circle cx="5.73583" cy="17.3868" r="1.5" fill="black"></circle>
                  </svg>
                </span>
          `;
        state.confirmation = true;
      }, 2000);
    } else {
      document.getElementById("nav").style.display = "flex";
      document.getElementById("game-area").style.height = "85%";

      var progressPrecentage = ((state.cardIndex + 1) / data[state.lvlIndex].elements.length) * 100;

      document.getElementById("left-side").innerHTML = `
          <div id="progress-bar-outside">
            <div id="progress-bar-inside" style="width:${progressPrecentage}%">  ${state.cardIndex + 1}/${data[state.lvlIndex].elements.length} </div>
          </div>
        `;
      cardHTML = `
        <svg id="tooltip2" fill="#000000" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" id="memory-tooltip-above"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M2 1H20V2H21V16H20V17H15V18H14V19H13V20H12V21H10V20H9V19H8V18H7V17H2V16H1V2H2V1M3 3V15H8V16H9V17H10V18H12V17H13V16H14V15H19V3H3Z"></path></g><div id="tip-2">Click on <br>the card<br> to view the <br>English word</div></svg>
              <svg id="Matador2" width="256px" height="256px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#000000" transform="matrix(-1, 0, 0, 1, 0, 0)">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <title>matador</title>
                  <g id="matador">
                    <path d="M17,34H29V62l-1.061-1.191A7.376,7.376,0,0,1,26.4,58.067L23.972,40.4,18,62h0a9.814,9.814,0,0,1-2.008-5.4Z" style="fill: #f53e28; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></path>
                    <path d="M33,26.8a2.007,2.007,0,0,1-1.019-.554l-7.6-7.7a2,2,0,1,1,2.847-2.809l6.858,6.951,9.568-1.7a2,2,0,0,1,.7,3.938l-10.6,1.889A2,2,0,0,1,33,26.8Z" style="fill: #ffce56; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></path>
                    <rect x="19" y="7" width="5" height="8" style="fill: #ffe8dc; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></rect>
                    <path d="M11.722,28.311a2,2,0,0,0,.957-.655l6.766-8.439a2,2,0,1,0-3.12-2.5l-6.109,7.618-6.692-.715a2,2,0,0,0-.294,3.99l7.741.791A1.994,1.994,0,0,0,11.722,28.311Z" style="fill: #ffce56; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></path>
                    <path d="M22,1h1a4,4,0,0,1,4,4v7a0,0,0,0,1,0,0H22.317A4.317,4.317,0,0,1,18,7.683V5A4,4,0,0,1,22,1Z" style="fill: #ffe8dc; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></path>
                    <path d="M19.258,15h5.8A3.941,3.941,0,0,1,29,18.941V34a0,0,0,0,1,0,0H17a0,0,0,0,1,0,0V17.258A2.258,2.258,0,0,1,19.258,15Z" style="fill: #ffce56; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></path>
                    <line x1="23.972" y1="40.402" x2="28.681" y2="34.407" style="fill: none; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></line>
                    <path d="M48.117,18.459l6.6,3.865a4.4,4.4,0,0,1,2.936,3.385l5.161,28.385a2.7,2.7,0,0,1-3.565,3.027l-2.523-1.616c-1.564-.558-1.246-.708-2.885-.435l-1.174.2c-3.664.61-6.346-.985-8.407-4.076h0a12.119,12.119,0,0,0-8.58-5.3l-.959-.12-3.231-10.5L43.349,19.911A4.305,4.305,0,0,1,48.117,18.459Z" style="fill: #f53e28; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></path>
                    <line x1="50.857" y1="54.95" x2="51" y2="44" style="fill: #f53e28; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></line>
                    <polyline points="38 28 42 33 41 36" style="fill: none; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></polyline>
                    <line x1="50" y1="20" x2="51" y2="31" style="fill: none; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></line>
                    <line x1="61" y1="45" x2="58" y2="48" style="fill: none; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></line>
                    <line x1="50" y1="13" x2="50" y2="10" style="fill: none; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></line>
                    <line x1="53" y1="13" x2="55" y2="11" style="fill: none; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></line>
                    <line x1="47" y1="13" x2="45" y2="11" style="fill: none; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></line>
                  </g>
                </g>
              </svg>
            <h1 id="data-title">${data[state.lvlIndex].title}</h1>
            <h4 id="data-subtitle">${data[state.lvlIndex].desc}</h4>
            <div class="card" onclick="toggleCard(this)">
                    <div class="vocab-img">
                        <img src="${data[state.lvlIndex].elements[state.cardIndex].img}" alt="img">
                    </div>
                    <audio controls>
                        <source src="${data[state.lvlIndex].elements[state.cardIndex].audio}" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                    <p class="spanish">${data[state.lvlIndex].elements[state.cardIndex].spanish}</p>
                    <div class="card__content">
                        <div class="vocab-img">
                            <img src="${data[state.lvlIndex].elements[state.cardIndex].img}" alt="img">
                        </div>
                        <p class="card__title">${data[state.lvlIndex].elements[state.cardIndex].english}</p>
                    </div>
            </div>
            `;

      document.getElementById("game-area").innerHTML = cardHTML;
      document.getElementById("next").innerHTML = `
                  <span class="text">Next</span>
              <span class="icon-Container">
                <svg width="16" height="19" viewBox="0 0 16 19" fill="nones" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="1.61321" cy="1.61321" r="1.5" fill="black"></circle>
                  <circle cx="5.73583" cy="1.61321" r="1.5" fill="black"></circle>
                  <circle cx="5.73583" cy="5.5566" r="1.5" fill="black"></circle>
                  <circle cx="9.85851" cy="5.5566" r="1.5" fill="black"></circle>
                  <circle cx="9.85851" cy="9.5" r="1.5" fill="black"></circle>
                  <circle cx="13.9811" cy="9.5" r="1.5" fill="black"></circle>
                  <circle cx="5.73583" cy="13.4434" r="1.5" fill="black"></circle>
                  <circle cx="9.85851" cy="13.4434" r="1.5" fill="black"></circle>
                  <circle cx="1.61321" cy="17.3868" r="1.5" fill="black"></circle>
                  <circle cx="5.73583" cy="17.3868" r="1.5" fill="black"></circle>
                </svg>
              </span>
        `;
      state.confirmation = true;
    }
  } else if (data[state.lvlIndex].type == "MCQ") {
    document.getElementById("body").style.backgroundImage = `url(${data[state.lvlIndex].bkg})`;

    document.getElementById("left-side").innerHTML = `
    <p id="score">Score: ${state.score}</p>
    `;
    document.getElementById("next").innerHTML = `
    <span class="text">Next</span>
<span class="icon-Container">
  <svg width="16" height="19" viewBox="0 0 16 19" fill="nones" xmlns="http://www.w3.org/2000/svg">
    <circle cx="1.61321" cy="1.61321" r="1.5" fill="black"></circle>
    <circle cx="5.73583" cy="1.61321" r="1.5" fill="black"></circle>
    <circle cx="5.73583" cy="5.5566" r="1.5" fill="black"></circle>
    <circle cx="9.85851" cy="5.5566" r="1.5" fill="black"></circle>
    <circle cx="9.85851" cy="9.5" r="1.5" fill="black"></circle>
    <circle cx="13.9811" cy="9.5" r="1.5" fill="black"></circle>
    <circle cx="5.73583" cy="13.4434" r="1.5" fill="black"></circle>
    <circle cx="9.85851" cy="13.4434" r="1.5" fill="black"></circle>
    <circle cx="1.61321" cy="17.3868" r="1.5" fill="black"></circle>
    <circle cx="5.73583" cy="17.3868" r="1.5" fill="black"></circle>
  </svg>
</span>
`;
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
        <svg id="tooltip2" fill="#000000" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" id="memory-tooltip-above"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M2 1H20V2H21V16H20V17H15V18H14V19H13V20H12V21H10V20H9V19H8V18H7V17H2V16H1V2H2V1M3 3V15H8V16H9V17H10V18H12V17H13V16H14V15H19V3H3Z"></path></g><div id="tip-2">Try to<br>score 30<br> or more to <br>unlcok the image</div></svg>
          <svg id="Matador2" width="256px" height="256px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#000000" transform="matrix(-1, 0, 0, 1, 0, 0)">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <title>matador</title>
              <g id="matador">
                <path d="M17,34H29V62l-1.061-1.191A7.376,7.376,0,0,1,26.4,58.067L23.972,40.4,18,62h0a9.814,9.814,0,0,1-2.008-5.4Z" style="fill: #f53e28; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></path>
                <path d="M33,26.8a2.007,2.007,0,0,1-1.019-.554l-7.6-7.7a2,2,0,1,1,2.847-2.809l6.858,6.951,9.568-1.7a2,2,0,0,1,.7,3.938l-10.6,1.889A2,2,0,0,1,33,26.8Z" style="fill: #ffce56; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></path>
                <rect x="19" y="7" width="5" height="8" style="fill: #ffe8dc; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></rect>
                <path d="M11.722,28.311a2,2,0,0,0,.957-.655l6.766-8.439a2,2,0,1,0-3.12-2.5l-6.109,7.618-6.692-.715a2,2,0,0,0-.294,3.99l7.741.791A1.994,1.994,0,0,0,11.722,28.311Z" style="fill: #ffce56; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></path>
                <path d="M22,1h1a4,4,0,0,1,4,4v7a0,0,0,0,1,0,0H22.317A4.317,4.317,0,0,1,18,7.683V5A4,4,0,0,1,22,1Z" style="fill: #ffe8dc; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></path>
                <path d="M19.258,15h5.8A3.941,3.941,0,0,1,29,18.941V34a0,0,0,0,1,0,0H17a0,0,0,0,1,0,0V17.258A2.258,2.258,0,0,1,19.258,15Z" style="fill: #ffce56; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></path>
                <line x1="23.972" y1="40.402" x2="28.681" y2="34.407" style="fill: none; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></line>
                <path d="M48.117,18.459l6.6,3.865a4.4,4.4,0,0,1,2.936,3.385l5.161,28.385a2.7,2.7,0,0,1-3.565,3.027l-2.523-1.616c-1.564-.558-1.246-.708-2.885-.435l-1.174.2c-3.664.61-6.346-.985-8.407-4.076h0a12.119,12.119,0,0,0-8.58-5.3l-.959-.12-3.231-10.5L43.349,19.911A4.305,4.305,0,0,1,48.117,18.459Z" style="fill: #f53e28; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></path>
                <line x1="50.857" y1="54.95" x2="51" y2="44" style="fill: #f53e28; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></line>
                <polyline points="38 28 42 33 41 36" style="fill: none; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></polyline>
                <line x1="50" y1="20" x2="51" y2="31" style="fill: none; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></line>
                <line x1="61" y1="45" x2="58" y2="48" style="fill: none; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></line>
                <line x1="50" y1="13" x2="50" y2="10" style="fill: none; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></line>
                <line x1="53" y1="13" x2="55" y2="11" style="fill: none; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></line>
                <line x1="47" y1="13" x2="45" y2="11" style="fill: none; stroke: #4c241d; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2px"></line>
              </g>
            </g>
          </svg>
        <h1 id="data-title">${data[state.lvlIndex].title}</h1>
        <h4 id="data-subtitle">${data[state.lvlIndex].desc}</h4>
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
    state.checkAnswer = true;

    document.getElementById("game-area").innerHTML = cardHTML;
  } else if (data[state.lvlIndex].type == "sort") {
    document.getElementById("body").style.backgroundImage = `url(${data[state.lvlIndex].bkg})`;

    document.getElementById("left-side").innerHTML = `
    <p id="score">Score: ${state.score}</p>
    `;

    document.getElementById("next").innerHTML = `
    <span class="text">Next</span>
<span class="icon-Container">
  <svg width="16" height="19" viewBox="0 0 16 19" fill="nones" xmlns="http://www.w3.org/2000/svg">
    <circle cx="1.61321" cy="1.61321" r="1.5" fill="black"></circle>
    <circle cx="5.73583" cy="1.61321" r="1.5" fill="black"></circle>
    <circle cx="5.73583" cy="5.5566" r="1.5" fill="black"></circle>
    <circle cx="9.85851" cy="5.5566" r="1.5" fill="black"></circle>
    <circle cx="9.85851" cy="9.5" r="1.5" fill="black"></circle>
    <circle cx="13.9811" cy="9.5" r="1.5" fill="black"></circle>
    <circle cx="5.73583" cy="13.4434" r="1.5" fill="black"></circle>
    <circle cx="9.85851" cy="13.4434" r="1.5" fill="black"></circle>
    <circle cx="1.61321" cy="17.3868" r="1.5" fill="black"></circle>
    <circle cx="5.73583" cy="17.3868" r="1.5" fill="black"></circle>
  </svg>
</span>
`;

    const choicesHTML = data[state.lvlIndex].elements[state.cardIndex].labels
      .map(
        (c, i) => `
          <div id="word-${i}" class="label-dropzone" ondragover="onDragOver(event);" ondrop="onDrop(event);" ${c.ignore == false ? 'style="background-color:#B5CFB7"' : 'style="background-color:rgba(0, 0, 0, 0);"'} >
                <div id="draggable-${i}" class="draggable-label" ${c.ignore == false ? 'draggable="true" style="position: relative;"' : 'draggable="false" style="position: relative; background-color: rgba(0, 0, 0, 0);"'} draggable="true" ondragstart="onDragStart(event);">
                    ${c.txt}
                </div>
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
            <h1 id="data-title-2">${data[state.lvlIndex].title}</h1>
            <h4 id="data-subtitle-2">${data[state.lvlIndex].desc}</h4>
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
      age: state.age,
      rewardImgStatus: state.rewardImgStatus,
      showReward: state.showReward,
      confirmation: state.confirmation,
      questionScore: state.questionScore,
    };

    document.getElementById("game-area").innerHTML = cardHTML;

    const elements = document.getElementsByClassName("label-dropzone");
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.fontSize = "2.5rem";
    }
  } else if (data[state.lvlIndex].type == "labels") {
    document.getElementById("body").style.backgroundImage = `url(${data[state.lvlIndex].bkg})`;

    document.getElementById("left-side").innerHTML = `
    <p id="score">Score: ${state.score}</p>
    `;

    document.getElementById("next").innerHTML = `
    <span class="text">Next</span>
      <span class="icon-Container">
        <svg width="16" height="19" viewBox="0 0 16 19" fill="nones" xmlns="http://www.w3.org/2000/svg">
          <circle cx="1.61321" cy="1.61321" r="1.5" fill="black"></circle>
          <circle cx="5.73583" cy="1.61321" r="1.5" fill="black"></circle>
          <circle cx="5.73583" cy="5.5566" r="1.5" fill="black"></circle>
          <circle cx="9.85851" cy="5.5566" r="1.5" fill="black"></circle>
          <circle cx="9.85851" cy="9.5" r="1.5" fill="black"></circle>
          <circle cx="13.9811" cy="9.5" r="1.5" fill="black"></circle>
          <circle cx="5.73583" cy="13.4434" r="1.5" fill="black"></circle>
          <circle cx="9.85851" cy="13.4434" r="1.5" fill="black"></circle>
          <circle cx="1.61321" cy="17.3868" r="1.5" fill="black"></circle>
          <circle cx="5.73583" cy="17.3868" r="1.5" fill="black"></circle>
        </svg>
    </span>
`;
    const choicesHTML = data[state.lvlIndex].elements[state.cardIndex].labels
      .map(
        (c, i) => `
          <div id="word-${i}" class="label-dropzone" ondragover="onDragOver(event);" ondrop="onDrop(event);"  style="background-color:#B5CFB7"><span style="  color: rgba(255, 255, 255, 0);">${i}</span>
            <div id="draggable-${i}" class="draggable-label" draggable="true" ondragstart="onDragStart(event);">
                ${c}
            </div>
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
            <h1 id="data-title-2">${data[state.lvlIndex].title}</h1>
            <h4 id="data-subtitle-2">${data[state.lvlIndex].desc}</h4>
            <div class="label-picture">
                <div class="labels-to-sort">
                        ${choicesHTML}
                </div>
                <div id="labelled-picture" style="
                  width: 200%;
                  height: 100%;
                  background-image: url(${data[state.lvlIndex].elements[state.cardIndex].img});
                  background-size: contain;
                  background-position: center;
                  background-repeat: no-repeat;
                  background-size: 100% 100%;
                  min-height: 5em;
                  max-width: 47em;
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
      age: state.age,
      rewardImgStatus: state.rewardImgStatus,
      showReward: state.showReward,
      confirmation: state.confirmation,
      questionScore: state.questionScore,
    };

    document.getElementById("game-area").innerHTML = cardHTML;
  }
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
      var incorrectHTML = `
      <p id="incorrect">The answer is incorrect.<br>The correct answer is ${data[state.lvlIndex].elements[state.cardIndex].answer}</p>
      `;
      Array.from(document.getElementsByClassName("choices"))[0].innerHTML = incorrectHTML;
      document.getElementById("incorrect").classList.add("bounceInFromLeft");
      document.getElementById("incorrect").style.backgroundColor = "lightsalmon";
      document.getElementById("incorrect").style.borderRadius = "10px";
      document.getElementById("incorrect").style.textShadow = "0 0 15px white, 0 0 25px white, 0 0 50px white";

      document.getElementById("game-area").innerHTML += failSoundHtml;

      state.checkAnswer = false;
    } else {
      document.getElementById("game-area").innerHTML += sucessSoundHtml;

      var correctHTML = `
      <p id="correct">The answer is correct.<br>You earned 10 points!</p>
      `;
      Array.from(document.getElementsByClassName("choices"))[0].innerHTML = correctHTML;
      document.getElementById("correct").classList.add("bounceInFromLeft");
      document.getElementById("correct").style.backgroundColor = "lightgreen";
      document.getElementById("correct").style.borderRadius = "10px";
      document.getElementById("correct").style.textShadow = "0 0 15px white, 0 0 25px white, 0 0 50px white";

      state.score = state.score + 10;
      state.questionScore[0] = state.questionScore[0] + 10;
      state.checkAnswer = false;
    }
  } else if (data[state.lvlIndex].type == "sort") {
    var unanswered = false;
    var unansweredSort = [];

    var sortedLabelDivs = document.querySelectorAll(".sorted-labels");
    var dropZones = Array.from(sortedLabelDivs).flatMap((d) => Array.from(d.querySelectorAll(".label-dropzone")));

    Array.from(dropZones).forEach((d, i) => {
      if (d && d.children.length === 0) {
        if (window.getComputedStyle(d).backgroundColor === "rgba(0, 0, 0, 0)") {
        } else {
          unanswered = true;
          unansweredSort.push(d);
        }
      } else {
        d.style.border = "none";
      }
    });

    var questions = document.getElementsByClassName("sort-area");

    if (unanswered == true) {
      alert("Please make sure that all the questions have been answered.");
      unansweredSort.forEach((q) => {
        q.style.border = "0.2rem solid red";
      });
    } else {
      data[state.lvlIndex].elements[state.cardIndex].answer.forEach((a, i) => {
        if (a.ignore == false) {
          var studentAns = document.getElementById(`zone-${i}`).textContent.replace(/\s+/g, "");

          if (studentAns.toLowerCase() == a.txt.toLowerCase()) {
            document.getElementById(`zone-${i}`).style.backgroundColor = "lightgreen";
            state.score = state.score + 10;
            state.questionScore = state.questionScore + 10;
          } else {
            document.getElementById(`zone-${i}`).style.backgroundColor = "lightsalmon";
          }
        }
        state.checkAnswer = false;
      });

      var sentence = data[state.lvlIndex].elements[state.cardIndex].answer.map((item) => item.txt).join(" ");
      document.getElementById("sentence").innerHTML += `<h4>Answer: ${sentence}</h4>`;
      document.getElementById("sentence").classList.add("bounceInFromLeft");
      document.getElementById("sentence").style.backgroundColor = "lightgreen";
      document.getElementById("sentence").style.borderRadius = "10px";
      document.getElementById("sentence").style.textShadow = "0 0 15px white, 0 0 25px white, 0 0 50px white";
      document.getElementById("sentence").style.fontSize = "2em";
    }
  } else if (data[state.lvlIndex].type == "labels") {
    var unanswered = false;
    var unansweredSort = [];

    var sortedLabelDivs = document.querySelectorAll("#labelled-picture");
    var dropZones = Array.from(sortedLabelDivs).flatMap((d) => Array.from(d.querySelectorAll(".label-dropzone")));

    Array.from(dropZones).forEach((d, i) => {
      if (d && d.children.length === 0) {
        if (window.getComputedStyle(d).backgroundColor === "rgba(0, 0, 0, 0)") {
        } else {
          unanswered = true;
          unansweredSort.push(d);
        }
      } else {
        d.style.border = "none";
      }
    });

    var questions = document.getElementsByClassName("sort-area");

    if (unanswered == true) {
      alert("Please make sure that all the questions have been answered.");
      unansweredSort.forEach((q) => {
        q.style.border = "0.2rem solid red";
      });
    } else {
      document.getElementsByClassName("labels-to-sort")[0].innerHTML = ``;
      state.checkAnswer = false;

      data[state.lvlIndex].elements[state.cardIndex].answer.forEach((a, i) => {
        var studentAns = document.getElementById(`zone-${i}`).textContent.replace(/\d+/g, "").replace(/\s+/g, " ").trim();

        document.getElementsByClassName("labels-to-sort")[0].innerHTML += `
      <div id="draggable-${i}" class="draggable-label ans-label">
            ${i} - ${a.label}
            </div>
      `;

        if (studentAns.toLowerCase() == a.label.toLowerCase()) {
          document.getElementById(`zone-${i}`).style.backgroundColor = "lightgreen";
          state.questionScore = state.questionScore + 10;
          state.score = state.score + 10;
        } else {
          document.getElementById(`zone-${i}`).style.backgroundColor = "lightsalmon";
        }
      });
    }
  }

  document.getElementById("score").innerHTML = `Score: ${state.score}`;

  if (data[state.lvlIndex].type != "vocab" && data[state.lvlIndex].elements.length == state.cardIndex + 1) {
    state.showReward = true;
  }
}

fetch("/api/game")
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("play-btn").onclick = () => {
      setState(
        {
          cardIndex: 0,
          lvlIndex: 1 + state.lvlIndex,
          checkAnswer: false,
          score: state.score,
          name: state.name,
          age: state.age,
          rewardImgStatus: state.rewardImgStatus,
          showReward: state.showReward,
          confirmation: state.confirmation,
          questionScore: state.questionScore,
        },
        data
      );
    };

    document.getElementById("next").onclick = () => {
      if (state.checkAnswer == true) {
        checkAnswer(data);
      } else if (state.lvlIndex == -2 || state.lvlIndex == -1) {
        if (state.lvlIndex == -2) {
          var userName = document.getElementById("name").value;
          var userAge = document.getElementById("age").value;

          if (userName == "") {
            document.getElementById("name").style.border = "0.2rem solid red";
          }
          if (userAge == "") {
            document.getElementById("age").style.border = "0.2rem solid red";
          }
          if (userName != "" && userAge != "") {
            setState(
              {
                cardIndex: 0,
                lvlIndex: 1 + state.lvlIndex,
                checkAnswer: false,
                score: state.score,
                name: userName,
                age: userAge,
                rewardImgStatus: state.rewardImgStatus,
                showReward: state.showReward,
                confirmation: state.confirmation,
                questionScore: state.questionScore,
              },
              data
            );
          }
        } else {
          setState(
            {
              cardIndex: 0,
              lvlIndex: 1 + state.lvlIndex,
              checkAnswer: false,
              score: state.score,
              name: state.name,
              age: state.age,
              rewardImgStatus: state.rewardImgStatus,
              showReward: state.showReward,
              confirmation: state.confirmation,
              questionScore: state.questionScore,
            },
            data
          );
        }
      } else if (state.showReward == true) {
        setState(
          {
            cardIndex: state.cardIndex,
            lvlIndex: state.lvlIndex,
            checkAnswer: state.checkAnswer,
            score: state.score,
            name: state.name,
            age: state.age,
            questionScore: state.questionScore,
            rewardImgStatus: state.rewardImgStatus,
            showReward: true,
            confirmation: state.confirmation,
            questionScore: state.questionScore,
          },
          data
        );
        state.showReward = false;
      } else if (state.cardIndex + 1 == data[state.lvlIndex].elements.length && state.lvlIndex + 1 == data.length) {
        AddToLeaderboard();
        document.getElementById("game-area").style.height = "100%";
        var cardHTML = `
   <div class="results-summary-container">
   <div>
   <svg id="first-place" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Flat"> <g id="Color"> <polygon fill="#111315" points="20 20 32 32 39 3 24 3 20 20"></polygon> <polygon fill="#a60416" points="34.89 3 28.68 28.68 23.33 23.33 28.11 3 34.89 3"></polygon> <polygon fill="#212529" points="44 20 32 32 25 3 40 3 44 20"></polygon> <polygon fill="#dd051d" points="40.67 23.33 35.32 28.68 29.11 3 35.89 3 40.67 23.33"></polygon> <path d="M34,39.6l2.22,3.87a2.33,2.33,0,0,0,1.56,1.11l4.45.87A2.25,2.25,0,0,1,43.5,49.2l-3.08,3.26a2.24,2.24,0,0,0-.6,1.8l.53,4.41A2.3,2.3,0,0,1,37.09,61L33,59.13a2.42,2.42,0,0,0-1.94,0L26.91,61a2.3,2.3,0,0,1-3.26-2.32l.53-4.41a2.24,2.24,0,0,0-.6-1.8L20.5,49.2a2.25,2.25,0,0,1,1.25-3.75l4.45-.87a2.33,2.33,0,0,0,1.56-1.11L30,39.6A2.34,2.34,0,0,1,34,39.6Z" fill="#fccd1d"></path> <path d="M32,31a4,4,0,1,0,4,4A4,4,0,0,0,32,31Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,32,37Z" fill="#f9a215"></path> </g> </g> </g></svg>
   </div>
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
            We will send a certificate to your email to share your success with family and friends!
          </p>
        </div>    
        <div class="summary__cta">
        </div>
      </div>
    </div>
        `;
        document.getElementById("game-area").innerHTML = cardHTML;
        document.getElementById("nav").style.opacity = "0%";
      } else if (state.confirmation == true) {
        document.getElementById("next").innerHTML = `
                    <span class="text">If you go to next word, You cannot go back. Click again to confirm.</span>
          <span class="icon-Container">
            <svg width="16" height="19" viewBox="0 0 16 19" fill="nones" xmlns="http://www.w3.org/2000/svg">
              <circle cx="1.61321" cy="1.61321" r="1.5" fill="black"></circle>
              <circle cx="5.73583" cy="1.61321" r="1.5" fill="black"></circle>
              <circle cx="5.73583" cy="5.5566" r="1.5" fill="black"></circle>
              <circle cx="9.85851" cy="5.5566" r="1.5" fill="black"></circle>
              <circle cx="9.85851" cy="9.5" r="1.5" fill="black"></circle>
              <circle cx="13.9811" cy="9.5" r="1.5" fill="black"></circle>
              <circle cx="5.73583" cy="13.4434" r="1.5" fill="black"></circle>
              <circle cx="9.85851" cy="13.4434" r="1.5" fill="black"></circle>
              <circle cx="1.61321" cy="17.3868" r="1.5" fill="black"></circle>
              <circle cx="5.73583" cy="17.3868" r="1.5" fill="black"></circle>
            </svg>
          </span>
          `;
        state.confirmation = !state.confirmation;
      } else if (state.cardIndex + 1 == data[state.lvlIndex].elements.length) {
        setState(
          {
            cardIndex: 0,
            lvlIndex: ++state.lvlIndex,
            checkAnswer: false,
            score: state.score,
            name: state.name,
            age: state.age,
            rewardImgStatus: state.rewardImgStatus,
            showReward: state.showReward,
            confirmation: state.confirmation,
            questionScore: state.questionScore,
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
            age: state.age,
            rewardImgStatus: state.rewardImgStatus,
            showReward: state.showReward,
            confirmation: state.confirmation,
            questionScore: state.questionScore,
          },
          data
        );
      }
    };
  })
  .catch((error) => {
    console.error("Error:", error);
  });

window.AddToLeaderboard = async function (event) {
  let user = {
    userName: state.name,
    age: state.age,
    questionScore: {
      MCQ: state.questionScore[0],
      label: state.questionScore[1],
      sort: state.questionScore[2],
    },
    totalScore: state.score,
  };

  const response = await fetch("/api/scores", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};

document.addEventListener("DOMContentLoaded", function () {
  const texts = [
    `
Welcome to 
the Spanish 
Restaurant!`,
    `My name is 
José and I’ll 
be your mentor 
in this game`,
    `As you 
progress through 
the levels, 
you will collect 
points.`,
    `Use these points 
to unlock parts of 
an exciting image 
related to Spanish 
culture!`,
    `

Enjoy the game 
and have fun!
`,
  ];

  const textContainer = document.getElementById("speech-1");
  let index = 0;
  let textIndex = 0;

  function typeLetter() {
    if (index < texts[textIndex].length) {
      textContainer.innerHTML += texts[textIndex][index];
      index++;
      setTimeout(typeLetter, 100); // Adjust the speed here
    } else if (textIndex < texts.length - 1) {
      setTimeout(() => {
        index = 0;
        textIndex++;
        textContainer.innerHTML = ""; // Clear the container for new text
        typeLetter();
      }, 1000); // 5-second delay before changing the text
    }
  }

  typeLetter();
});
