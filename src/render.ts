import { gameData, deleteGame, editGame } from "./main";

// RENDER GAME
// defining type <HTMLDivElement> for the div element with the id "card"
const cardBody = (<HTMLDivElement>document.getElementById("card"));
export async function renderGame() {
  // place game data into card
  console.log(gameData);
  cardBody.innerHTML = gameData
    .map(
      (game) => `
      <div class="d-flex justify-content-center">
        <div class="card mb-3 bg-light w-100 text-center">
            <h3 class="card-title fw-bold m-3">${game.name}</h3>
            <h4 class="m-3">Release Year: ${game.year}</h4>
                <div class="card-body">
                    <p class="fs-4">Review: ${game.review}</p>
                <div>
                    <button class="btn btn-info edit-game-btn" data-id="${game.id}">Edit</button>
                    <button class ="btn btn-danger del-game-btn" data-id="${game.id}">Delete</button>
                </div>
            </div>
        </div>
      </div>
    `
    )
    .join("");

  // find delete buttons, when clicked they call deleteGame
  // using NodeListOf to represent a collection of del-game-btn nodes
  (
    cardBody.querySelectorAll(".del-game-btn") as NodeListOf<HTMLButtonElement>
  ).forEach((button) =>
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      if (id) {
        deleteGame(parseInt(id));
      } else {
        console.error("ID Not found");
      }
    })
  );

  // find edit buttons, when clicked call editGame
  // using NodeListOf to represent a collection of edit-game-btn nodes
  (
    cardBody.querySelectorAll(".edit-game-btn") as NodeListOf<HTMLButtonElement>
  ).forEach((button) =>
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      if (id) {
        editGame(parseInt(id));
      } else {
        console.error("ID Not found");
      }
    })
  );
}
