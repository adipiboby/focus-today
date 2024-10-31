const checkBoxList = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll(".goal-input");
const errorLabel = document.querySelector(".error-label");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};
let completedGoalsCount = Object.values(allGoals).filter((goal)=>goal.completed).length

checkBoxList.forEach((checkBox) => {
  checkBox.addEventListener("click", (e) => {
    const allFieldsFilled = [...inputFields].every(function (input) {
     
      return input.value;
    });
    if (allFieldsFilled) {
      checkBox.parentElement.classList.toggle("completed");
      const inputId = checkBox.nextElementSibling.id;
      allGoals[inputId].completed = !allGoals[inputId].completed
      completedGoalsCount = Object.values(allGoals).filter((goal)=>goal.completed).length
      progressValue.style.width = `${(completedGoalsCount/3)*100}%`;
      localStorage.setItem("allGoals", JSON.stringify(allGoals));

    } else {
      progressBar.classList.add("show-error");
    }
  });
});

inputFields.forEach((input) => {
  input.value = allGoals[input.id].name;
  if (allGoals[input.id].completed) {
    input.parentElement.classList.add("completed");
  }

  input.addEventListener("focus", () => {
    progressBar.classList.remove("show-error");
  });
  input.addEventListener("input", (e) => {
    allGoals[input.id] = {
      name: input.value,
      completed: false,
    };
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});
