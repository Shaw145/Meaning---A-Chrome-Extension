let see = document.querySelector("#see");
let word = document.querySelector("#word");
let error = document.querySelector(".error");
let content = document.querySelector('.content');

// Api Call
//Search Word by DictionaryAPI
async function searchMeaning(word) {
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            document.querySelector('.error').classList.remove('hide');
            throw new Error(`Word not found: ${response.status}`);
        }
        const jsonData = await response.json();
        let data = jsonData[0];

        //taking & handling all the required values
        let mean = data.meanings[0].definitions[0].definition;
        let exp = data.meanings[0].definitions[0].example == undefined ? " " : data.meanings[0].definitions[0].example;
        let synonyms = data.meanings[0].synonyms.join(", ");
        let antonyms = data.meanings[0].antonyms.join(", ");


        content.classList.remove('box');

        // Parse the required details
        content.innerHTML = 
        `
            <h2 class="word wordTxt">${word}</h2>
            <p class="word">Meaning: <span class="txt means">${mean}</span></p>
            <p class="word">Example: <span class="txt exp">${exp}</span></p>
            <p class="word">Synonyms: <span class="txt syn">${synonyms}</span></p>
            <p class="word">Antonyms: <span class="txt anto">${antonyms}</span></p>
        `

    } catch (error) {
        console.log(`Error fetching details for word "${word}":`, error);
        return;
    }
}

//Search Function
function handleSee(){
    let text = word.value;
    if(text){
        error.classList.add('hide');
        searchMeaning(text);
    }
    else{
        error.classList.remove('hide');
    }
   
}

see.addEventListener("click", (e) => {
    e.preventDefault()
    handleSee();
});

word.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
        handleSee();
    }
})
