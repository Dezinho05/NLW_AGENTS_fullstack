form.addEventListener('submit', (event) => {
    event.preventDefault();

    const apiKey = apikey.value;
    const game = gameSelect.value;
    const question = questionInput.value;

    aiResponse.innerHTML = `
        <p><strong>API Key:</strong> ${apiKey}</p>
        <p><strong>Jogo:</strong> ${game}</p>
        <p><strong>Pergunta:</strong> ${question}</p>
    `;

    apikey.value = '';
    gameSelect.value = '';
    questionInput.value = '';
});
