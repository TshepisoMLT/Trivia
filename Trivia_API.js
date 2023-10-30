// @ts-nocheck

const categoryUrl = "https://opentdb.com/api_category.php";
const url = "https://opentdb.com/api.php?amount=1&category=16&difficulty=easy";
// const API_URL1 = "https://opentdb.com/api.php?amount=1&category={}&difficulty=easy".format(category_id)

const opt = { method: "GET", headers: { Accept: "application/json" } };

let online = navigator.onLine;

let pointsEarned = 0;
let limit = document.getElementById("limit");
let selectedLimit = 5;
let limitCount = 0;
let a;
let categoryName;
let categoryId;
let selectedOption = 9;
let selectedDifficulty = "easy";
let allOptions;
let select = document.getElementById("category");
let difficulty = document.getElementById("difficulty");

const getCategories = async () => {
  try {
    const res = await fetch(categoryUrl);
    const data = await res.json();
    const allCategories = await data.trivia_categories;

    allCategories.forEach((category) => {
      let option = document.createElement("option");
      option.innerText = category.name;
      option.setAttribute("id", category.id);
      select.appendChild(option);
    });

    allOptions = await select.children;
  } catch (error) {
    console.log(error);
  }
};

async function getData() {
  if (limitCount == selectedLimit) {
    const val = pointsEarned / selectedLimit;
    let emoji = val > 0.5 ? "👏" : "😢";
    let ul = document.querySelector("ul");

    setTimeout(() => {
      let li = document.createElement("li");
      li.innerText = `Restart`;
      li.setAttribute("class", "reset-button");
      ul.appendChild(li);
      document.getElementById(
        "ques"
      ).innerHTML = `You scored ${pointsEarned}/${selectedLimit} ${emoji}`;
      document.getElementById(
        "points-field"
      ).innerHTML = `Points: ${pointsEarned}`;
    }, 3000);

    return;
  } else {
    limitCount = limitCount + 1;
  }
  try {
    const res = await fetch(
      `https://opentdb.com/api.php?amount=1&category=${selectedOption}&difficulty=${selectedDifficulty}`,
      opt
    );
    const data = await res.json();
    let questions = null;
    let correctAnswer = null;
    let incorrectAnswers = [];
    let lists = [];
    let ul = document.querySelector("ul");
    while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }
    data.results.forEach((result) => {
      questions = result.question;
      correctAnswer = result.correct_answer;
      incorrectAnswers = result.incorrect_answers;
    });

    let allAnswers = incorrectAnswers.concat(correctAnswer);
    setTimeout(() => {
      allAnswers.sort();

      const b = (document.getElementById("ques").innerHTML = questions);

      allAnswers.forEach((answer) => {
        let li = document.createElement("li");

        li.innerText = answer;
        li.setAttribute("class", "answer-opt");
        ul.appendChild(li);
      });

      lists = ul.childNodes;

      ul.addEventListener("click", match(lists));

      function match(lists) {
        lists.forEach((list) => {
          list.onclick = function () {
            if (this.innerHTML == correctAnswer) {
              list.setAttribute("class", "correct-answer");
              pointsEarned = pointsEarned + 1;

              setTimeout(() => {
                while (ul.firstChild) {
                  ul.removeChild(ul.firstChild);
                }
                return;
              }, 3000);
            } else {
              list.setAttribute("class", "incorrect-answer");
              let liElement = document.querySelectorAll("answer-opt");

              setTimeout(() => {
                while (ul.firstChild) {
                  ul.removeChild(ul.firstChild);
                }
                return;
              }, 3000);
            }
            const b = (document.getElementById("ques").innerHTML =
              "Loading...");
            getData();
          };
        });
      }
    }, 3000);
  } catch (error) {
    console.log("Error", error);
  }
  if (pointsEarned === null || undefined || NaN || 0) {
    a = document.getElementById("points-field").innerHTML;
  } else {
    a = document.getElementById(
      "points-field"
    ).innerHTML = `${limitCount} - ${selectedLimit}`;
  }
}

if (online) {
  select.addEventListener("change", function () {
    selectedOption = this.selectedOptions[0].id;
    limitCount = 0;
    pointsEarned = 0;
    const b = (document.getElementById("ques").innerHTML =
              "Loading...");
    getData();
  });
  difficulty.addEventListener("change", function () {
    let difficultyChildren = difficulty.children;
    let selectedOption = Array.from(difficultyChildren).find(
      (child) => child.selected
    );
    selectedDifficulty = selectedOption.id;
    limitCount = 0;
    pointsEarned = 0;
    const b = (document.getElementById("ques").innerHTML =
              "Loading...");
    getData();
  });
  limit.addEventListener("change", function () {
    let limitChildren = limit.children;
    let selectedOption = Array.from(limitChildren).find(
      (child) => child.selected
    );
    selectedLimit = selectedOption.id;
  });
  window.addEventListener("load", getCategories());
} else {
  document.getElementById("ques").innerHTML = "Please connect to the internet";
}

const ul = document.querySelector("ul");

ul.addEventListener("click", (e) => {
  if (e.target.className === "reset-button") {
    limitCount = 0;
    pointsEarned = 0;
    getData();
  }
});
