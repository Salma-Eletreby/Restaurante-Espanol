let state = {
  cardIndex: 0,
  lvlIndex: -3,
  checkAnswer: false,
  score: 0,
  name: "",
  age:0,
  questionScore: 0,
  rewardImgStatus: [],
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
        var leaderboardHTML = `
        <div>
        <svg id="badge" version="1.1" id="_x34_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <g> <polygon style="fill:#59AED3;" points="236.065,345.134 193.183,353.739 191.462,354.097 171.814,317.813 151.09,279.377 135.744,251.124 128.215,237.141 84.258,155.823 0,0 53.351,7.243 116.312,123.769 158.046,200.856 164.572,212.903 196.912,272.708 206.378,290.205 231.189,336.098 231.189,336.17 231.26,336.17 "></polygon> <polygon style="fill:#FFFFFF;" points="280.919,336.202 236.089,345.138 53.369,7.209 106.928,14.426 259.094,295.819 "></polygon> <polygon style="fill:#E26377;" points="325.557,327.207 280.954,336.17 280.883,336.027 259.083,295.798 256,290.062 231.26,244.311 231.117,244.096 201.214,188.737 194.832,176.977 148.581,91.5 106.918,14.413 160.269,21.584 180.706,59.375 237.857,164.93 244.67,177.551 254.781,196.195 256,198.561 280.74,244.311 283.106,248.686 290.779,262.812 294.508,269.696 305.622,290.205 312.65,303.184 "></polygon> </g> <g> <polygon style="fill:#59AED3;" points="512,0 510.135,3.442 383.785,237.141 383.713,237.284 376.256,251.124 360.91,279.377 340.186,317.813 320.538,354.097 318.817,353.739 275.935,345.134 280.74,336.242 280.883,336.027 305.622,290.205 315.088,272.708 347.428,212.903 353.954,200.856 458.649,7.243 507.339,0.646 "></polygon> <polygon style="fill:#FFFFFF;" points="458.649,7.243 353.954,200.856 347.428,212.903 315.088,272.708 305.622,290.205 280.883,336.027 280.74,336.242 275.935,345.134 256,341.118 231.26,336.17 231.117,336.17 231.189,336.098 252.917,295.798 256,290.062 280.74,244.311 280.883,244.096 310.785,188.737 317.167,176.977 405.082,14.413 "></polygon> <polygon style="fill:#E26377;" points="405.082,14.413 317.167,176.977 310.785,188.737 280.883,244.096 280.74,244.311 256,290.062 252.917,295.798 231.189,336.098 231.117,336.17 186.442,327.207 199.35,303.184 206.378,290.205 217.492,269.696 221.221,262.812 228.894,248.686 231.26,244.311 256,198.561 257.219,196.195 267.33,177.551 274.142,164.93 351.731,21.584 "></polygon> </g> </g> <path style="fill:#F2D58E;" d="M404.007,311.789c0,81.748-66.259,148.007-148.007,148.007c-25.242,0-49.049-6.31-69.844-17.497 c-25.744-13.768-46.898-34.922-60.666-60.665c-11.187-20.796-17.497-44.603-17.497-69.845c0-27.249,7.314-52.706,20.222-74.648 c7.96-13.625,18.071-25.887,29.831-36.285c10.972-9.752,23.305-17.784,36.787-23.879c13.41-6.095,27.823-10.254,43.025-12.047 c5.952-0.789,11.976-1.147,18.143-1.147c2.079,0,4.159,0.071,6.239,0.143c0.932,0.072,1.936,0.143,2.868,0.215 c3.012,0.072,6.023,0.358,8.964,0.789h0.071c15.202,1.793,29.616,5.952,43.025,12.047c13.481,6.096,25.815,14.127,36.786,23.879 c11.76,10.398,21.871,22.66,29.831,36.285c5.665,9.609,10.254,19.935,13.553,30.763c0.43,1.506,0.932,3.083,1.362,4.661 c0.431,1.577,0.861,3.155,1.219,4.733c0.43,1.793,0.861,3.585,1.219,5.45c0.43,2.151,0.86,4.303,1.147,6.526 c0.359,2.438,0.717,4.876,0.932,7.386c0.287,2.51,0.502,5.02,0.574,7.529C403.935,306.698,404.007,309.208,404.007,311.789z"></path> <path style="fill:#E6BF7B;" d="M256.007,446.525c-74.299,0-134.736-60.438-134.736-134.73s60.438-134.736,134.736-134.736 c74.286,0,134.724,60.444,134.724,134.736S330.292,446.525,256.007,446.525z"></path> <g style="opacity:0.5;"> <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="134.8072" y1="308.9319" x2="377.1929" y2="308.9319"> <stop offset="0.4926" style="stop-color:#F5E5BB"></stop> <stop offset="0.9901" style="stop-color:#F5E0AF"></stop> </linearGradient> <polygon style="fill:url(#SVGID_1_);" points="255.994,384.819 181.087,424.194 195.4,340.791 134.807,281.725 218.54,269.553 255.994,193.669 293.434,269.553 377.193,281.725 316.587,340.791 330.887,424.194 "></polygon> </g> </g> <path style="opacity:0.08;fill:#040000;" d="M383.785,237.141l-0.072,0.144c5.593,9.609,10.182,19.791,13.625,30.619 c0.43,1.506,0.932,3.083,1.362,4.661c0.431,1.577,0.861,3.155,1.219,4.733c0.43,1.793,0.861,3.585,1.219,5.45 c0.43,2.151,0.86,4.303,1.147,6.526c0.359,2.438,0.717,4.876,0.932,7.386c0.287,2.51,0.502,5.02,0.574,7.529 c0.143,2.51,0.215,5.02,0.215,7.601c0,81.748-66.259,148.007-148.007,148.007V163.783c2.079,0,4.159,0.071,6.239,0.143 c0.932,0.072,1.936,0.143,2.868,0.215c3.012,0.215,5.952,0.502,8.964,0.86v-0.072h0.071l77.589-143.346l53.351-7.171l53.567-7.171 l48.69-6.597L512,0l-1.865,3.442L383.785,237.141z"></path> </g> </g></svg>
        <p id="position">6th Place</p>
        </div>
        `
        document.getElementById("game-area").innerHTML += leaderboardHTML;

        document.getElementById("game-area").innerHTML += trumpetHtml;
        state.rewardImgStatus.push("block1")
        
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
      state.rewardImgStatus.forEach(p => {
        document.getElementById(`${p}`).style.opacity = "0%";
      })

      var leaderboardHTML = `
      <div>
      <svg id="badge" version="1.1" id="_x34_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <g> <polygon style="fill:#59AED3;" points="236.065,345.134 193.183,353.739 191.462,354.097 171.814,317.813 151.09,279.377 135.744,251.124 128.215,237.141 84.258,155.823 0,0 53.351,7.243 116.312,123.769 158.046,200.856 164.572,212.903 196.912,272.708 206.378,290.205 231.189,336.098 231.189,336.17 231.26,336.17 "></polygon> <polygon style="fill:#FFFFFF;" points="280.919,336.202 236.089,345.138 53.369,7.209 106.928,14.426 259.094,295.819 "></polygon> <polygon style="fill:#E26377;" points="325.557,327.207 280.954,336.17 280.883,336.027 259.083,295.798 256,290.062 231.26,244.311 231.117,244.096 201.214,188.737 194.832,176.977 148.581,91.5 106.918,14.413 160.269,21.584 180.706,59.375 237.857,164.93 244.67,177.551 254.781,196.195 256,198.561 280.74,244.311 283.106,248.686 290.779,262.812 294.508,269.696 305.622,290.205 312.65,303.184 "></polygon> </g> <g> <polygon style="fill:#59AED3;" points="512,0 510.135,3.442 383.785,237.141 383.713,237.284 376.256,251.124 360.91,279.377 340.186,317.813 320.538,354.097 318.817,353.739 275.935,345.134 280.74,336.242 280.883,336.027 305.622,290.205 315.088,272.708 347.428,212.903 353.954,200.856 458.649,7.243 507.339,0.646 "></polygon> <polygon style="fill:#FFFFFF;" points="458.649,7.243 353.954,200.856 347.428,212.903 315.088,272.708 305.622,290.205 280.883,336.027 280.74,336.242 275.935,345.134 256,341.118 231.26,336.17 231.117,336.17 231.189,336.098 252.917,295.798 256,290.062 280.74,244.311 280.883,244.096 310.785,188.737 317.167,176.977 405.082,14.413 "></polygon> <polygon style="fill:#E26377;" points="405.082,14.413 317.167,176.977 310.785,188.737 280.883,244.096 280.74,244.311 256,290.062 252.917,295.798 231.189,336.098 231.117,336.17 186.442,327.207 199.35,303.184 206.378,290.205 217.492,269.696 221.221,262.812 228.894,248.686 231.26,244.311 256,198.561 257.219,196.195 267.33,177.551 274.142,164.93 351.731,21.584 "></polygon> </g> </g> <path style="fill:#F2D58E;" d="M404.007,311.789c0,81.748-66.259,148.007-148.007,148.007c-25.242,0-49.049-6.31-69.844-17.497 c-25.744-13.768-46.898-34.922-60.666-60.665c-11.187-20.796-17.497-44.603-17.497-69.845c0-27.249,7.314-52.706,20.222-74.648 c7.96-13.625,18.071-25.887,29.831-36.285c10.972-9.752,23.305-17.784,36.787-23.879c13.41-6.095,27.823-10.254,43.025-12.047 c5.952-0.789,11.976-1.147,18.143-1.147c2.079,0,4.159,0.071,6.239,0.143c0.932,0.072,1.936,0.143,2.868,0.215 c3.012,0.072,6.023,0.358,8.964,0.789h0.071c15.202,1.793,29.616,5.952,43.025,12.047c13.481,6.096,25.815,14.127,36.786,23.879 c11.76,10.398,21.871,22.66,29.831,36.285c5.665,9.609,10.254,19.935,13.553,30.763c0.43,1.506,0.932,3.083,1.362,4.661 c0.431,1.577,0.861,3.155,1.219,4.733c0.43,1.793,0.861,3.585,1.219,5.45c0.43,2.151,0.86,4.303,1.147,6.526 c0.359,2.438,0.717,4.876,0.932,7.386c0.287,2.51,0.502,5.02,0.574,7.529C403.935,306.698,404.007,309.208,404.007,311.789z"></path> <path style="fill:#E6BF7B;" d="M256.007,446.525c-74.299,0-134.736-60.438-134.736-134.73s60.438-134.736,134.736-134.736 c74.286,0,134.724,60.444,134.724,134.736S330.292,446.525,256.007,446.525z"></path> <g style="opacity:0.5;"> <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="134.8072" y1="308.9319" x2="377.1929" y2="308.9319"> <stop offset="0.4926" style="stop-color:#F5E5BB"></stop> <stop offset="0.9901" style="stop-color:#F5E0AF"></stop> </linearGradient> <polygon style="fill:url(#SVGID_1_);" points="255.994,384.819 181.087,424.194 195.4,340.791 134.807,281.725 218.54,269.553 255.994,193.669 293.434,269.553 377.193,281.725 316.587,340.791 330.887,424.194 "></polygon> </g> </g> <path style="opacity:0.08;fill:#040000;" d="M383.785,237.141l-0.072,0.144c5.593,9.609,10.182,19.791,13.625,30.619 c0.43,1.506,0.932,3.083,1.362,4.661c0.431,1.577,0.861,3.155,1.219,4.733c0.43,1.793,0.861,3.585,1.219,5.45 c0.43,2.151,0.86,4.303,1.147,6.526c0.359,2.438,0.717,4.876,0.932,7.386c0.287,2.51,0.502,5.02,0.574,7.529 c0.143,2.51,0.215,5.02,0.215,7.601c0,81.748-66.259,148.007-148.007,148.007V163.783c2.079,0,4.159,0.071,6.239,0.143 c0.932,0.072,1.936,0.143,2.868,0.215c3.012,0.215,5.952,0.502,8.964,0.86v-0.072h0.071l77.589-143.346l53.351-7.171l53.567-7.171 l48.69-6.597L512,0l-1.865,3.442L383.785,237.141z"></path> </g> </g></svg>
      <p id="position">4th Place</p>
      </div>
      `
      if (state.questionScore >= 50) {
      state.rewardImgStatus.push("block2")

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

      state.rewardImgStatus.forEach(p => {
        document.getElementById(`${p}`).style.opacity = "0%";
      })

      if (state.questionScore >= 80) {
        document.getElementById("game-area").innerHTML += trumpetHtml;
        document.getElementById("block3").style.opacity = "0%";

      state.rewardImgStatus.push("block3")

        if (state.rewardImgStatus.length == 3) {
          document.getElementById("block3").style.opacity = "0%";
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
          document.getElementById("block3").style.opacity = "0%";
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
    document.getElementById("play-btn").style.position="static"
    document.getElementById("play-btn").style.marginLeft="0rem"

    document.getElementById("play-btn").onclick = () => {
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
            name: userName,
            age: userAge,
            rewardImgStatus: state.rewardImgStatus
          },
          data
        );
      }
    };

  } else if(state.lvlIndex == -1){
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
    `
    document.getElementById("game-area").innerHTML = cardHTML;

    document.getElementById("play-btn").style.position="static"
    document.getElementById("play-btn").style.marginLeft="0rem"

    document.getElementById("play-btn").onclick = () => {
        setState(
          {
            cardIndex: 0,
            lvlIndex: 1 + state.lvlIndex,
            checkAnswer: false,
            score: state.score,
            name: state.name,
            age: state.age,
            rewardImgStatus: state.rewardImgStatus
          },
          data
        );
    };

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
      age: state.age,
      rewardImgStatus: state.rewardImgStatus
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
      age: state.age,
      rewardImgStatus: state.rewardImgStatus
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
          rewardImgStatus: state.rewardImgStatus
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
                name: userName,
                age: userAge,
                rewardImgStatus: state.rewardImgStatus
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
              age: state.age,
              rewardImgStatus: state.rewardImgStatus
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
        AddToLeaderboard()
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
              rewardImgStatus: state.rewardImgStatus
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
          confirm(`By clicking OK you cannot go back to this slide!\nThis warning will be displayed once a section`)
        ) {
          setState(
            {
              cardIndex: ++state.cardIndex,
              lvlIndex: state.lvlIndex,
              checkAnswer: false,
              score: state.score,
              name: state.name,
              age: state.age,
              rewardImgStatus: state.rewardImgStatus
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
              age: state.age,
              rewardImgStatus: state.rewardImgStatus
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
              age: state.age,
              rewardImgStatus: state.rewardImgStatus
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
  let user = {
    userName: state.name,
    age: state.age,
    score: state.score,
  };

  const response = await fetch("/api/scores", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};

document.addEventListener("DOMContentLoaded", function() {
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
`
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
        textContainer.innerHTML = ''; // Clear the container for new text
        typeLetter();
      }, 1000); // 5-second delay before changing the text
    }
  }

  typeLetter();
});
