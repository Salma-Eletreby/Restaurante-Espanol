let state = {
    cardIndex: 0,
    lvlIndex: 0,
    checkAnswer: false
}

function setState(newState,data) {
    state = { ...state, ...newState };

    render(data);
}

function onDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
    event.currentTarget.style.backgroundColor = 'yellow';
}

function onDragOver(event) {
    event.preventDefault();
}

function onDrop(event) {
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
            checkAnswer: true
        }

    } else if(data[state.lvlIndex].type=="sort"){
        const choicesHTML = data[state.lvlIndex].elements[state.cardIndex].labels.map((c, i) => `
                <div id="draggable-${i}" class="draggable-label" draggable="true" ondragstart="onDragStart(event);">
                    ${c.txt}
                </div>
            `).join('');

        const sortedHTML = data[state.lvlIndex].elements[state.cardIndex].answer.map((c, i) => `
            <div id="zone-${i}" class="label-dropzone" ondragover="onDragOver(event);" ondrop="onDrop(event);"></div>
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
            </div>
            `

        state = {
            cardIndex: state.cardIndex,
            lvlIndex: state.lvlIndex,
            checkAnswer: true
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
        }
    }

    state = {
        cardIndex: state.cardIndex,
        lvlIndex: state.lvlIndex,
        checkAnswer: false
    }
}

fetch("https://salma-eletreby.github.io/Restaurante-Espanol/Data/spanishFood.json")
.then((response) => response.json())
.then((data) => {
    document.getElementById("next").onclick = () => {
        if(state.checkAnswer == true){
            checkAnswer(data)
        }
        else if(state.cardIndex+1 == data[state.lvlIndex].elements.length){
            setState(
                { 
                    cardIndex: 0,
                    lvlIndex: ++state.lvlIndex,
                    checkAnswer: false
                },
                data)
        } else{
            setState(
                { 
                    cardIndex: ++state.cardIndex,
                    lvlIndex: state.lvlIndex,
                    checkAnswer: false
                },
                data)
        }
    }
    
    render(data);
})
.catch((error) => {
  console.error("Error:", error);
});