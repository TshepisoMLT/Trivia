// @ts-nocheck
const url2 = "https://opentdb.com/api_category.php"
const url3 = "https://opentdb.com/api_difficulty.php";
const opt2 = { method: "GET", headers: { Accept: "application/json" } };

let allCategories = [];
let categoryName;
let categoryId;
let selectOptions = [];
let select = document.getElementById("category");

async function getCategories() {
  try {
    const res2 = await fetch(url2, opt2);
    const data2 = await res2.json();

    allCategories = data2.trivia_categories;

    allCategories.forEach((category) => {
      let option = document.createElement("option");
      option.innerText = category.name;
      option.setAttribute("id", category.id);
      select.appendChild(option);
    });
  } catch (error) {
    console.error("ERROR", error);
  }
}
getCategories();





async function getDifficulties() {
  try {
    const res3 = await fetch(url3, opt2);
    const data3 = await res3.json();

    allDifficulties = data3.trivia_difficulties;

    console.log(allDifficulties);
  } catch (error) {
    console.error("ERROR", error);
  }
}
// getDifficulties();

    

//data = requests.get("https://opentdb.com/api.php?amount=1&category={}&difficulty=easy".format(category_id)).json()

// export {categoryId}