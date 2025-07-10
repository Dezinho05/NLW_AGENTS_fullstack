const apiKeyInput = document.getElementById('apikey');
const gameSelect = document.getElementById('gameSelect');
const questionInput = document.getElementById('questionInput');
const askButton = document.getElementById('askButton');
const aiResponse = document.getElementById('aiResponse');
const form = document.getElementById('form');

function htmlMarkdown(text){
    const converter = new showdown.Converter();
    return converter.makeHtml(text);
}

//AIzaSyCDxmpIgp5DwNk_KRLjSgZ1xQWYIp9aPxg ?${apiKey}
async function aiQuestion(apiKey, question, game){
    const model = "gemini-2.0-flash";
    const aiURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
    const questionInput = `
        ## Especialidade
            Você é especialista no jogo ${game}
        ## Tarefa
            Você deve responder as perguntas do usuário com base no seu conhecimento de jogo, estratégias, builds e dicas. 
        ## Regras
            - Se você não souber a resposta, responda com "Sinto muito, não tenho informações sobre isso." e não tente inventar uma resposta. Seu papel não é agradar, é passar realidade.
            - Se a pergunta não abordar ou não estiver relacionada ao jogo, responda "Essa pergunta não está relacionada ao jogo".
            - Considere a data atual ${new Date().toLocaleDateString()}.
            - Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para responder de forma coerente.
            - Não responda dados que você não tenha certeza.
            - Economize na resposta, seja direto com o que usuário perguntou. Sem formalidades como saudações, despedidas ou qualquer outra.
            - Separe e estruture bem o markdown para melhorar a dinâmica de leitura do usuário.
        ## Exemplo de pergunta
            Qual a build mais atual do Yasuo?
        ## Exemplo de resposta
            **Build Core insira_nome_campeao do patch insira_patch_atual:**\n\n**1. Mata-Cráquens:** oferece dano consistente ao longo do tempo, escalando bem com o crítico do Yasuo, além de uma passiva que inflige dano verdadeiro a cada 3° ataque básico.\n\n **2. Botas do Berserker:** Melhora sua mobilidade e DPS..\n\n**3. Gume do Infinito:** Priorize este item para aumentar seu dano crítico e potencial de carry.\n\n**4. Dança da Morte:** Oferece dano, armadura, redução do tempo de recarga das habilidades e sustain. Permite que você sobreviva por mais tempo em lutas.\n\n**Itens Situacionais:** A partir daqui, a build se torna mais flexível e depende da partida. Algumas opções populares incluem:\n**Anjo Guardião:** Se você está morrendo muito ou precisa de uma segurança extra.\n**Sedenta por Sangue:** Se você precisa de mais sustain e roubo de vida.\n**Lembranças do Lorde Dominik:** Se o time inimigo tiver muita armadura.\n**Quebracascos:** Se você quer ter mais poder de split-push.\n**Semblante Espiritual:** Se o time inimigo tiver muito dano mágico.\n\n\n**Runas:**\n\n**Principal (Precisão):**\n**Ritmo Fatal:** Aumenta sua velocidade de ataque ao longo do tempo, ideal para trocas prolongadas e lutas em equipe.\n**Triunfo:** Recupera vida após abates e assistências, aumentando sua capacidade de sobreviver em lutas.\n**Lenda: Espontaneidade:** Oferece velocidade de ataque adicional.\n**Golpe de Misericórdia:** Aumenta o dano contra alvos com pouca vida.\n\n**Secundária (Dominação):**\n**Gosto de Sangue:** Oferece sustain adicional na lane.\n**Caçador Voraz:** Concede roubo de vida adicional ao abater campeões inimigos.\n\n\n**Habilidades:**\n**Q (Tempestade de Aço)**, > **E (Espada Audaciosa)** > **W (Parede de Vento)**.
            ---
            A pergunta do usuário é: ${question}`;
    const contents = [{
        parts: [{
            text: questionInput
        }]
    }];
    const tools = [{
        google_search: {}
    }]
    const data = await fetch(aiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-goog-api-key': `${apiKey}`
        },
        body: JSON.stringify({
            contents,
            tools
        })
    });

    const response = await data.json();
    console.log({response})
    return response.candidates[0].content.parts[0].text
};

form.addEventListener('submit',async (event) => {
    event.preventDefault();

    const apiKey = apiKeyInput.value;
    const game = gameSelect.value;
    const question = questionInput.value;

    if(apiKey == '' || game == '' || question == ''){
        alert(`Preencha todos os campos`);
        return
    }

    askButton.disabled = true;
    askButton.textContent = "Perguntando...";
    askButton.classList.add('loading');

    try {
        const response = await aiQuestion(apiKey, question, game);
        aiResponse.querySelector('.response-content').innerHTML = htmlMarkdown(response);
        aiResponse.classList.remove('hidden');
    } catch(err){
        console.log("Error: ", err);
        alert(`Algo inexperado correu.`);
    } finally  {
        askButton.disabled = false;
        askButton.textContent = "Perguntar";
        askButton.classList.remove('loading');
    }
})