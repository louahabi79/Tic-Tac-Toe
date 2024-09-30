function openPlayerConfig(event) {
  editedPlayer = +event.target.dataset.playerid;
  playerConfigOverlayElement.style.display = "block";
  backdropElement.style.display = "block";
  PlayernameInputElement.focus();
}

function closePlayerConfig() {
  playerConfigOverlayElement.style.display = "none";
  backdropElement.style.display = "none";
  configErrorsElement.innerText = "";
  formElement.firstElementChild.classList.remove("config-error");
  PlayernameInputElement.value = "";
}

function savePlayerConfig(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const enteredPlayername = formData.get("playername").trim();
  if (!enteredPlayername) {
    configErrorsElement.innerText = "Please provide a valid name!";
    formElement.firstElementChild.classList.add("config-error");
    return;
  }
  const updatedPlayerDataElement = document.getElementById(
    "player-name-" + editedPlayer
  );
  updatedPlayerDataElement.innerText = enteredPlayername.toUpperCase();

  players[editedPlayer - 1].name = enteredPlayername;

  closePlayerConfig();
}

function clearError() {
  formElement.firstElementChild.classList.remove("config-error");
  configErrorsElement.innerText = "";
}
