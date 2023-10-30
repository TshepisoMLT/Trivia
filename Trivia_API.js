// @ts-nocheck


const url = 'https://opentdb.com/api.php?amount=1&category=16&difficulty=easy'
// const API_URL1 = "https://opentdb.com/api.php?amount=1&category={}&difficulty=easy".format(category_id)

const opt = {method : "GET", headers:{Accept: "application/json"}}

let online = navigator.onLine

let pointsEarned = 0
let a  



async function getData()
{
    pointsEarned = localStorage.getItem('points')|| 0
    try 
    {
        const res = await fetch(url, opt)
        const data = await res.json()
        let questions = null
        let correctAnswer = null
        let incorrectAnswers = []
        let lists = []

        data.results.forEach(result => 
        { 
           questions = result.question
           correctAnswer = result.correct_answer
           incorrectAnswers = result.incorrect_answers
        });
        

        
        let allAnswers = incorrectAnswers.concat(correctAnswer)
        setTimeout(()=>{
        allAnswers.sort()

        const b = document.getElementById("ques").innerHTML = questions
        
        
        let ul = document.querySelector('ul')
        
        
        
         allAnswers.forEach(answer =>
        {
            let li = document.createElement('li')
            
            li.innerText = answer
            li.setAttribute('class', 'answer-opt')
            ul.appendChild(li)
        
        })
    
        lists = ul.childNodes

        ul.addEventListener('click', match(lists))
        
        function match(lists)
        {
            
           
            lists.forEach(list => 
            {
                
                list.onclick=function()
                {   
                    
                        
                    if(this.innerHTML == correctAnswer)
                    {
                        list.setAttribute('class', 'correct-answer' ) 
                        pointsEarned ++
                        localStorage.setItem('points', pointsEarned)
                        setTimeout(()=>
                        {
                            while (ul.firstChild) 
                            {
                                ul.removeChild(ul.firstChild);
                            }
                            return
                        },1000)
                        
                    }
                    else
                    {
                        list.setAttribute('class', 'incorrect-answer' )
                        let liElement = document.querySelectorAll('answer-opt')
                        
                        setTimeout(()=>
                        {
                            while (ul.firstChild) 
                            {
                                ul.removeChild(ul.firstChild);
                            }
                            return
                        },1000)
                    }
                getData()
                }
            
            })
        }
    },2000)
        
    } 
    catch(error)
    {  
        console.log('Error',error)
    }
a= document.getElementById("points-field").innerHTML = `Points:${pointsEarned}`
    
}

if(online){
  getData() 
   
}else{
    document.getElementById("ques").innerHTML = "Please connect to the internet"
    
}









    
