class Questions{
   constructor(questionText, options, answer){
      this.questionText = questionText
      this.options = options
      this.answer = answer
   }

   printOnHTML(id,text){
      let element = document.getElementById(id);
      element.innerHTML = text;
   }
   displayQuestion(){
      this.printOnHTML("question", this.questionText)

      for(let i = 0; i < this.options.length ; i++){
         this.printOnHTML("option" + i , this.options[i])  
         this.setNewValuesToOptions()
      }
   }

   setNewValuesToOptions(){
      for(let i = 0; i < this.options.length ; i++){
         let element = document.getElementById("guess" + i)
         element.setAttribute("value" , this.options[i])         
      }
   }



   findAnswer(){
      for(let option of this.options){
         if (option === this.answer){
            return option;
         }
      }   
   }
   
}

class Quiz {    // اکسپورت برای اینه که بتونیم توی فایل های دیگه ارث بریش کنیم
   constructor(questions){
      this.questions = questions;
      this.score = 0;
      this.questionIndex = 0;
   }

   nextPrev(){
      questions[this.questionIndex].displayQuestion() // at first display the first question
      this.displayProgress()

      let nextButton = document.getElementById("next")
      let prevButton = document.getElementById("prev")

      nextButton.addEventListener("click" , ()=>{
         if(this.questionIndex < questions.length -1){ // برای اینکه بیشتر از ایندکس سوال ها زیادتر نشه
            this.saveAnswer(questions[this.questionIndex])         
            this.questionIndex++;
         }
         questions[this.questionIndex].displayQuestion()
         this.showLastChoice(questions[this.questionIndex])
         this.displayProgress()
      })
      prevButton.addEventListener("click" , ()=>{
         if(this.questionIndex > 0){ // برای اینکه ایندکس سوال ها منفی نشه
            this.saveAnswer(questions[this.questionIndex])         
            this.questionIndex--;
         }
         questions[this.questionIndex].displayQuestion()
         this.showLastChoice(questions[this.questionIndex])
         this.displayProgress()
      })

   }

   numberOfquestions = questions.length
   arrayOfGuesses = new Array(this.numberOfquestions)

   saveAnswer(question){
      let guesses = this.guessHandler()  // گزینه ها را در خود دارد
      let index = questions.indexOf(question) // تعیین کند سوال چند هستیم
      for(let guess of guesses){
         
         if(guess.checked){

            
            let option = document.getElementById("option" + guesses.indexOf(guess))
            option.style.backgroundColor="rgb(4, 14, 35)"
            option.style.color = "white"

            let lables = []     
            for(let i =0 ; i < 4 ; i++){
               let lable = document.getElementById("option" + i)
               lables.push(lable)
            }

            guess.checked = false;

            this.arrayOfGuesses.splice(questions.indexOf(question),1, guesses.indexOf(guess))          
         }

      }
   }

   showLastChoice(question){    // اخرین جوابی که قبلا به سوالی داده شده را موقع برگشت به آن سوال، تیک بزند
      let guesses = this.guessHandler()

      let indexOfQuestion = questions.indexOf(question)
      let indexOfLastChoice = this.arrayOfGuesses[indexOfQuestion]

      if(indexOfLastChoice !== undefined){
         guesses[indexOfLastChoice].checked = true;
         let choosen = document.getElementById("option" + indexOfLastChoice)
         choosen.style.backgroundColor = "lightgray"
         choosen.style.color = "black"
      }
   }

   guessHandler(){  // دکمه های گزینه ها را برمیگرداند
      let guesses = []     
      for(let i =0 ; i < 4 ; i++){
         let guess = document.getElementById("guess" + i)
         guesses.push(guess)
      }
      
      return guesses;
   }

   static butonsOnClick(){
      let guesses = []     
      for(let i =0 ; i < 4 ; i++){
         let guess = document.getElementById("guess" + i)
         guesses.push(guess)
      }
      let lables = []     
      for(let i =0 ; i < 4 ; i++){
         let lable = document.getElementById("option" + i)
         lables.push(lable)
      }
      for(let i in guesses){
         
         if(guesses[i].checked){
            lables[i].style.backgroundColor = "lightgray"
            lables[i].style.color = "black"

         }
         else{
            lables[i].style.backgroundColor = "rgb(4, 14, 35)"  // برای اینکه وقتی در یک سوال بر روی چند گزینه کلیک شده باشد                                                                // فقط اخرین کلیک را رنگش را عوض کند
            lables[i].style.color = "white"
         }
         lables[i].addEventListener("mouseenter",()=>{
            lables[i].style.backgroundColor="lightgray"
            lables[i].style.color="black"
         })
         lables[i].addEventListener("mouseleave",()=>{
            if(guesses[i].checked==false){
               lables[i].style.backgroundColor="rgb(4, 14, 35)"
               lables[i].style.color="white"
            }
         } )
      }
   }


   IsCorrectAnswer(question,guess){
      return guess === question.answer
   }

   arrayOfAnswers = new Array(this.numberOfquestions)

   packAnswers(){      // گزینه ی جواب هر سوال را در ارایه میریزد
      for(let question of questions){
         let answer = question.findAnswer()
         let gozine = question.options.indexOf(answer)
         this.arrayOfAnswers.splice(questions.indexOf(question),1,gozine) 
      }
   }

   calculateScore(){
      this.packAnswers()

      for(let i = 0 ; i< this.arrayOfAnswers.length ; i++){
         if(this.arrayOfGuesses[i] === this.arrayOfAnswers[i]){
            this.score ++
         }
      }
      
   }

   displayProgress(){
      let progress = document.getElementById("progress")
      progress.innerHTML = `Question <span class= numberOfQuestion>${this.questionIndex +1}</span>
      <span class= numberOfQuestions>/ ${this.numberOfquestions}</span>`
   }

   hideElements(){
      let elements = document.getElementsByClassName("element")
      for(let i=0 ; i< elements.length ; i++){
         elements[i].style.display="none"
      }
     
      let questionContainer = document.getElementById("questionContainer")
      let optionContainer = document.getElementById("optionContainer")
      questionContainer.remove()
      optionContainer.remove()
   }

   displayScore(){
      let score = document.getElementById("displayScore")
      score.innerHTML += `<br></br> ${this.score} / ${questions.length}`
      score.style.display= "block"
   }



   EndOfExam(){
      let button = document.getElementById("end")
      button.addEventListener("click", ()=>{
         for(let i = 0 ; i< questions.length ; i++){  // برای اینکه اگه هرجای آزمون دکمه ی پایان رو زد، جواب اون سوال هم سیو بشه
            if(this.questionIndex === i){
               this.saveAnswer(questions[this.questionIndex])
            }
         }

         this.hideElements()
         this.calculateScore();
         this.displayScore();
      })
   }

   displayQuiz(){
      for(let question of questions){
         question.displayQuestion()
      }
      //this.guessHandler()
      this.nextPrev()
      this.EndOfExam()
   }
/*
   createQuiz(){
      let createExamBtn = document.getElementsByClassName("createExamBtn")
      createExamBtn.addEventListener("click", ()=>console.log("H"))
   }
*/

}





let questions = [new Questions("Which one is the best?" , ["Breaking Bad" , "Game Of Thrones" , "Peaky Blinders" , "True Detective"] , "Game Of Thrones"),
                 new Questions("Who is the greatest actor?" , ["Leonardo Dicaprio" , "Brad pitt" , "Daniel Day-Lewis" , "Benedict Cumberbatch"] , "Daniel Day-Lewis") , 
                 new Questions("4 * 5" , ["3" , "20" , "15" , "7"] , "20"),
                 new Questions("7 * 8" , ["56" , "32" , "9" , "10"] , "56"),
               ]

let quiz = new Quiz(questions)

quiz.displayQuiz()












