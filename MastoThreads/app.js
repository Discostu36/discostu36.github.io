// count characters on input
document.querySelector("#text-input").addEventListener('change', function() {
    document.querySelector("#input-container .character-counter").innerText = document.querySelector("#text-input").value.length
})

const sendButton = document.querySelector("#split-button");
sendButton.addEventListener("click", splitText);

// split text into posts
function splitText() {
   var charLimit = 500; document.querySelector("#result>h2").style.display = "block";
    document.querySelector("#result").scrollIntoView({ behavior: "smooth"});
    document.querySelector("#results-grid").innerHTML = "";
    let input = document.querySelector("#text-input").value;
    const splitRegEx = /(?<=\D\.\s|.\?\s|.!\s|\."\s|\.“\s|\.«\s|\.»\s|!"\s|!“\s|!«\s|.!»|\?"\s|\?“\s|\?«\s|\?»\s|.:\s|..\n)/g;
    // should be extended
    let sentences = input.split(splitRegEx); // Split input

    let maxLength = charLimit - 7; // Reserve space for thread count
    let result = [];

    let currentChunk = "";
    for (let i = 0; i < sentences.length; i++) {
        let sentence = sentences[i];

        // Wenn der aktuelle Satz plus das Trennzeichen die maximale Länge überschreitet,
        // füge den aktuellen Chunk zum Ergebnis-Array hinzu und setze den Chunk zurück
        if (currentChunk.length + sentence.length + 2 > maxLength) {
            result.push(currentChunk.trim());
            currentChunk = "";
        }

        // Füge den aktuellen Satz zum Chunk hinzu
        currentChunk += sentence;
    }

    // Füge den letzten Chunk zum Ergebnis-Array hinzu
    if (currentChunk) {
        result.push(currentChunk.trim());
    }

    result.forEach((textSnippet, index, array) => {
let counter = index + 1;
        let threadCount = counter + "/" + array.length;
        let threadPart = document.createElement("textarea");
        threadPart.value = textSnippet + "\n\n" + threadCount;
        threadPart.rows = 15;
        threadPart.cols = 40;
        document.querySelector("#results-grid").append(threadPart);
    });
}
/* To Do:
- Show number of characters
- Copy button
- Toggle char limit
- Resize text area for content https://stackoverflow.com/questions/2803880/is-there-a-way-to-get-a-textarea-to-stretch-to-fit-its-content-without-using-php
 */