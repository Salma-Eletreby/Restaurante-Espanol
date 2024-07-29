let state = {
    cardIndex: 0,
    lvlIndex: 0,
    checkAnswer: false,
    score: 0,
    name: ""
}

function setState(newState,data) {
    state = { ...state, ...newState };

    render(data);
}

window.onDragStart = function(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
    event.currentTarget.style.backgroundColor = 'yellow';
};


window.onDragOver = function(event) {
    event.preventDefault();
};


window.onDrop = function(event) {
    const id = event.dataTransfer.getData('text');
    const draggableElement = document.getElementById(id);
    const dropzone = event.target;
    dropzone.appendChild(draggableElement);
    event.dataTransfer.clearData();
}

function render(data) {
    var cardHTML = ``

    if(data[state.lvlIndex].type=="vocab"){
        cardHTML = `
        <h1>${data[state.lvlIndex].title}</h1>
        <h4>${data[state.lvlIndex].desc}</h4>
        <div class="card">
            <p class="spanish">${data[state.lvlIndex].elements[state.cardIndex].spanish}</p>
            <div class="card__content">
                <p class="card__title">${data[state.lvlIndex].elements[state.cardIndex].english} - ${data[state.lvlIndex].elements[state.cardIndex].arabic}</p>
                <div class="vocab-img">
                    <img src="${data[state.lvlIndex].elements[state.cardIndex].img}" alt="${data[state.lvlIndex].elements[state.cardIndex].english}">
                </div>
                <audio controls>
                    <source src="${data[state.lvlIndex].elements[state.cardIndex].audio}" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
            </div>
        </div>
        `
    } else if(data[state.lvlIndex].type=="MCQ"){
        const choicesHTML = data[state.lvlIndex].elements[state.cardIndex].choices.map((c, i) => `
                <input type="radio" id="choice${i}" name="choice" value="${c}">
                <label for="choice${i}">${c}</label><br>
            `).join('');
            
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
        </div>
        `
        state = {
            cardIndex: state.cardIndex,
            lvlIndex: state.lvlIndex,
            checkAnswer: true,
            score: state.score,
            name: state.name
        }

    } else if(data[state.lvlIndex].type=="sort"){
        const choicesHTML = data[state.lvlIndex].elements[state.cardIndex].labels.map((c, i) => `
                <div id="draggable-${i}" class="draggable-label" ${c.ignore==false ? 'draggable="true"' : 'draggable="false" style="background-color: rgba(0, 0, 0, 0);"'} draggable="true" ondragstart="onDragStart(event);">
                    ${c.txt}
                </div>
            `).join('');

        const sortedHTML = data[state.lvlIndex].elements[state.cardIndex].answer.map((c, i) => `
            <div id="zone-${i}" class="label-dropzone" ondragover="onDragOver(event);" ondrop="onDrop(event);" ${c.ignore==false ? '' : ' style="background-color: rgba(0, 0, 0, 0);"'}">
            ${c.ignore==true?`${c.txt}`:''}
            </div>
            `).join('');

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
            `

        state = {
            cardIndex: state.cardIndex,
            lvlIndex: state.lvlIndex,
            checkAnswer: true,
            score: state.score,
            name: state.name
        }
    }else if(data[state.lvlIndex].type=="labels"){
        const choicesHTML = data[state.lvlIndex].elements[state.cardIndex].labels.map((c, i) => `
            <div id="draggable-${i}" class="draggable-label" draggable="true" ondragstart="onDragStart(event);">
                ${c}
            </div>
        `).join('');

        const areasHTML = data[state.lvlIndex].elements[state.cardIndex].answer.map((c, i) => `
            <div id="zone-${i}" class="label-dropzone img-drop" ondragover="onDragOver(event);" ondrop="onDrop(event);"  style="left: ${c.x}px; top: ${c.y}px;color:white">
            ${c.ignore==true?`${c.txt}`:''}${i}
            </div>
            `).join(''); 

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
                max-height:262px
                ">
                ${areasHTML}
                </div>
            </div>
        `

        state = {
            cardIndex: state.cardIndex,
            lvlIndex: state.lvlIndex,
            checkAnswer: true,
            score: state.score,
            name: state.name
        }
    }

    document.getElementById('game-area').innerHTML = cardHTML
}

function checkAnswer(data){
    if(data[state.lvlIndex].type=="MCQ"){
        var answer = document.querySelector(`input[name="choice"][value="${data[state.lvlIndex].elements[state.cardIndex].answer}"]`);
        var label = document.querySelector(`label[for="${answer.id}"]`);
        label.style.backgroundColor = "lightgreen"

        let selectedChoice = document.querySelector('input[name="choice"]:checked');

        if(selectedChoice!= null && answer.id!=selectedChoice.id){
            var wrongLabel =document.querySelector(`label[for="${selectedChoice.id}"]`);
            wrongLabel.style.backgroundColor = "lightsalmon"
        }else if(selectedChoice ==null){

        } 
        else{
            state.score = state.score+100
        }
    }else if(data[state.lvlIndex].type=="sort"){
        data[state.lvlIndex].elements[state.cardIndex].answer.forEach((a,i) => {
            if(a.ignore == false){
                var studentAns = document.getElementById(`zone-${i}`).textContent.replace(/\s+/g, '')
                
                if(studentAns.toLowerCase()==a.txt.toLowerCase()){
                    document.getElementById(`zone-${i}`).style.backgroundColor= "lightgreen"
                    state.score = state.score+100
                }else{
                    document.getElementById(`zone-${i}`).style.backgroundColor= "lightsalmon"
                }
            }
        });

        var sentence = data[state.lvlIndex].elements[state.cardIndex].answer.map(item => item.txt).join(' ');
        document.getElementById("sentence").innerHTML+=`<h4>Answer: ${sentence}</h4>`
    }else if(data[state.lvlIndex].type=="labels"){
        data[state.lvlIndex].elements[state.cardIndex].answer.forEach((a,i) => {
            var studentAns = document.getElementById(`zone-${i}`).textContent.replace(/\d+/g, '').replace(/\s+/g, ' ').trim();  
            console.log(studentAns);
            if(studentAns.toLowerCase()==a.label.toLowerCase()){
                document.getElementById(`zone-${i}`).style.backgroundColor= "lightgreen"
                state.score = state.score+100
            }else{
                document.getElementById(`zone-${i}`).style.backgroundColor= "lightsalmon"
            }
        });
    }

    state = {
        cardIndex: state.cardIndex,
        lvlIndex: state.lvlIndex,
        checkAnswer: false,
        score: state.score,
        name: state.name
    }

    document.getElementById("score").innerHTML = `Score: ${state.score}`
}

fetch("/api/game")
.then((response) => response.json())
.then((data) => {
    document.getElementById("next").onclick = () => {
        if(state.checkAnswer == true){
            checkAnswer(data)
        } else if(state.lvlIndex >= data.length){
            var cardHTML = `
            <h1>Congratulations</h1>
            <h4> You have reached the end of this stage!</h4>
            <div class="enter-score">
                <h3>New High Score!</h3>
                <h5>Enter your username to go onto the leaderboard</h5>
                <div>
                    <label for="user">User:</label>
                    <input type="text" id="user" name="user">
                <div>
                <p>Score: ${state.score}</p>
                <div id="button-nav">
                    <button type="button" id="nextStageButton">Go to Next Stage</button>
                    <a href="index.html" onclick="AddToLeaderboard()" >Go back to Leaderboard</a>
                </div>
            </div>
            `
            document.getElementById('game-area').innerHTML = cardHTML
            document.getElementById('nextStageButton').addEventListener('click', LoadNextStage);
        }
        else if(state.cardIndex+1 == data[state.lvlIndex].elements.length){
            setState(
                { 
                    cardIndex: 0,
                    lvlIndex: ++state.lvlIndex,
                    checkAnswer: false,
                    score: state.score,
                    name: state.name
                },
                data)
        } else{
            setState(
                { 
                    cardIndex: ++state.cardIndex,
                    lvlIndex: state.lvlIndex,
                    checkAnswer: false,
                    score: state.score,
                    name: state.name
                },
                data)
        }
    }
    
    render(data);
})
.catch((error) => {
  console.error("Error:", error);
});

window.AddToLeaderboard = async function(event){
    state.name = document.getElementById('user').value;

    let user = {
        "userName":state.name,
        "score": state.score,
        "ignore":false
    }

    const response = await fetch('/api/scores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
}

function LoadNextStage(){
    console.log("hello");
    AddToLeaderboard()
    var cardHTML = `
            <h1>New Stage: Talking with a friend</h1>
            <h4>Learn how to mantain small talk with your spanish friend!</h4>
            <div class="enter-score">
                <div class="loader"></div>
            </div>
            `
    document.getElementById('game-area').innerHTML = cardHTML
}