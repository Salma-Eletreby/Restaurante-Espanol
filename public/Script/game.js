let state = {
  cardIndex: 0,
  lvlIndex: -3,
  checkAnswer: false,
  score: 0,
  name: "",
  age:0,
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
  } else if (state.lvlIndex === -2) {
    document.getElementById("nav").style.opacity = "100%";
    cardHTML = `
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 504.454 504.454" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path style="fill:#890729;" d="M294.448,214.646c11.272-10.027,33.296-3.663,49.231,14.218 c15.888,17.881,85.016,114.018,73.759,124.062c-11.296,10.012-98.721-69.892-114.617-87.773 C286.933,247.296,283.184,224.681,294.448,214.646z"></path> <path style="fill:#A81333;" d="M270.557,231.542c-0.89-15.061-20.968-26.136-44.859-24.757 c-23.883,1.402-140.737,20.512-139.91,35.572c0.922,15.061,119.249,20.385,143.124,18.983 C252.771,259.954,271.423,246.603,270.557,231.542z"></path> <g> <path style="fill:#0C44C1;" d="M236.245,362.252c0,19.495-15.817,124.66-35.328,124.66c-19.503,0-35.312-105.173-35.312-124.66 c0-19.511,15.817-35.32,35.312-35.32C220.428,326.924,236.245,342.741,236.245,362.252z"></path> <path style="fill:#0C44C1;" d="M354.596,362.252c0,19.495-15.825,124.66-35.336,124.66c-19.503,0-35.296-105.173-35.296-124.66 c0-19.511,15.801-35.32,35.296-35.32C338.771,326.924,354.596,342.741,354.596,362.252z"></path> </g> <path style="fill:#A81333;" d="M359.731,315.573c0,126.338-44.591,84.259-99.643,84.259c-55.028,0-99.643,42.079-99.643-84.259 c0-72.231,44.631-130.773,99.643-130.773C315.124,184.8,359.731,243.342,359.731,315.573z"></path> <g> <rect x="205.935" y="204.469" style="fill:#B1C2C4;" width="13.785" height="76.154"></rect> <rect x="300.458" y="204.469" style="fill:#B1C2C4;" width="13.785" height="76.154"></rect> </g> <path style="fill:#0A234F;" d="M240.656,487.558c0,14.935-17.81,16.896-39.731,16.896c-21.945,0-39.747-1.953-39.747-16.896 c0-14.95,17.802-35.509,39.747-35.509C222.854,452.049,240.656,472.608,240.656,487.558z"></path> <path style="fill:#031530;" d="M240.656,487.558c0,14.935-17.81,16.896-39.731,16.896c-21.945,0-39.747-1.953-39.747-16.896"></path> <path style="fill:#0A234F;" d="M359.015,487.558c0,14.935-17.802,16.896-39.739,16.896s-39.739-1.953-39.739-16.896 c0-14.95,17.802-35.509,39.739-35.509S359.015,472.608,359.015,487.558z"></path> <path style="fill:#031530;" d="M359.015,487.558c0,14.935-17.802,16.896-39.739,16.896s-39.739-1.953-39.739-16.896"></path> <path style="fill:#B1C2C4;" d="M389.042,124.589c0,63.015-57.746,94.681-128.945,94.681c-71.207,0-128.961-31.665-128.961-94.681 S188.889,0.331,260.096,0.331C331.296,0.331,389.042,61.574,389.042,124.589z"></path> <path style="fill:#BC8158;" d="M389.042,124.589c0,63.015-57.746,94.681-128.945,94.681c-71.207,0-128.961-31.665-128.961-94.681"></path> <circle style="fill:#113E49;" cx="199.097" cy="145.967" r="11.532"></circle> <path d="M210.629,145.959c0,6.388-5.167,11.54-11.54,11.54s-11.524-5.152-11.524-11.54"></path> <path style="fill:#E5A376;" d="M221.846,170.008c-0.614,0-1.237-0.213-1.725-0.709c-5.632-5.632-13.107-8.72-21.055-8.72h-0.008 c-7.94,0-15.399,3.096-21.008,8.704c-0.945,0.953-2.481,0.985-3.426,0.016c-0.945-0.922-0.985-2.458-0.032-3.419 c6.538-6.554,15.218-10.169,24.458-10.169h0.008c9.271,0,17.959,3.6,24.513,10.153c0.937,0.937,0.937,2.505,0,3.434 C223.106,169.787,222.492,170.008,221.846,170.008z"></path> <circle style="fill:#113E49;" cx="321.78" cy="145.967" r="11.524"></circle> <path d="M310.217,145.959c0,6.388,5.144,11.54,11.532,11.54c6.372,0,11.516-5.152,11.516-11.54"></path> <path style="fill:#E5A376;" d="M298.993,170.008c0.607,0,1.237-0.213,1.709-0.709c5.64-5.632,13.123-8.72,21.055-8.72h0.016 c7.932,0,15.415,3.096,21.016,8.704c0.937,0.953,2.473,0.985,3.434,0.016c0.945-0.922,0.961-2.458,0.008-3.419 c-6.498-6.554-15.21-10.169-24.45-10.169h-0.016c-9.24,0-17.936,3.6-24.505,10.153c-0.922,0.937-0.922,2.505,0,3.434 C297.74,169.787,298.339,170.008,298.993,170.008z"></path> <path d="M260.088,166.4c-31.295,0-57.084,19.062-60.967,43.741c6.341,2.127,13.036,3.828,19.968,5.199 c6.609-18.306,22.465-31.216,40.999-31.216c18.534,0,34.399,12.91,41.007,31.232c6.924-1.386,13.619-3.096,19.952-5.199 C317.165,185.478,291.383,166.4,260.088,166.4z"></path> <path d="M180.516,167.479c-15.376-14.108-33.233-21.079-46.411-19.582c8.491,32.059,34.84,53.311,70.073,63.756 C204.32,198.451,195.718,181.437,180.516,167.479z"></path> <path d="M386.119,147.708c-12.879-0.37-29.46,6.554-43.867,19.771c-14.903,13.674-23.497,30.326-23.694,43.418 C352.579,200.176,377.88,179.113,386.119,147.708z"></path> <g> <ellipse style="fill:#B1C2C4;" cx="166.55" cy="21.173" rx="37.415" ry="21.173"></ellipse> <ellipse style="fill:#B1C2C4;" cx="203.965" cy="21.173" rx="37.415" ry="21.173"></ellipse> <ellipse style="fill:#B1C2C4;" cx="241.357" cy="21.173" rx="37.415" ry="21.173"></ellipse> <ellipse style="fill:#B1C2C4;" cx="278.796" cy="21.173" rx="37.415" ry="21.173"></ellipse> <ellipse style="fill:#B1C2C4;" cx="316.212" cy="21.173" rx="37.415" ry="21.173"></ellipse> <ellipse style="fill:#B1C2C4;" cx="353.603" cy="21.173" rx="37.415" ry="21.173"></ellipse> <path style="fill:#B1C2C4;" d="M160.445,315.573c0,126.338,44.615,100.1,99.643,100.1c55.052,0,99.643,26.238,99.643-100.1 c0-16.51-2.434-32.232-6.688-46.773H167.117C162.871,283.341,160.445,299.063,160.445,315.573z"></path> </g> </g></svg>
      <span class="tooltipChef" id="tooltipChef">Enter your details and choose your skill level!</span>
        <div id="user-details">
          <div>
              <div class="input__container">
                <div class="shadow__input"></div>
                <button class="input__button__shadow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#000000"
                    width="20px"
                    height="20px"
                  >
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path
                      d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                    ></path>
                  </svg>
                </button>
                <input
                  type="text"
                  name="username"
                  class="input__search"
                  placeholder="Enter username"
                  id="name"
                />
              </div>
          </div>
          <div>
          <div class="input__container age_input">
            <div class="shadow__input"></div>
            <button class="input__button__shadow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#000000"
                width="20px"
                height="20px"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                ></path>
              </svg>
            </button>
            <input
              type="number"
              name="age"
              class="input__search"
              placeholder="Enter Age"
              id="age"
            />
        </div>

          </div>
          <div>
          </div>
            <div class="skill-level">
              <input type="radio" id="new" name="skill" value="new">
              <label for="new">I'm new to Spanish</label><br>
            </div>
            <div class="skill-level">
              <input type="radio" id="common" name="skill" value="common">
              <label for="common">I know some common words</label><br>
            </div>
            <div class="skill-level">
              <input type="radio" id="conversation" name="skill" value="conversation">
              <label for="conversation">I can have basic conversation</label><br>
            </div>
          </div>
        </div>
      `;

    document.getElementById("game-area").innerHTML = cardHTML;
  } else if(state.lvlIndex == -1){
    cardHTML = `
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 504.454 504.454" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path style="fill:#890729;" d="M294.448,214.646c11.272-10.027,33.296-3.663,49.231,14.218 c15.888,17.881,85.016,114.018,73.759,124.062c-11.296,10.012-98.721-69.892-114.617-87.773 C286.933,247.296,283.184,224.681,294.448,214.646z"></path> <path style="fill:#A81333;" d="M270.557,231.542c-0.89-15.061-20.968-26.136-44.859-24.757 c-23.883,1.402-140.737,20.512-139.91,35.572c0.922,15.061,119.249,20.385,143.124,18.983 C252.771,259.954,271.423,246.603,270.557,231.542z"></path> <g> <path style="fill:#0C44C1;" d="M236.245,362.252c0,19.495-15.817,124.66-35.328,124.66c-19.503,0-35.312-105.173-35.312-124.66 c0-19.511,15.817-35.32,35.312-35.32C220.428,326.924,236.245,342.741,236.245,362.252z"></path> <path style="fill:#0C44C1;" d="M354.596,362.252c0,19.495-15.825,124.66-35.336,124.66c-19.503,0-35.296-105.173-35.296-124.66 c0-19.511,15.801-35.32,35.296-35.32C338.771,326.924,354.596,342.741,354.596,362.252z"></path> </g> <path style="fill:#A81333;" d="M359.731,315.573c0,126.338-44.591,84.259-99.643,84.259c-55.028,0-99.643,42.079-99.643-84.259 c0-72.231,44.631-130.773,99.643-130.773C315.124,184.8,359.731,243.342,359.731,315.573z"></path> <g> <rect x="205.935" y="204.469" style="fill:#B1C2C4;" width="13.785" height="76.154"></rect> <rect x="300.458" y="204.469" style="fill:#B1C2C4;" width="13.785" height="76.154"></rect> </g> <path style="fill:#0A234F;" d="M240.656,487.558c0,14.935-17.81,16.896-39.731,16.896c-21.945,0-39.747-1.953-39.747-16.896 c0-14.95,17.802-35.509,39.747-35.509C222.854,452.049,240.656,472.608,240.656,487.558z"></path> <path style="fill:#031530;" d="M240.656,487.558c0,14.935-17.81,16.896-39.731,16.896c-21.945,0-39.747-1.953-39.747-16.896"></path> <path style="fill:#0A234F;" d="M359.015,487.558c0,14.935-17.802,16.896-39.739,16.896s-39.739-1.953-39.739-16.896 c0-14.95,17.802-35.509,39.739-35.509S359.015,472.608,359.015,487.558z"></path> <path style="fill:#031530;" d="M359.015,487.558c0,14.935-17.802,16.896-39.739,16.896s-39.739-1.953-39.739-16.896"></path> <path style="fill:#B1C2C4;" d="M389.042,124.589c0,63.015-57.746,94.681-128.945,94.681c-71.207,0-128.961-31.665-128.961-94.681 S188.889,0.331,260.096,0.331C331.296,0.331,389.042,61.574,389.042,124.589z"></path> <path style="fill:#BC8158;" d="M389.042,124.589c0,63.015-57.746,94.681-128.945,94.681c-71.207,0-128.961-31.665-128.961-94.681"></path> <circle style="fill:#113E49;" cx="199.097" cy="145.967" r="11.532"></circle> <path d="M210.629,145.959c0,6.388-5.167,11.54-11.54,11.54s-11.524-5.152-11.524-11.54"></path> <path style="fill:#E5A376;" d="M221.846,170.008c-0.614,0-1.237-0.213-1.725-0.709c-5.632-5.632-13.107-8.72-21.055-8.72h-0.008 c-7.94,0-15.399,3.096-21.008,8.704c-0.945,0.953-2.481,0.985-3.426,0.016c-0.945-0.922-0.985-2.458-0.032-3.419 c6.538-6.554,15.218-10.169,24.458-10.169h0.008c9.271,0,17.959,3.6,24.513,10.153c0.937,0.937,0.937,2.505,0,3.434 C223.106,169.787,222.492,170.008,221.846,170.008z"></path> <circle style="fill:#113E49;" cx="321.78" cy="145.967" r="11.524"></circle> <path d="M310.217,145.959c0,6.388,5.144,11.54,11.532,11.54c6.372,0,11.516-5.152,11.516-11.54"></path> <path style="fill:#E5A376;" d="M298.993,170.008c0.607,0,1.237-0.213,1.709-0.709c5.64-5.632,13.123-8.72,21.055-8.72h0.016 c7.932,0,15.415,3.096,21.016,8.704c0.937,0.953,2.473,0.985,3.434,0.016c0.945-0.922,0.961-2.458,0.008-3.419 c-6.498-6.554-15.21-10.169-24.45-10.169h-0.016c-9.24,0-17.936,3.6-24.505,10.153c-0.922,0.937-0.922,2.505,0,3.434 C297.74,169.787,298.339,170.008,298.993,170.008z"></path> <path d="M260.088,166.4c-31.295,0-57.084,19.062-60.967,43.741c6.341,2.127,13.036,3.828,19.968,5.199 c6.609-18.306,22.465-31.216,40.999-31.216c18.534,0,34.399,12.91,41.007,31.232c6.924-1.386,13.619-3.096,19.952-5.199 C317.165,185.478,291.383,166.4,260.088,166.4z"></path> <path d="M180.516,167.479c-15.376-14.108-33.233-21.079-46.411-19.582c8.491,32.059,34.84,53.311,70.073,63.756 C204.32,198.451,195.718,181.437,180.516,167.479z"></path> <path d="M386.119,147.708c-12.879-0.37-29.46,6.554-43.867,19.771c-14.903,13.674-23.497,30.326-23.694,43.418 C352.579,200.176,377.88,179.113,386.119,147.708z"></path> <g> <ellipse style="fill:#B1C2C4;" cx="166.55" cy="21.173" rx="37.415" ry="21.173"></ellipse> <ellipse style="fill:#B1C2C4;" cx="203.965" cy="21.173" rx="37.415" ry="21.173"></ellipse> <ellipse style="fill:#B1C2C4;" cx="241.357" cy="21.173" rx="37.415" ry="21.173"></ellipse> <ellipse style="fill:#B1C2C4;" cx="278.796" cy="21.173" rx="37.415" ry="21.173"></ellipse> <ellipse style="fill:#B1C2C4;" cx="316.212" cy="21.173" rx="37.415" ry="21.173"></ellipse> <ellipse style="fill:#B1C2C4;" cx="353.603" cy="21.173" rx="37.415" ry="21.173"></ellipse> <path style="fill:#B1C2C4;" d="M160.445,315.573c0,126.338,44.615,100.1,99.643,100.1c55.052,0,99.643,26.238,99.643-100.1 c0-16.51-2.434-32.232-6.688-46.773H167.117C162.871,283.341,160.445,299.063,160.445,315.573z"></path> </g> </g></svg>
    <span class="tooltipChef" id="tooltipChef">Heads Up!</span>    
      <h1 style="margin:0.5rem;">You will encounter these types of questions</h1>
      <div id="questions-prev">
        <div class="q-prev">
          <h4>Multiple Choice Questions</h4>
          <img src="/Style/mcq.jpg" alt="MCQ">
        </div>
        <div class="q-prev">
          <h4>Label the Picture</h4>
          <img src="/Style/label.jpg" alt="label">
        </div>
        <div class="q-prev">
          <h4>Sort the Words to form a Sentence</h4>
          <img src="/Style/sort.jpg" alt="sort">
        </div>
      </div>
    `
    document.getElementById("game-area").innerHTML = cardHTML;
  }else if (data[state.lvlIndex].type == "vocab") {
    state.questionScore = 0;
    cardHTML = `
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 504.454 504.454" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path style="fill:#890729;" d="M294.448,214.646c11.272-10.027,33.296-3.663,49.231,14.218 c15.888,17.881,85.016,114.018,73.759,124.062c-11.296,10.012-98.721-69.892-114.617-87.773 C286.933,247.296,283.184,224.681,294.448,214.646z"></path> <path style="fill:#A81333;" d="M270.557,231.542c-0.89-15.061-20.968-26.136-44.859-24.757 c-23.883,1.402-140.737,20.512-139.91,35.572c0.922,15.061,119.249,20.385,143.124,18.983 C252.771,259.954,271.423,246.603,270.557,231.542z"></path> <g> <path style="fill:#0C44C1;" d="M236.245,362.252c0,19.495-15.817,124.66-35.328,124.66c-19.503,0-35.312-105.173-35.312-124.66 c0-19.511,15.817-35.32,35.312-35.32C220.428,326.924,236.245,342.741,236.245,362.252z"></path> <path style="fill:#0C44C1;" d="M354.596,362.252c0,19.495-15.825,124.66-35.336,124.66c-19.503,0-35.296-105.173-35.296-124.66 c0-19.511,15.801-35.32,35.296-35.32C338.771,326.924,354.596,342.741,354.596,362.252z"></path> </g> <path style="fill:#A81333;" d="M359.731,315.573c0,126.338-44.591,84.259-99.643,84.259c-55.028,0-99.643,42.079-99.643-84.259 c0-72.231,44.631-130.773,99.643-130.773C315.124,184.8,359.731,243.342,359.731,315.573z"></path> <g> <rect x="205.935" y="204.469" style="fill:#B1C2C4;" width="13.785" height="76.154"></rect> <rect x="300.458" y="204.469" style="fill:#B1C2C4;" width="13.785" height="76.154"></rect> </g> <path style="fill:#0A234F;" d="M240.656,487.558c0,14.935-17.81,16.896-39.731,16.896c-21.945,0-39.747-1.953-39.747-16.896 c0-14.95,17.802-35.509,39.747-35.509C222.854,452.049,240.656,472.608,240.656,487.558z"></path> <path style="fill:#031530;" d="M240.656,487.558c0,14.935-17.81,16.896-39.731,16.896c-21.945,0-39.747-1.953-39.747-16.896"></path> <path style="fill:#0A234F;" d="M359.015,487.558c0,14.935-17.802,16.896-39.739,16.896s-39.739-1.953-39.739-16.896 c0-14.95,17.802-35.509,39.739-35.509S359.015,472.608,359.015,487.558z"></path> <path style="fill:#031530;" d="M359.015,487.558c0,14.935-17.802,16.896-39.739,16.896s-39.739-1.953-39.739-16.896"></path> <path style="fill:#B1C2C4;" d="M389.042,124.589c0,63.015-57.746,94.681-128.945,94.681c-71.207,0-128.961-31.665-128.961-94.681 S188.889,0.331,260.096,0.331C331.296,0.331,389.042,61.574,389.042,124.589z"></path> <path style="fill:#BC8158;" d="M389.042,124.589c0,63.015-57.746,94.681-128.945,94.681c-71.207,0-128.961-31.665-128.961-94.681"></path> <circle style="fill:#113E49;" cx="199.097" cy="145.967" r="11.532"></circle> <path d="M210.629,145.959c0,6.388-5.167,11.54-11.54,11.54s-11.524-5.152-11.524-11.54"></path> <path style="fill:#E5A376;" d="M221.846,170.008c-0.614,0-1.237-0.213-1.725-0.709c-5.632-5.632-13.107-8.72-21.055-8.72h-0.008 c-7.94,0-15.399,3.096-21.008,8.704c-0.945,0.953-2.481,0.985-3.426,0.016c-0.945-0.922-0.985-2.458-0.032-3.419 c6.538-6.554,15.218-10.169,24.458-10.169h0.008c9.271,0,17.959,3.6,24.513,10.153c0.937,0.937,0.937,2.505,0,3.434 C223.106,169.787,222.492,170.008,221.846,170.008z"></path> <circle style="fill:#113E49;" cx="321.78" cy="145.967" r="11.524"></circle> <path d="M310.217,145.959c0,6.388,5.144,11.54,11.532,11.54c6.372,0,11.516-5.152,11.516-11.54"></path> <path style="fill:#E5A376;" d="M298.993,170.008c0.607,0,1.237-0.213,1.709-0.709c5.64-5.632,13.123-8.72,21.055-8.72h0.016 c7.932,0,15.415,3.096,21.016,8.704c0.937,0.953,2.473,0.985,3.434,0.016c0.945-0.922,0.961-2.458,0.008-3.419 c-6.498-6.554-15.21-10.169-24.45-10.169h-0.016c-9.24,0-17.936,3.6-24.505,10.153c-0.922,0.937-0.922,2.505,0,3.434 C297.74,169.787,298.339,170.008,298.993,170.008z"></path> <path d="M260.088,166.4c-31.295,0-57.084,19.062-60.967,43.741c6.341,2.127,13.036,3.828,19.968,5.199 c6.609-18.306,22.465-31.216,40.999-31.216c18.534,0,34.399,12.91,41.007,31.232c6.924-1.386,13.619-3.096,19.952-5.199 C317.165,185.478,291.383,166.4,260.088,166.4z"></path> <path d="M180.516,167.479c-15.376-14.108-33.233-21.079-46.411-19.582c8.491,32.059,34.84,53.311,70.073,63.756 C204.32,198.451,195.718,181.437,180.516,167.479z"></path> <path d="M386.119,147.708c-12.879-0.37-29.46,6.554-43.867,19.771c-14.903,13.674-23.497,30.326-23.694,43.418 C352.579,200.176,377.88,179.113,386.119,147.708z"></path> <g> <ellipse style="fill:#B1C2C4;" cx="166.55" cy="21.173" rx="37.415" ry="21.173"></ellipse> <ellipse style="fill:#B1C2C4;" cx="203.965" cy="21.173" rx="37.415" ry="21.173"></ellipse> <ellipse style="fill:#B1C2C4;" cx="241.357" cy="21.173" rx="37.415" ry="21.173"></ellipse> <ellipse style="fill:#B1C2C4;" cx="278.796" cy="21.173" rx="37.415" ry="21.173"></ellipse> <ellipse style="fill:#B1C2C4;" cx="316.212" cy="21.173" rx="37.415" ry="21.173"></ellipse> <ellipse style="fill:#B1C2C4;" cx="353.603" cy="21.173" rx="37.415" ry="21.173"></ellipse> <path style="fill:#B1C2C4;" d="M160.445,315.573c0,126.338,44.615,100.1,99.643,100.1c55.052,0,99.643,26.238,99.643-100.1 c0-16.51-2.434-32.232-6.688-46.773H167.117C162.871,283.341,160.445,299.063,160.445,315.573z"></path> </g> </g></svg>
    <span class="tooltipChef" id="tooltipChef">Click on the flaashcard to see the English transaltion!</span>    
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

    setTimeout(function () {
      document.getElementById("tooltipChef").style.opacity = "0";
    }, 2000);

    document.getElementById("Layer_1").addEventListener("mouseover", function () {
      document.getElementById("tooltipChef").style.opacity = "1";
    });

    document.getElementById("Layer_1").addEventListener("mouseout", function () {
      document.getElementById("tooltipChef").style.opacity = "0";
    });
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
     <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 504.454 504.454" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path style="fill:#890729;" d="M294.448,214.646c11.272-10.027,33.296-3.663,49.231,14.218 c15.888,17.881,85.016,114.018,73.759,124.062c-11.296,10.012-98.721-69.892-114.617-87.773 C286.933,247.296,283.184,224.681,294.448,214.646z"></path> <path style="fill:#A81333;" d="M270.557,231.542c-0.89-15.061-20.968-26.136-44.859-24.757 c-23.883,1.402-140.737,20.512-139.91,35.572c0.922,15.061,119.249,20.385,143.124,18.983 C252.771,259.954,271.423,246.603,270.557,231.542z"></path> <g> <path style="fill:#0C44C1;" d="M236.245,362.252c0,19.495-15.817,124.66-35.328,124.66c-19.503,0-35.312-105.173-35.312-124.66 c0-19.511,15.817-35.32,35.312-35.32C220.428,326.924,236.245,342.741,236.245,362.252z"></path> <path style="fill:#0C44C1;" d="M354.596,362.252c0,19.495-15.825,124.66-35.336,124.66c-19.503,0-35.296-105.173-35.296-124.66 c0-19.511,15.801-35.32,35.296-35.32C338.771,326.924,354.596,342.741,354.596,362.252z"></path> </g> <path style="fill:#A81333;" d="M359.731,315.573c0,126.338-44.591,84.259-99.643,84.259c-55.028,0-99.643,42.079-99.643-84.259 c0-72.231,44.631-130.773,99.643-130.773C315.124,184.8,359.731,243.342,359.731,315.573z"></path> <g> <rect x="205.935" y="204.469" style="fill:#B1C2C4;" width="13.785" height="76.154"></rect> <rect x="300.458" y="204.469" style="fill:#B1C2C4;" width="13.785" height="76.154"></rect> </g> <path style="fill:#0A234F;" d="M240.656,487.558c0,14.935-17.81,16.896-39.731,16.896c-21.945,0-39.747-1.953-39.747-16.896 c0-14.95,17.802-35.509,39.747-35.509C222.854,452.049,240.656,472.608,240.656,487.558z"></path> <path style="fill:#031530;" d="M240.656,487.558c0,14.935-17.81,16.896-39.731,16.896c-21.945,0-39.747-1.953-39.747-16.896"></path> <path style="fill:#0A234F;" d="M359.015,487.558c0,14.935-17.802,16.896-39.739,16.896s-39.739-1.953-39.739-16.896 c0-14.95,17.802-35.509,39.739-35.509S359.015,472.608,359.015,487.558z"></path> <path style="fill:#031530;" d="M359.015,487.558c0,14.935-17.802,16.896-39.739,16.896s-39.739-1.953-39.739-16.896"></path> <path style="fill:#B1C2C4;" d="M389.042,124.589c0,63.015-57.746,94.681-128.945,94.681c-71.207,0-128.961-31.665-128.961-94.681 S188.889,0.331,260.096,0.331C331.296,0.331,389.042,61.574,389.042,124.589z"></path> <path style="fill:#BC8158;" d="M389.042,124.589c0,63.015-57.746,94.681-128.945,94.681c-71.207,0-128.961-31.665-128.961-94.681"></path> <circle style="fill:#113E49;" cx="199.097" cy="145.967" r="11.532"></circle> <path d="M210.629,145.959c0,6.388-5.167,11.54-11.54,11.54s-11.524-5.152-11.524-11.54"></path> <path style="fill:#E5A376;" d="M221.846,170.008c-0.614,0-1.237-0.213-1.725-0.709c-5.632-5.632-13.107-8.72-21.055-8.72h-0.008 c-7.94,0-15.399,3.096-21.008,8.704c-0.945,0.953-2.481,0.985-3.426,0.016c-0.945-0.922-0.985-2.458-0.032-3.419 c6.538-6.554,15.218-10.169,24.458-10.169h0.008c9.271,0,17.959,3.6,24.513,10.153c0.937,0.937,0.937,2.505,0,3.434 C223.106,169.787,222.492,170.008,221.846,170.008z"></path> <circle style="fill:#113E49;" cx="321.78" cy="145.967" r="11.524"></circle> <path d="M310.217,145.959c0,6.388,5.144,11.54,11.532,11.54c6.372,0,11.516-5.152,11.516-11.54"></path> <path style="fill:#E5A376;" d="M298.993,170.008c0.607,0,1.237-0.213,1.709-0.709c5.64-5.632,13.123-8.72,21.055-8.72h0.016 c7.932,0,15.415,3.096,21.016,8.704c0.937,0.953,2.473,0.985,3.434,0.016c0.945-0.922,0.961-2.458,0.008-3.419 c-6.498-6.554-15.21-10.169-24.45-10.169h-0.016c-9.24,0-17.936,3.6-24.505,10.153c-0.922,0.937-0.922,2.505,0,3.434 C297.74,169.787,298.339,170.008,298.993,170.008z"></path> <path d="M260.088,166.4c-31.295,0-57.084,19.062-60.967,43.741c6.341,2.127,13.036,3.828,19.968,5.199 c6.609-18.306,22.465-31.216,40.999-31.216c18.534,0,34.399,12.91,41.007,31.232c6.924-1.386,13.619-3.096,19.952-5.199 C317.165,185.478,291.383,166.4,260.088,166.4z"></path> <path d="M180.516,167.479c-15.376-14.108-33.233-21.079-46.411-19.582c8.491,32.059,34.84,53.311,70.073,63.756 C204.32,198.451,195.718,181.437,180.516,167.479z"></path> <path d="M386.119,147.708c-12.879-0.37-29.46,6.554-43.867,19.771c-14.903,13.674-23.497,30.326-23.694,43.418 C352.579,200.176,377.88,179.113,386.119,147.708z"></path> <g> <ellipse style="fill:#B1C2C4;" cx="166.55" cy="21.173" rx="37.415" ry="21.173"></ellipse> <ellipse style="fill:#B1C2C4;" cx="203.965" cy="21.173" rx="37.415" ry="21.173"></ellipse> <ellipse style="fill:#B1C2C4;" cx="241.357" cy="21.173" rx="37.415" ry="21.173"></ellipse> <ellipse style="fill:#B1C2C4;" cx="278.796" cy="21.173" rx="37.415" ry="21.173"></ellipse> <ellipse style="fill:#B1C2C4;" cx="316.212" cy="21.173" rx="37.415" ry="21.173"></ellipse> <ellipse style="fill:#B1C2C4;" cx="353.603" cy="21.173" rx="37.415" ry="21.173"></ellipse> <path style="fill:#B1C2C4;" d="M160.445,315.573c0,126.338,44.615,100.1,99.643,100.1c55.052,0,99.643,26.238,99.643-100.1 c0-16.51-2.434-32.232-6.688-46.773H167.117C162.871,283.341,160.445,299.063,160.445,315.573z"></path> </g> </g></svg>
    <span class="tooltipChef" id="tooltipChef">Click on the label to select an option as your answer!</span>    
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
    state.checkAnswer = true

    document.getElementById("game-area").innerHTML = cardHTML;

    setTimeout(function () {
      document.getElementById("tooltipChef").style.opacity = "0";
    }, 2000);

    document.getElementById("Layer_1").addEventListener("mouseover", function () {
      document.getElementById("tooltipChef").style.opacity = "1";
    });

    document.getElementById("Layer_1").addEventListener("mouseout", function () {
      document.getElementById("tooltipChef").style.opacity = "0";
    });
  } else if (data[state.lvlIndex].type == "sort") {
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
     <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 504.454 504.454" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path style="fill:#890729;" d="M294.448,214.646c11.272-10.027,33.296-3.663,49.231,14.218 c15.888,17.881,85.016,114.018,73.759,124.062c-11.296,10.012-98.721-69.892-114.617-87.773 C286.933,247.296,283.184,224.681,294.448,214.646z"></path> <path style="fill:#A81333;" d="M270.557,231.542c-0.89-15.061-20.968-26.136-44.859-24.757 c-23.883,1.402-140.737,20.512-139.91,35.572c0.922,15.061,119.249,20.385,143.124,18.983 C252.771,259.954,271.423,246.603,270.557,231.542z"></path> <g> <path style="fill:#0C44C1;" d="M236.245,362.252c0,19.495-15.817,124.66-35.328,124.66c-19.503,0-35.312-105.173-35.312-124.66 c0-19.511,15.817-35.32,35.312-35.32C220.428,326.924,236.245,342.741,236.245,362.252z"></path> <path style="fill:#0C44C1;" d="M354.596,362.252c0,19.495-15.825,124.66-35.336,124.66c-19.503,0-35.296-105.173-35.296-124.66 c0-19.511,15.801-35.32,35.296-35.32C338.771,326.924,354.596,342.741,354.596,362.252z"></path> </g> <path style="fill:#A81333;" d="M359.731,315.573c0,126.338-44.591,84.259-99.643,84.259c-55.028,0-99.643,42.079-99.643-84.259 c0-72.231,44.631-130.773,99.643-130.773C315.124,184.8,359.731,243.342,359.731,315.573z"></path> <g> <rect x="205.935" y="204.469" style="fill:#B1C2C4;" width="13.785" height="76.154"></rect> <rect x="300.458" y="204.469" style="fill:#B1C2C4;" width="13.785" height="76.154"></rect> </g> <path style="fill:#0A234F;" d="M240.656,487.558c0,14.935-17.81,16.896-39.731,16.896c-21.945,0-39.747-1.953-39.747-16.896 c0-14.95,17.802-35.509,39.747-35.509C222.854,452.049,240.656,472.608,240.656,487.558z"></path> <path style="fill:#031530;" d="M240.656,487.558c0,14.935-17.81,16.896-39.731,16.896c-21.945,0-39.747-1.953-39.747-16.896"></path> <path style="fill:#0A234F;" d="M359.015,487.558c0,14.935-17.802,16.896-39.739,16.896s-39.739-1.953-39.739-16.896 c0-14.95,17.802-35.509,39.739-35.509S359.015,472.608,359.015,487.558z"></path> <path style="fill:#031530;" d="M359.015,487.558c0,14.935-17.802,16.896-39.739,16.896s-39.739-1.953-39.739-16.896"></path> <path style="fill:#B1C2C4;" d="M389.042,124.589c0,63.015-57.746,94.681-128.945,94.681c-71.207,0-128.961-31.665-128.961-94.681 S188.889,0.331,260.096,0.331C331.296,0.331,389.042,61.574,389.042,124.589z"></path> <path style="fill:#BC8158;" d="M389.042,124.589c0,63.015-57.746,94.681-128.945,94.681c-71.207,0-128.961-31.665-128.961-94.681"></path> <circle style="fill:#113E49;" cx="199.097" cy="145.967" r="11.532"></circle> <path d="M210.629,145.959c0,6.388-5.167,11.54-11.54,11.54s-11.524-5.152-11.524-11.54"></path> <path style="fill:#E5A376;" d="M221.846,170.008c-0.614,0-1.237-0.213-1.725-0.709c-5.632-5.632-13.107-8.72-21.055-8.72h-0.008 c-7.94,0-15.399,3.096-21.008,8.704c-0.945,0.953-2.481,0.985-3.426,0.016c-0.945-0.922-0.985-2.458-0.032-3.419 c6.538-6.554,15.218-10.169,24.458-10.169h0.008c9.271,0,17.959,3.6,24.513,10.153c0.937,0.937,0.937,2.505,0,3.434 C223.106,169.787,222.492,170.008,221.846,170.008z"></path> <circle style="fill:#113E49;" cx="321.78" cy="145.967" r="11.524"></circle> <path d="M310.217,145.959c0,6.388,5.144,11.54,11.532,11.54c6.372,0,11.516-5.152,11.516-11.54"></path> <path style="fill:#E5A376;" d="M298.993,170.008c0.607,0,1.237-0.213,1.709-0.709c5.64-5.632,13.123-8.72,21.055-8.72h0.016 c7.932,0,15.415,3.096,21.016,8.704c0.937,0.953,2.473,0.985,3.434,0.016c0.945-0.922,0.961-2.458,0.008-3.419 c-6.498-6.554-15.21-10.169-24.45-10.169h-0.016c-9.24,0-17.936,3.6-24.505,10.153c-0.922,0.937-0.922,2.505,0,3.434 C297.74,169.787,298.339,170.008,298.993,170.008z"></path> <path d="M260.088,166.4c-31.295,0-57.084,19.062-60.967,43.741c6.341,2.127,13.036,3.828,19.968,5.199 c6.609-18.306,22.465-31.216,40.999-31.216c18.534,0,34.399,12.91,41.007,31.232c6.924-1.386,13.619-3.096,19.952-5.199 C317.165,185.478,291.383,166.4,260.088,166.4z"></path> <path d="M180.516,167.479c-15.376-14.108-33.233-21.079-46.411-19.582c8.491,32.059,34.84,53.311,70.073,63.756 C204.32,198.451,195.718,181.437,180.516,167.479z"></path> <path d="M386.119,147.708c-12.879-0.37-29.46,6.554-43.867,19.771c-14.903,13.674-23.497,30.326-23.694,43.418 C352.579,200.176,377.88,179.113,386.119,147.708z"></path> <g> <ellipse style="fill:#B1C2C4;" cx="166.55" cy="21.173" rx="37.415" ry="21.173"></ellipse> <ellipse style="fill:#B1C2C4;" cx="203.965" cy="21.173" rx="37.415" ry="21.173"></ellipse> <ellipse style="fill:#B1C2C4;" cx="241.357" cy="21.173" rx="37.415" ry="21.173"></ellipse> <ellipse style="fill:#B1C2C4;" cx="278.796" cy="21.173" rx="37.415" ry="21.173"></ellipse> <ellipse style="fill:#B1C2C4;" cx="316.212" cy="21.173" rx="37.415" ry="21.173"></ellipse> <ellipse style="fill:#B1C2C4;" cx="353.603" cy="21.173" rx="37.415" ry="21.173"></ellipse> <path style="fill:#B1C2C4;" d="M160.445,315.573c0,126.338,44.615,100.1,99.643,100.1c55.052,0,99.643,26.238,99.643-100.1 c0-16.51-2.434-32.232-6.688-46.773H167.117C162.871,283.341,160.445,299.063,160.445,315.573z"></path> </g> </g></svg>
    <span class="tooltipChef" id="tooltipChef">Drag the coloured words into the boxes to form a sentence!</span>    
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
    setTimeout(function () {
      document.getElementById("tooltipChef").style.opacity = "0";
    }, 2000);

    document.getElementById("Layer_1").addEventListener("mouseover", function () {
      document.getElementById("tooltipChef").style.opacity = "1";
    });

    document.getElementById("Layer_1").addEventListener("mouseout", function () {
      document.getElementById("tooltipChef").style.opacity = "0";
    });
  } else if (data[state.lvlIndex].type == "labels") {
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
     <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 504.454 504.454" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path style="fill:#890729;" d="M294.448,214.646c11.272-10.027,33.296-3.663,49.231,14.218 c15.888,17.881,85.016,114.018,73.759,124.062c-11.296,10.012-98.721-69.892-114.617-87.773 C286.933,247.296,283.184,224.681,294.448,214.646z"></path> <path style="fill:#A81333;" d="M270.557,231.542c-0.89-15.061-20.968-26.136-44.859-24.757 c-23.883,1.402-140.737,20.512-139.91,35.572c0.922,15.061,119.249,20.385,143.124,18.983 C252.771,259.954,271.423,246.603,270.557,231.542z"></path> <g> <path style="fill:#0C44C1;" d="M236.245,362.252c0,19.495-15.817,124.66-35.328,124.66c-19.503,0-35.312-105.173-35.312-124.66 c0-19.511,15.817-35.32,35.312-35.32C220.428,326.924,236.245,342.741,236.245,362.252z"></path> <path style="fill:#0C44C1;" d="M354.596,362.252c0,19.495-15.825,124.66-35.336,124.66c-19.503,0-35.296-105.173-35.296-124.66 c0-19.511,15.801-35.32,35.296-35.32C338.771,326.924,354.596,342.741,354.596,362.252z"></path> </g> <path style="fill:#A81333;" d="M359.731,315.573c0,126.338-44.591,84.259-99.643,84.259c-55.028,0-99.643,42.079-99.643-84.259 c0-72.231,44.631-130.773,99.643-130.773C315.124,184.8,359.731,243.342,359.731,315.573z"></path> <g> <rect x="205.935" y="204.469" style="fill:#B1C2C4;" width="13.785" height="76.154"></rect> <rect x="300.458" y="204.469" style="fill:#B1C2C4;" width="13.785" height="76.154"></rect> </g> <path style="fill:#0A234F;" d="M240.656,487.558c0,14.935-17.81,16.896-39.731,16.896c-21.945,0-39.747-1.953-39.747-16.896 c0-14.95,17.802-35.509,39.747-35.509C222.854,452.049,240.656,472.608,240.656,487.558z"></path> <path style="fill:#031530;" d="M240.656,487.558c0,14.935-17.81,16.896-39.731,16.896c-21.945,0-39.747-1.953-39.747-16.896"></path> <path style="fill:#0A234F;" d="M359.015,487.558c0,14.935-17.802,16.896-39.739,16.896s-39.739-1.953-39.739-16.896 c0-14.95,17.802-35.509,39.739-35.509S359.015,472.608,359.015,487.558z"></path> <path style="fill:#031530;" d="M359.015,487.558c0,14.935-17.802,16.896-39.739,16.896s-39.739-1.953-39.739-16.896"></path> <path style="fill:#B1C2C4;" d="M389.042,124.589c0,63.015-57.746,94.681-128.945,94.681c-71.207,0-128.961-31.665-128.961-94.681 S188.889,0.331,260.096,0.331C331.296,0.331,389.042,61.574,389.042,124.589z"></path> <path style="fill:#BC8158;" d="M389.042,124.589c0,63.015-57.746,94.681-128.945,94.681c-71.207,0-128.961-31.665-128.961-94.681"></path> <circle style="fill:#113E49;" cx="199.097" cy="145.967" r="11.532"></circle> <path d="M210.629,145.959c0,6.388-5.167,11.54-11.54,11.54s-11.524-5.152-11.524-11.54"></path> <path style="fill:#E5A376;" d="M221.846,170.008c-0.614,0-1.237-0.213-1.725-0.709c-5.632-5.632-13.107-8.72-21.055-8.72h-0.008 c-7.94,0-15.399,3.096-21.008,8.704c-0.945,0.953-2.481,0.985-3.426,0.016c-0.945-0.922-0.985-2.458-0.032-3.419 c6.538-6.554,15.218-10.169,24.458-10.169h0.008c9.271,0,17.959,3.6,24.513,10.153c0.937,0.937,0.937,2.505,0,3.434 C223.106,169.787,222.492,170.008,221.846,170.008z"></path> <circle style="fill:#113E49;" cx="321.78" cy="145.967" r="11.524"></circle> <path d="M310.217,145.959c0,6.388,5.144,11.54,11.532,11.54c6.372,0,11.516-5.152,11.516-11.54"></path> <path style="fill:#E5A376;" d="M298.993,170.008c0.607,0,1.237-0.213,1.709-0.709c5.64-5.632,13.123-8.72,21.055-8.72h0.016 c7.932,0,15.415,3.096,21.016,8.704c0.937,0.953,2.473,0.985,3.434,0.016c0.945-0.922,0.961-2.458,0.008-3.419 c-6.498-6.554-15.21-10.169-24.45-10.169h-0.016c-9.24,0-17.936,3.6-24.505,10.153c-0.922,0.937-0.922,2.505,0,3.434 C297.74,169.787,298.339,170.008,298.993,170.008z"></path> <path d="M260.088,166.4c-31.295,0-57.084,19.062-60.967,43.741c6.341,2.127,13.036,3.828,19.968,5.199 c6.609-18.306,22.465-31.216,40.999-31.216c18.534,0,34.399,12.91,41.007,31.232c6.924-1.386,13.619-3.096,19.952-5.199 C317.165,185.478,291.383,166.4,260.088,166.4z"></path> <path d="M180.516,167.479c-15.376-14.108-33.233-21.079-46.411-19.582c8.491,32.059,34.84,53.311,70.073,63.756 C204.32,198.451,195.718,181.437,180.516,167.479z"></path> <path d="M386.119,147.708c-12.879-0.37-29.46,6.554-43.867,19.771c-14.903,13.674-23.497,30.326-23.694,43.418 C352.579,200.176,377.88,179.113,386.119,147.708z"></path> <g> <ellipse style="fill:#B1C2C4;" cx="166.55" cy="21.173" rx="37.415" ry="21.173"></ellipse> <ellipse style="fill:#B1C2C4;" cx="203.965" cy="21.173" rx="37.415" ry="21.173"></ellipse> <ellipse style="fill:#B1C2C4;" cx="241.357" cy="21.173" rx="37.415" ry="21.173"></ellipse> <ellipse style="fill:#B1C2C4;" cx="278.796" cy="21.173" rx="37.415" ry="21.173"></ellipse> <ellipse style="fill:#B1C2C4;" cx="316.212" cy="21.173" rx="37.415" ry="21.173"></ellipse> <ellipse style="fill:#B1C2C4;" cx="353.603" cy="21.173" rx="37.415" ry="21.173"></ellipse> <path style="fill:#B1C2C4;" d="M160.445,315.573c0,126.338,44.615,100.1,99.643,100.1c55.052,0,99.643,26.238,99.643-100.1 c0-16.51-2.434-32.232-6.688-46.773H167.117C162.871,283.341,160.445,299.063,160.445,315.573z"></path> </g> </g></svg>
    <span class="tooltipChef" id="tooltipChef">Put the labels onto the image in the correct position</span>    
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
    setTimeout(function () {
      document.getElementById("tooltipChef").style.opacity = "0";
    }, 2000);

    document.getElementById("Layer_1").addEventListener("mouseover", function () {
      document.getElementById("tooltipChef").style.opacity = "1";
    });

    document.getElementById("Layer_1").addEventListener("mouseout", function () {
      document.getElementById("tooltipChef").style.opacity = "0";
    });
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
    document.getElementById("play-btn").onclick = () => {
      setState(
        {
          cardIndex: 0,
          lvlIndex: 1 + state.lvlIndex,
          checkAnswer: false,
          score: state.score,
          name: state.name,
          age: state.age
        },
        data
      );
    };

    document.getElementById("next").onclick = () => {
      if (state.checkAnswer == true) {
        checkAnswer(data);
      } else if (state.lvlIndex == -2 ||state.lvlIndex == -1) {
        if(state.lvlIndex ==-2){
          var userName = document.getElementById("name").value
          var userAge = document.getElementById("age").value
          
          if(userName==""){                
              document.getElementById("name").style.border="0.2rem solid red"
          }
          if(userAge == ""){
              document.getElementById("age").style.border="0.2rem solid red"
          }
          if(userName != "" && userAge != ""){
            setState(
              {
                cardIndex: 0,
                lvlIndex: 1 + state.lvlIndex,
                checkAnswer: false,
                score: state.score,
                name: state.name,
                age: state.age
              },
              data
            );
          }
        } else{
          setState(
            {
              cardIndex: 0,
              lvlIndex: 1 + state.lvlIndex,
              checkAnswer: false,
              score: state.score,
              name: state.name,
              age: state.age
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
          },
          data
        );
        state.showReward = false;
      } else if (state.cardIndex + 1 == data[state.lvlIndex].elements.length && state.lvlIndex + 1 == data.length) {
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
        document.getElementById("nav").style.opacity = "0%";
      } else if (state.cardIndex + 1 == data[state.lvlIndex].elements.length) {
        if (confirm(`You will now move onto the ${data[state.lvlIndex + 1].type} - a new section!`)) {
          //OK
          setState(
            {
              cardIndex: 0,
              lvlIndex: ++state.lvlIndex,
              checkAnswer: false,
              score: state.score,
              name: state.name,
              age: state.age,
            },
            data
          );
        } else {
          //Cancel
        }
      } else {
        if (
          data[state.lvlIndex].type == "vocab" &&
          state.cardIndex == 0 &&
          confirm(`By clicking OK you cannot go back to this slide!
          This warning will be displayed once a section`)
        ) {
          setState(
            {
              cardIndex: ++state.cardIndex,
              lvlIndex: state.lvlIndex,
              checkAnswer: false,
              score: state.score,
              name: state.name,
              age: state.age
            },
            data
          );
        } else if (state.cardIndex > 0) {
          setState(
            {
              cardIndex: ++state.cardIndex,
              lvlIndex: state.lvlIndex,
              checkAnswer: false,
              score: state.score,
              name: state.name,
              age: state.age
            },
            data
          );
        } else if (data[state.lvlIndex].type != "vocab") {
          setState(
            {
              cardIndex: ++state.cardIndex,
              lvlIndex: state.lvlIndex,
              checkAnswer: false,
              score: state.score,
              name: state.name,
              age: state.age
            },
            data
          );
        }
      }
    };
    // render(data);
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
