let state = {
    cardIndex: 0,
    lvlIndex: 0
}

function setState(newState,data) {
    state = { ...state, ...newState };

    render(data);
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
    }

    document.getElementById('game-area').innerHTML = cardHTML
}

fetch("https://salma-eletreby.github.io/Restaurante-Espanol/Data/spanishFood.json")
.then((response) => response.json())
.then((data) => {
    document.getElementById("next").onclick = () => {
        if(state.cardIndex+1 == data[state.lvlIndex].elements.length){
            setState(
                { 
                    cardIndex: 0,
                    lvlIndex: ++state.lvlIndex
                },
                data)
        } else{
            setState(
                { 
                    cardIndex: ++state.cardIndex,
                    lvlIndex: state.lvlIndex
                },
                data)
        }
    }
    
    render(data);
})
.catch((error) => {
  console.error("Error:", error);
});