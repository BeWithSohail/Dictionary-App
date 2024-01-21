let btn = document.getElementById('search');
let resultBox = document.getElementById('result');
let soundBox = document.getElementById('sound');
let url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
// let loader = document.getElementById("loader");
const loaderOverlay = document.getElementById('loader-overlay');
const searchInput = document.getElementById('word');


let networkRequest = async () => { 
    try {
        let inputWord = document.getElementById("word").value;
        loaderOverlay.style.display = 'flex';
        const response = await fetch(url+inputWord);
        if (!response.ok) {
            throw new Error("HTTPS error! Status code: " + response.status);
        }
        const result = await response.json();
        console.log(result);    
        if (
            result &&
            result.length > 0 &&
            result[0].meanings &&
            result[0].meanings.length > 0 &&
            result[0].meanings[0].partOfSpeech &&
            result[0].phonetics &&
            result[0].phonetics.length > 1 &&
            result[0].phonetics[1].text &&
            result[0].meanings[0].definitions &&
            result[0].meanings[0].definitions.length > 0 &&
            result[0].meanings[0].definitions[0].definition
        ) {
            resultBox.innerHTML = `
            <div class="sample_container"> 
                    <div class="main_sounder"> 
                    <h3 class="searched_word"> 
                        ${inputWord} 
                    </h3>
                    <div class="sound" onclick="playSound()"> 
                        <i class="fa-solid fas fa-volume-up"></i>
                    </div>
                </div>        
                    <div class="details">
                        <p> ${result[0].meanings[0].partOfSpeech} </p>
                        <p>  / ${result[0].phonetics[1].text} /</p>
                    </div>
                
                    <p class="space">
                        ${result[0].meanings[0].definitions[0].definition}
                    </p>
               
                </div>
        `;
        }
        // soundBox.setAttribute("src", `${result[0].phonetics[1].audio}`);
        const audioSource = result[0].phonetics.find(phonetic => phonetic.audio)?.audio;
        if (audioSource) {
            soundBox.setAttribute("src", audioSource);
        } else {
            console.warn("No audio source found for the word.");
        }
    } catch (error) {
        let inputWord = document.getElementById("word").value;
        console.error("Uncaught Error" + error.message);
        resultBox.innerHTML = `
            <p> ${inputWord} Word not found! Please try something diffrent </p>
        `

    }finally {
        // Hide loader regardless of success or error
        loaderOverlay.style.display = 'none';
        searchInput.value = '';
    }
}


// Call the function
btn.addEventListener("click", function () {
    networkRequest();
});
function playSound() {
    soundBox.play();
}
word.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        networkRequest();
    }
});