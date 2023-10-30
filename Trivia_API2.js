// @ts-nocheck
const url2 = "https://opentdb.com/api_category.php"
const opt2 = {method : "GET", headers:{Accept: "application/json"}}


let allCategories = []
let categoryName
let categoryId 
let selectOptions = []
async function categories(){
    let catId = localStorage.getItem('Id')|| 1
    try {
        const res = await fetch(url2,opt2)
        const data = await res.json()
        
        
        data.trivia_categories.forEach(trivia_categorie=>
        {
            allCategories = data.trivia_categories
            selectOptions = data.trivia_categories.id
        })

        let select = document.getElementById('Category')
        allCategories.forEach(category=>{
            
            let option = document.createElement('option')
            option.setAttribute('id', category.id)
            option.setAttribute('class', 'option-list')
            option.innerText= category.name
            select.appendChild(option)
        
        })

        //document.querySelector('Category')
        // console.log(select)
        // selectOptions.forEach(elm =>{
        //     console.log(elm)
        // })
        
            
    } catch (error) {
        console.log(error)
    }
}

categories()



//data = requests.get("https://opentdb.com/api.php?amount=1&category={}&difficulty=easy".format(category_id)).json()

// export {categoryId}