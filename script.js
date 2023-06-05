let quizItems = [];

// ページの読み込み時に保存されたクイズデータを取得
window.addEventListener("load", function() {
    const savedQuizData = localStorage.getItem("quizData");

    if (savedQuizData !== null) {
        try {
            const parsedQuizData = JSON.parse(savedQuizData);
            quizItems = parsedQuizData.items;
        } catch (error) {
            console.error("クイズデータのパースエラー:", error);
            quizItems = [];
        }
    } else {
        quizItems = [];
    }

    renderQuizItems();
});

function addQuestion() {
    const questionInput = document.getElementById("questionInput");
    const answerInput = document.getElementById("answerInput");

    const question = questionInput.value;
    const answer = answerInput.value;

    if (question && answer) {
        const quizItem = {
            question: question,
            answer: answer
        };

        quizItems.push(quizItem);

        const quizItemsList = document.getElementById("quizItems");
        const listItem = document.createElement("li");
        listItem.classList.add("quizItem");
        listItem.textContent = question;

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("deleteButton");
        deleteButton.textContent = "削除";
        deleteButton.addEventListener("click", deleteQuestion.bind(null, quizItems.length - 1));

        listItem.appendChild(deleteButton);
        quizItemsList.appendChild(listItem);

        questionInput.value = "";
        answerInput.value = "";

        saveQuizData();
    } else {
        alert("質問と答えを入力してください");
    }
}

function showAnswer(event) {
    const clickedItem = event.target;
    const quizItemIndex = clickedItem.dataset.quizItem;
    const answer = quizItems[quizItemIndex].answer;

    alert(`答え: ${answer}`);
}

function deleteQuestion(index) {
    if (confirm("本当に削除しますか？")) {
        quizItems.splice(index, 1);
        saveQuizData();
        renderQuizItems();
    }
}

function saveQuizData() {
    const quizData = {
        items: quizItems
    };

    const json = JSON.stringify(quizData);
    localStorage.setItem("quizData", json);
}

function deleteQuestion(index) {
    if (confirm("本当に削除しますか？")) {
        quizItems.splice(index, 1);
        saveQuizData();
        renderQuizItems();
    }
}

function renderQuizItems() {
    const quizItemsList = document.getElementById("quizItems");
    quizItemsList.innerHTML = "";

    quizItems.forEach(function(quizItem, index) {
        const listItem = document.createElement("li");
        listItem.classList.add("quizItem");
        listItem.textContent = quizItem.question;

        listItem.dataset.quizItem = index;
        listItem.addEventListener("click", showAnswer);

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("deleteButton");
        deleteButton.textContent = "削除";

        const listItemContainer = document.createElement("div");
        listItemContainer.classList.add("listItemContainer");
        listItemContainer.appendChild(listItem);
        listItemContainer.appendChild(deleteButton);

        quizItemsList.appendChild(listItemContainer);

        deleteButton.addEventListener('click', function() {
            deleteQuestion(index);
        });
    });
}

function saveQuiz() {
    if (quizItems.length === 0) {
        alert("保存するクイズがありません");
        return;
    }

    saveQuizData();

    alert("クイズが保存されました");
}

window.addEventListener("load", renderQuizItems);