// import bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
// import getReviews, postReviews, putReviews, deleteReview from "./api.ts"
import { getReviews, postReviews, putReviews, deleteReview } from "./api.ts"
// import renderGame from "./render.ts"
import { renderGame } from "./render.ts";
// specify type for game objects
type game = {
  id: number
  name: string
  year: string
  review: string
}

// save game data in array 
export let gameData: game[] = []; // link game object to type

// fetch data from gr.json
async function getData() {
  // get data using getReviews from api.ts
  gameData = await getReviews();
  // render game data
  renderGame();
}
// call function to grab data on load
getData();

// get button by id
const addBtn = document.getElementById("add-game-btn");

// add event listener for add-game-btn
if (addBtn) {
  addBtn.addEventListener("click", () => {
    addGame();
  })
}
// add game
async function addGame() {
  
  // update frontend push postReviews to gameData array
  gameData.push(await postReviews());
  // clear text boxes
  (<HTMLInputElement>document.getElementById("game-title")).value = "";
  (<HTMLInputElement>document.getElementById("game-year")).value = "";
  (<HTMLTextAreaElement>document.getElementById("review")).value = "";
  // update ui
  renderGame();
}
// delete game
export async function deleteGame(gameId: number) {
  console.log(`Delete this game ${gameId}`);
  // update backend using deleteReview
  await deleteReview(gameId);
  // update frontend
  gameData = gameData.filter((game) => game.id !== gameId);
  // re-render
  renderGame();
};

export async function editGame(gameId: number) {
  console.log(`Please for all that is holy edit this game ${gameId}`)
  gameData.find((game) => game.id === gameId);
    document.getElementById("edit-card")!.classList.remove('invisible');

    // Handle save button click 
    // using (<HTMLButtonElment>) to give typescript element type
    (<HTMLButtonElement>document
      .getElementById("save-edit-btn"))
      .addEventListener("click", async () => {
        const updatedGame = await putReviews(gameId);

        // Update frontend game data 
        // for every game in gameData 
        // if game.id === gameId update the gameData with updated data
        gameData = gameData.map((game) =>
          game.id === gameId ? { ...game, ...updatedGame } : game
        );

        // Re-render games after update
        renderGame();
        // hide edit-game card 
        // use ! to make typescript ignore the element could be null 
        // because the element is coded into the html
        document.getElementById("edit-card")!.classList.add('invisible')
      });
      // cancel button 
      // using (<HTMLButtonElement>) to let typescript know the element type
      (<HTMLButtonElement>document
      .getElementById("cancel-edit-btn"))
      .addEventListener("click", () => {
        renderGame(); // Re-render the game list
      });
}
