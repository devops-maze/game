window.addEventListener("DOMContentLoaded", () => {
  initMaze(mazeDimensions.value);
});

let mazeDimensions = {
  value: 10,
  setValue(value) {
    this.value = value;
  },
};

function initMaze(dimensions) {
  removeMaze();
  createNewMaze(dimensions);
  createGaps(dimensions);
  placeCharacter();
  placeTarget();
  document.onkeydown = moveCharacter;
}
