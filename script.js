let searchbtn = document.getElementById("searchButton");
let result = document.getElementById("result");
let sounds = document.getElementById("sound");
let url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

searchbtn.addEventListener("click", function(){
  let inpword = document.getElementById("searchInput").value;
  fetch(`${url}${inpword}`)
  .then((response)=> response.json())
  .then((data)=>{
    console.log(data);
    if (data.length > 0) {
      const firstEntry = data[0];
      let example = ""; // Initialize example variable

      // Iterate through the definitions array to find the first example
      for (const definition of firstEntry.meanings[0].definitions) {
        if (definition.example) {
          example = definition.example;
          break; // Break the loop once an example is found
        }
      } 
    
    const exampleParagraph = example ? `<p class="word-example">${example}</p>` : "";
    result.innerHTML = `
        <div class="main_parent_cotainer"> 
              <div class="word"> 
                  <h3> ${inpword} </h3>
                  <button type="button" onclick="playSound()"> 
                    <i class="fa fa-volume-down"></i>
                  </button>
            </div>
              <div class="details"> 
                <p> ${firstEntry.meanings[0].partOfSpeech} </p>
                <p> ${firstEntry.phonetic}  </p>
              </div>
                <p class="word-meaning"> 
                  ${firstEntry.meanings[0].definitions[0].definition}
                </p>
                ${exampleParagraph}
              </div>`;
              const audioUrl = firstEntry.phonetics[0].audio;
              sounds.setAttribute("src", audioUrl);
              console.log(audioUrl);
              //console.log(sounds);
    }else {
      result.innerHTML = `<p>No data found for "${inpword}"</p>`;
      sounds.removeAttribute("src"); 
    }
  }).catch((error) => {
    console.error("Error fetching data:", error);
  });

});



function playSound(){
  sounds.play();
}

