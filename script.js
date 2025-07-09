const apiKeyInput = document.getElementById('apikey');
const gameSelect = document.getElementById('gameSelect');
const questionInput = document.getElementById('questionInput');
const askButton = document.getElementById('askButton');
const aiResponse = document.getElementById('aiResponse');
const form = document.getElementById('form');

form.addEventListener('submit',(event) => {
    event.preventDefault();

    const inputs = [
        apiKeyInput.value,
        gameSelect.value,
        questionInput.value
    ]
    console.log("inputs:", inputs)
})