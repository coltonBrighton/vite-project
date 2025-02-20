
// function to fetch reviews from json-server
export async function getReviews() {
  // grab game data
  const response = await fetch("http://localhost:3000/game");
  // parse to json
  return response.json()
}
// function to add review to gr.json
export async function postReviews() {
  const newGame = {
    name: (<HTMLInputElement>document.getElementById("game-title")).value ,
    year: (<HTMLInputElement>document.getElementById("game-year")).value,
    review: (<HTMLTextAreaElement>document.getElementById("review")).value
  };
  // update backend
  const response = await fetch("http://localhost:3000/game", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newGame),
  });
  const newGameAndId = await response.json();

  return newGameAndId
}
// function to edit data in gr.json
export async function putReviews(gameId: number) {
  const updatedGame = {
    name: (<HTMLInputElement>document.getElementById("edit-title")).value ,
    year: (<HTMLInputElement>document.getElementById("edit-year")).value,
    review: (<HTMLTextAreaElement>document.getElementById("edit-review")).value,
  };

  await fetch(`http://localhost:3000/game/${gameId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedGame),
  });
  return updatedGame;
}
// function to delete data from gr.json
export async function deleteReview(gameId: number) {
  await fetch(`http://localhost:3000/game/${gameId}`, {
    method: "DELETE",
  });
}
