let containerOfMadeQuiz = document.getElementById("containerOfMadeQuiz")
let background = document.getElementById("background")

containerOfMadeQuiz.remove()

//background.append(containerOfMadeQuiz)

let textArea = document.getElementById("textArea")
let createNextBtn = document.getElementById("createNextBtn")
let createExamBtn = document.getElementById("createExamBtn")
let options = document.getElementsByClassName("options")


let allOfTheQuestions =[]

createNextBtn.addEventListener("click", ()=>{  // با کلیک شدن، متن سوال و گزینه ها و جواب درست را به صورت ارایه برمیگرداند
   let questionText = textArea.value 
   let optionsText = []

   for(let i =0; i < 4; i++){
      optionsText.push(options[i].value)
   }

   let rightOptionIndex = document.getElementById("rightAnswer").value
   let rightAnswer = optionsText[rightOptionIndex]

   let allOfQuestion = [questionText, optionsText, rightAnswer]

   allOfTheQuestions.push(allOfQuestion)

   clearSpace()

   console.log(allOfTheQuestions)

})

function clearSpace(){
   textArea.value= null
   for(let i =0; i < 4; i++){
      options[i].value = null
   }
}


