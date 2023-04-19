const sendButton = document.querySelector("#split-button");
sendButton.addEventListener("click", splitText);

function splitText() {
    let input = document.querySelector("#text-input").value;
    const splitRegEx = /(\.\s|\?\s|!\s|\."\s|\.“\s|\.«\s|\.»\s|:\s)/g;
    // unvollständig
    let sentences = input.split(splitRegEx); // Satztrennung durchführen

    let maxLength = 500; // Maximale Länge eines Elements im Array
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
        currentChunk += sentence + ". ";
    }

    // Füge den letzten Chunk zum Ergebnis-Array hinzu
    if (currentChunk) {
        result.push(currentChunk.trim());
    }

document.querySelector("#debug").innerHTML = sentences;
    result.forEach(textSnippet => {
        let threadPart = document.createElement("textarea");
        threadPart.value = textSnippet;
        threadPart.rows = 15;
        threadPart.cols = 40;
        document.body.append(threadPart);
    });
}
