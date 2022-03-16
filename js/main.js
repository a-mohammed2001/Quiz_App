let quiz_app = document.querySelector(".quiz_app"),
  //
  quiz_info = document.querySelector(".quiz_app .quiz_info"),
  category = document.querySelector(".quiz_app .quiz_info .category"),
  count = document.querySelector(".quiz_app .quiz_info .count"),
  //
  quiz_area = document.querySelector(".quiz_app .quiz_area"),
  quiz_title = document.querySelector(".quiz_app .quiz_area .quiz_title"),
  answers_area = document.querySelector(".quiz_app .quiz_area .answers_area"),
  // answer = document.querySelector(".quiz_app .quiz_area .answers_area .answer"),
  submit_button = document.querySelector(".quiz_app .submit_button"),
  //
  bullets = document.querySelector(".quiz_app .bullets"),
  bullets_spans = document.querySelector(".quiz_app .bullets .bullets_spans"),
  // countdown
  countdown = document.querySelector(".quiz_app .countdown"),
  minutes = document.querySelector(".quiz_app .countdown .minutes"),
  seconds = document.querySelector(".quiz_app .countdown .seconds"),
  //
  question_index = 0, //Math.floor(Math.random() * questions.length);
  correct_answers = 0;
async function getApi() {
  try {
    const response = await fetch("https://a-mohammed2001.github.io/Quiz_App/js/questions.json");
    const questions = await response.json();
    showData(questions, question_index);
    //
    submit_button.addEventListener("click", function () {
      let answer_checkbox = document.getElementsByName("question");
      let right_answer = questions[question_index].right_answer;

      chooseAnswer(answer_checkbox, right_answer);
      quiz_title.innerHTML = "";
      answers_area.innerHTML = "";
      validAnswer(question_index);
      question_index++;
      if (question_index < 3) {
        showData(questions, question_index); //recreate showData
      }
    });
  } catch (error) {
    console.log(`Error is : ${error}`);
  }
}
function showData(questions, question_index) {
  for (let i = 1; i <= 4; i++) {
    quiz_title.innerHTML =
      question_index + 1 + " " + questions[question_index].title;

    let answer = document.createElement("div");
    answer.className = "answer";
    let input_radio = document.createElement("input");
    input_radio.id = `answer_${i}`;
    input_radio.name = "question";
    input_radio.type = "radio";
    input_radio.setAttribute(
      "data-answer",
      `${questions[question_index][`answer_${i}`]}`
    );
    answer.appendChild(input_radio);
    let label = document.createElement("label");
    label.htmlFor = `answer_${i}`;
    label.textContent = `${questions[question_index][`answer_${i}`]}`;
    answer.appendChild(label);
    answers_area.appendChild(answer);
  }
}

function chooseAnswer(answer_checkbox, right_answer) {
  for (let i = 0; i <= 3; i++) {
    if (answer_checkbox[i].checked) {
      var the_chosen_answer = answer_checkbox[i];
      console.log();
      if (right_answer === the_chosen_answer.getAttribute("data-answer")) {
        correct_answers++;
      }
    }
  }
}
function validAnswer(question_index) {
  if (question_index < 2) {
    bullets.children[question_index].style.backgroundColor = "#0077ff";
    console.log(question_index);
  } else {
    getResult(question_index);
  }
}
function getResult(question_index) {
  bullets.children[question_index].style.backgroundColor = "#0077ff";
  submit_button.disabled = "true";

  if (correct_answers === 3) {
    answers_area.innerHTML =
      "Perfect Your Correct Answers Is : " + correct_answers;
  }
  else if (correct_answers === 2) {
    answers_area.innerHTML =
      "Good Your Correct Answers Is : " + correct_answers;
  } else {
    answers_area.innerHTML = "Bad Your Correct Answers Is : " + correct_answers;
  }
}

getApi();
