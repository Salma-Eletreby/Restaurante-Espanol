let state = {
  cardIndex: 0,
  lvlIndex: -3,
  checkAnswer: false,
  score: 0,
  name: "",
  age: 0,
  rewardImgStatus: [],
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
  } else {
    alert("This drop zone can only have one label.");
    draggableElement.style.backgroundColor = "cyan";
  }
  event.dataTransfer.clearData();
};

window.toggleCard = function (card) {
  card.classList.toggle("active");
};

async function render(data) {
  var cardHTML = ``;

  if (state.showReward == true) {
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

    if (state.score >= 80) {
      var allScores = await fetch("/api/scores").then((res) => res.json());
      allScores.push(user);

      allScores.sort((a, b) => b - a);
      var position = allScores.findIndex((u) => u === user) + 1;

      document.getElementById("reward-title").textContent = "Amazing!";
      document.getElementById("reward-sub").textContent = "You have cleared part of the image";

      document.getElementById("reward-title").style.margin = "0.5rem";
      document.getElementById("reward-sub").style.margin = "0.5rem";
      document.getElementById("img-reward-1").style.filter = "blur(0px)";

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

      const mediaQuery = window.matchMedia("(min-width: 1920px)");

      function handleScreenSizeChange(event) {
        if (event.matches) {
        }
      }

      handleScreenSizeChange(mediaQuery);
    } else if (state.score >= 50) {
      var allScores = await fetch("/api/scores").then((res) => res.json());
      allScores.push(user);

      allScores.sort((a, b) => b.score - a.score);
      var position = allScores.findIndex((u) => u === user) + 1;

      document.getElementById("reward-title").textContent = "Amazing!";
      document.getElementById("reward-sub").textContent = "You have cleared part of the image";

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

      const mediaQuery = window.matchMedia("(min-width: 1920px)");

      function handleScreenSizeChange(event) {
        if (event.matches) {
          document.getElementById("img-reward-1").style.filter = "blur(3px)";
        }
      }

      handleScreenSizeChange(mediaQuery);
    } else if (state.score >= 30) {
      var allScores = await fetch("/api/scores").then((res) => res.json());
      allScores.push(user);

      allScores.sort((a, b) => b - a);
      var position = allScores.findIndex((u) => u === user) + 1;

      document.getElementById("reward-title").textContent = "Amazing!";
      document.getElementById("reward-sub").textContent = "You have cleared part of the image";

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

      const mediaQuery = window.matchMedia("(min-width: 1920px)");

      function handleScreenSizeChange(event) {
        if (event.matches) {
          document.getElementById("img-reward-1").style.filter = "blur(6px)";
        }
      }

      handleScreenSizeChange(mediaQuery);
    } else {
    }
  } else if (state.lvlIndex === -2) {
    cardHTML = `
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
              Earn at least:
              <br>30 points by Level 1
              <br>50 points by level 2
              <br>80 points by level 3
              <br>to gradually reveal the image
            </p>
          </div>
          <button class="btn" id="play-btn">PLAY</button>
        </div>
    `;
    document.getElementById("game-area").innerHTML = cardHTML;

    document.getElementById("play-btn").style.position = "static";
    document.getElementById("play-btn").style.marginLeft = "0rem";

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
                    <img src="${data[state.lvlIndex].elements[state.cardIndex].img}" alt="${data[state.lvlIndex].elements[state.cardIndex].english}">
                </div>
                <audio controls>
                    <source src="${data[state.lvlIndex].elements[state.cardIndex].audio}" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
                <p class="spanish">${data[state.lvlIndex].elements[state.cardIndex].spanish}</p>
                <div class="card__content">
                    <div class="vocab-img">
                        <img src="${data[state.lvlIndex].elements[state.cardIndex].img}" alt="${data[state.lvlIndex].elements[state.cardIndex].english}">
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
  } else if (data[state.lvlIndex].type == "MCQ") {
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
                <div id="draggable-${i}" class="draggable-label" ${c.ignore == false ? 'draggable="true" style="font-size:2.5rem;position: relative;"' : 'draggable="false" style="font-size:2.5rem;position: relative; background-color: rgba(0, 0, 0, 0);"'} draggable="true" ondragstart="onDragStart(event);">
                    ${c.txt}
                </div>
          </div>
            `
      )
      .join("");

    const sortedHTML = data[state.lvlIndex].elements[state.cardIndex].answer
      .map(
        (c, i) => `
            <div id="zone-${i}" class="label-dropzone" ondragover="onDragOver(event);" ondrop="onDrop(event);" ${c.ignore == false ? "" : ' style="background-color: rgba(0, 0, 0, 0);font-size:2.5rem;"'}">
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
      age: state.age,
      rewardImgStatus: state.rewardImgStatus,
      showReward: state.showReward,
      confirmation: state.confirmation,
      questionScore: state.questionScore,
    };

    document.getElementById("game-area").innerHTML = cardHTML;
  } else if (data[state.lvlIndex].type == "labels") {
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
          <div id="word-${i}" class="label-dropzone" ondragover="onDragOver(event);" ondrop="onDrop(event);"  style="background-color:#B5CFB7">
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
      age: state.age,
      rewardImgStatus: state.rewardImgStatus,
      showReward: state.showReward,
      confirmation: state.confirmation,
      questionScore: state.questionScore,
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
      var incorrectHTML = `
      <p id="incorrect">The answer is incorrect.The correct answer is ${data[state.lvlIndex].elements[state.cardIndex].answer}</p>
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
      <p id="correct">The answer is correct.You earned 10 points!</p>
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
  } else if (data[state.lvlIndex].type == "labels") {
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
        var cardHTML = `
   <div class="results-summary-container">
   <div>
   <svg id="first-place" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--emojione" preserveAspectRatio="xMidYMid meet" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#428bc1" d="M46.1 2L34.8 18.9h5.6L53 2z"> </path> <path fill="#e8e8e8" d="M40.4 2L29.2 18.9h5.6L46.1 2z"> </path> <path fill="#ed4c5c" d="M34.8 2L23.6 18.9h5.6L40.4 2z"> </path> <g fill="#ffce31"> <circle cx="32" cy="41.4" r="20.6"> </circle> <path d="M21.7 15.1c-.5 0-.9.4-.9.9v8.4c0 .5.4.9.9.9h20.6c.5 0 .9-.4.9-.9V16c0-.5-.4-.9-.9-.9H21.7m19.7 6.6c0 .5-.4.9-.9.9H23.6c-.5 0-.9-.4-.9-.9v-3.8c0-.5.4-.9.9-.9h16.9c.5 0 .9.4.9.9v3.8"> </path> </g> <path d="M14.3 43.8c0-11.2 8.6-20.3 19.6-21.1c-.5 0-1.1-.1-1.6-.1c-10.5 0-19 8.5-19 19.1c0 3.1.8 6.1 2.1 8.7c-.7-2.1-1.1-4.3-1.1-6.6" opacity=".5" fill="#89664c"> </path> <path d="M39.9 57.3C49.2 51.1 52 39 46.6 29.6l.9 1.2c5.8 8.6 3.4 20.3-5.3 26.2c-2.6 1.8-5.5 2.8-8.4 3.1c2.2-.6 4.2-1.5 6.1-2.8" opacity=".33" fill="#ffffff"> </path> <path fill="#ed4c5c" d="M23.6 18.9h5.6L17.9 2H11z"> </path> <path fill="#e8e8e8" d="M29.2 18.9h5.6L23.6 2h-5.7z"> </path> <path opacity=".5" fill="#3e4347" d="M32.9 4.8L30.1 9l6.6 9.9h3.7l1-1.4z"> </path> <path fill="#428bc1" d="M34.8 18.9h5.6L29.2 2h-5.6z"> </path> <g fill="#89664c"> <path d="M26.8 35.2v1c1 0 1.9-.2 2.8-.6v-1.4c-.8.6-1.7.9-2.8 1" opacity=".5"> </path> <path opacity=".5" d="M33.4 28.7h.9v21.6h-.9z"> </path> <path opacity=".5" d="M37.2 51.2V54H26.8v1h11.3v-3.8z"> </path> </g> <g fill="#ffffff"> <path opacity=".33" d="M34.3 50.3h2.8v.9h-2.8z"> </path> <path d="M30.6 28.7h2.8v-.9h-3.8c0 2.1-1.7 3.8-3.8 3.8v3.7c.3 0 .6 0 .9-.1v-2.8c2.2.1 3.9-1.6 3.9-3.7" opacity=".33"> </path> <path d="M30.6 51.2v-16c-.3.2-.6.3-.9.5v14.6h-3.8V54h.9v-2.8h3.8" opacity=".33"> </path> </g> </g></svg>
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
            We will send a certicate to your email to share your success with family and friends!
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
