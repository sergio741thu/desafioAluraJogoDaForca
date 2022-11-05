const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");


let options = {
 Jogar : [
    "astronauta", "mercurio", "venus", "saturno", "planetas", 
    "urano", "netuno", "marte", "terra", "foguete", "satelites" ,
    "estrelas", "meteoros", "meteoritos", "galaxias", "jupiter", ]
};

let winCount = 0;
let count = 0;
let chosenWord = "";

//Button

const displayOptions = () => {
  optionsContainer.innerHTML += `<h3>Desafio Alura - Jogo da Forca</h3>`;
  let buttonCon = document.createElement("div");
  for (let value in options) {
    buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
  }
  optionsContainer.appendChild(buttonCon);
};
//blocker Button
const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");
  
  optionsButtons.forEach((button) => {
    button.disabled = true;
  });
  
  letterButtons.forEach((button) => {
    button.disabled.true;
  });
  newGameContainer.classList.remove("hide");
};
//Generate options
const generateWord = (optionValue) => {
  let optionsButtons = document.querySelectorAll(".options");
  
  optionsButtons.forEach((button) => {
    if (button.innerText.toLowerCase() === optionValue) {
      button.classList.add("active");
    }
    button.disabled = true;
  });
  //Create dashes
  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";
  let optionArray = options[optionValue];
  //sistema aleatório
  chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
  chosenWord = chosenWord.toUpperCase();
  
  let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');
  
  userInputSection.innerHTML = displayItem;
};
// New game
const initializer = () => {
  winCount = 0;
  count = 0;
  //Clear
  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";
  //library ASCII
  for (let i = 65; i < 92; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    
    button.innerText = String.fromCharCode(i);
    
    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");
      
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          
          if (char === button.innerText) {
            
            dashes[index].innerText = char;
            
            winCount += 1;
            
            if (winCount == charArray.length) {
              resultText.innerHTML = `<h2 class='win-msg'> Você acertou!!</h2><p>A palavra é <span>${chosenWord}</span></p>`;
              
              blocker();
            }
          }
        });
      } else {
        //lose 
        count += 1;
        
        drawMan(count);
        //Desenho completo
        if (count == 6) {
          resultText.innerHTML = `<h2 class='lose-msg'>Você Perdeu!!</h2><p>A palavra correta é <span>${chosenWord}</span></p>`;
          blocker();
        }
      }
      //disable clicked button
      button.disabled = true;
    });
    letterContainer.append(button);
  }
  displayOptions();
  
  let { initialDrawing } = canvasCreator();
  
  initialDrawing();
};
//Canvas
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 3;
  
  const drawLine = (fromX, fromY, toX, toY) => {
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.stroke();
  };
  const head = () => {
    context.beginPath();
    context.arc(70, 30, 10, 0, Math.PI * 2, true);
    context.stroke();
  };
  const body = () => {
    drawLine(70, 40, 70, 80);
  };
  const leftArm = () => {
    drawLine(70, 50, 50, 70);
  };
  const rightArm = () => {
    drawLine(70, 50, 90, 70);
  };
  const leftLeg = () => {
    drawLine(70, 80, 50, 110);
  };
  const rightLeg = () => {
    drawLine(70, 80, 90, 110);
  };
  
  const initialDrawing = () => {
    //clear 
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    //Canvas
    drawLine(10, 130, 230, 130);
    
    drawLine(10, 10, 10, 131);
    drawLine(70, 10, 10, 131);
    
    drawLine(10, 10, 70, 10);
    drawLine(100, 10, 70, 10);
   
    drawLine(70, 10, 70, 20);
  };
  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
};
//Draw in canvas
const drawMan = (count) => {
  let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
  switch (count) {
    case 1:
      head();
      break;
    case 2:
      body();
      break;
    case 3:
      leftArm();
      break;
    case 4:
      rightArm();
      break;
    case 5:
      leftLeg();
      break;
    case 6:
      rightLeg();
      break;
    default:
      break;
  }
};
//New Game
newGameButton.addEventListener("click", initializer);
window.onload = initializer;