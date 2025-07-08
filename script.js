const quizData = [
    {
        question: "Quem foi considerado o primeiro homem criado por Deus?",
        options: ["Zeus", "Adão", "Noé", "Jesus"],
        answer: 1
    },
    {
        question: "Qual é o nome da primeira mulher criada por Deus, esposa de Adão?",
        options: ["Saara", "Ana", "Eva", "Lilith"],
        answer: 2
    },
    {
        question: "Quem foi o responsável pela construção da arca que salvou sua família e os animais do dilúvio?",
        options: ["João Batista", "Abraão", "Jesus", "Noé"],
        answer: 3
    },
    {
        question: "Quem são os pais de Jesus Cristo segundo a tradição cristã?",
        options: ["Adão e Eva", "Abraão e Sarai", "José e Maria", "Tobias e Sara"],
        answer: 2
    },
    {
        question: "Quantos discípulos Jesus tinha durante seu ministério?",
        options: ["10", "12", "14", "16"],
        answer: 1
    },
    {
        question: "Em qual cidade nasceu Jesus?",
        options: ["Nazaré", "Belém", "Israel", "Jerusalém"],
        answer: 1
    },
    {
        question: "Quem foi o jovem que derrotou o gigante Golias?",
        options: ["Caim", "Davi", "Cristóvão", "Sophia"],
        answer: 1
    },
    {
        question: "Qual é o primeiro livro da Bíblia?",
        options: ["Gênesis", "Apocalipse", "Atos dos Apóstolos", "O Menino Maluquinho"],
        answer: 0
    },
    {
        question: "Quem realizou o milagre de alimentar cinco mil pessoas com apenas cinco pães e dois peixes?",
        options: ["Felipe", "Mateus", "Jesus", "Pedro"],
        answer: 2
    },
    {
        question: "Após quantos dias Jesus ressuscitou?",
        options: ["Zero dias", "1 dia", "2 dias", "3 dias"],
        answer: 3
    },
    
];

// Define perguntas com base na dificuldade escolhida
const urlParams = new URLSearchParams(window.location.search);
const modo = urlParams.get("modo");
let perguntasSelecionadas = modo === "facil" ? quizData.slice(0, 10) : quizData;

let currentQuestion = 0;
let score = 0;

const quizForm = document.getElementById("quizForm");

function loadQuestion() {
    const questionObj = perguntasSelecionadas[currentQuestion];
    document.getElementById("questionText").innerText = `(${currentQuestion + 1}/${perguntasSelecionadas.length}) ${questionObj.question}`;

    const optionsContainer = document.getElementById("optionsContainer");
    optionsContainer.innerHTML = "";

    questionObj.options.forEach((option, index) => {
        const label = document.createElement("label");
        label.classList.add("Botão");
        label.innerHTML = `
            <input type="radio" name="answer" value="${index}">
            ${option}
        `;
        label.addEventListener("click", () => marcarCor(label));
        optionsContainer.appendChild(label);
    });

    updateHeader();
}

function marcarCor(clickedLabel) {
    const allLabels = document.querySelectorAll('label.Botão');
    allLabels.forEach(label => label.classList.remove("selecionado"));

    clickedLabel.classList.add("selecionado");
    clickedLabel.querySelector("input[type=radio]").checked = true;
}

function handleSubmit(event) {
    event.preventDefault();

    const selectedInput = document.querySelector('input[name="answer"]:checked');
    if (!selectedInput) {
        alert("Por favor, selecione uma opção.");
        return;
    }

    const answer = parseInt(selectedInput.value);
    const labels = document.querySelectorAll("label.Botão");

    labels.forEach((label, index) => {
        const input = label.querySelector("input");
        label.classList.remove("selecionado");

        if (index === perguntasSelecionadas[currentQuestion].answer) {
            label.classList.add("correta");
        } else if (input.checked) {
            label.classList.add("errada");
        }
    });

    if (answer === perguntasSelecionadas[currentQuestion].answer) {
        score++;
    }

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < perguntasSelecionadas.length) {
            loadQuestion();
        } else {
            quizForm.style.display = "none";
            document.getElementById("result").innerText = `Você acertou ${score} de ${perguntasSelecionadas.length} questões!`;
        }
    }, 1000);
}

function updateHeader() {
    document.getElementById("questionCounter").innerText = `Pergunta ${currentQuestion + 1} de ${perguntasSelecionadas.length}`;
    document.getElementById("scoreCounter").innerText = `Pontos: ${score}`;
}

quizForm.addEventListener("submit", handleSubmit);
loadQuestion();
