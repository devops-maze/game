const mazeFun = require("../js/maze");
const Node = require("../js/maze").Node;
const Maze = require("../js/user").Maze;
const Traveller = require("../js/maze").Traveller;
const $ = require("jquery");

test("should create position numbers", () => {
  expect(mazeFun.nodeToPosObj("cell_5_8", "y")).toBe(5);
  expect(mazeFun.nodeToPosObj("cell_10_3", "x")).toBe(3);
  expect(mazeFun.nodeToPosObj("cell_40_82", "x")).toBe(82);
});

test("should initialize node", () => {
  const node = new Node(2, 5);
  expect(node.id).toMatch("cell_2_5");
  expect(node.posY).toBe(2);
  expect(node.posX).toBe(5);
  expect(node.visited).toBeFalsy();
  node.visit();
  expect(node.visited).toBeTruthy();
  expect(node.exits).toContain("up");
  expect(node.exits).toContain("down");
  expect(node.exits).toContain("left");
  expect(node.exits).toContain("right");
  expect(mazeFun.nodeToPosObj(node.id, "y")).toBe(2);
  expect(mazeFun.nodeToPosObj(node.id, "x")).toBe(5);
});

test("should initialize node 1", () => {
  const node = new Node(7, 11);
  expect(node.id).toMatch("cell_7_11");
  expect(node.posY).toBe(7);
  expect(node.posX).toBe(11);
  expect(node.visited).toBeFalsy();
  node.visit();
  expect(node.visited).toBeTruthy();
  expect(node.exits).toContain("up");
  expect(node.exits).toContain("down");
  expect(node.exits).toContain("left");
  expect(node.exits).toContain("right");
  expect(mazeFun.nodeToPosObj(node.id, "y")).not.toBe(2);
  expect(mazeFun.nodeToPosObj(node.id, "x")).not.toBe(5);
});

test("should initialize node 2", () => {
  const node = new Node(8, 70);
  expect(node.id).not.toMatch("cell_2_5");
  expect(node.posY).not.toBe(2);
  expect(node.posX).not.toBe(5);
  expect(node.visited).toBeFalsy();
  node.visit();
  expect(node.visited).toBeTruthy();
  expect(node.exits).toContain("up");
  expect(node.exits).toContain("down");
  expect(node.exits).toContain("left");
  expect(node.exits).toContain("right");
  expect(mazeFun.nodeToPosObj(node.id, "y")).not.toBe(2);
  expect(mazeFun.nodeToPosObj(node.id, "x")).not.toBe(5);
});

test("should initialize node 3", () => {
  const node = new Node(2, 24);
  expect(node.id).toMatch("cell_2_24");
  expect(node.posY).toBe(2);
  expect(node.posX).toBe(24);
  expect(node.visited).toBeFalsy();
  node.visit();
  expect(node.visited).toBeTruthy();
  expect(node.exits).toContain("up");
  expect(node.exits).toContain("down");
  expect(node.exits).toContain("left");
  expect(node.exits).toContain("right");
  expect(mazeFun.nodeToPosObj(node.id, "y")).toBe(2);
  expect(mazeFun.nodeToPosObj(node.id, "x")).toBe(24);
});

test("should initialize node 4", () => {
  const node = new Node(20, 12);
  expect(node.id).toMatch("cell_20_12");
  expect(node.posY).toBe(20);
  expect(node.posX).toBe(12);
  expect(node.visited).toBeFalsy();
  node.visit();
  expect(node.visited).toBeTruthy();
  expect(node.exits).toContain("up");
  expect(node.exits).toContain("down");
  expect(node.exits).toContain("left");
  expect(node.exits).toContain("right");
  expect(mazeFun.nodeToPosObj(node.id, "y")).toBe(20);
  expect(mazeFun.nodeToPosObj(node.id, "x")).toBe(12);
});

test("should initialize traveller object", () => {
  document.body.innerHTML = '<div id="canvas">' + "</div>";
  const traveller = new Traveller(mazeFun.createBlankMaze(10, "canvas"));
  expect(traveller.posY).toBe(1);
  expect(traveller.posX).toBe(1);
  expect(traveller.position).toMatch("cell_1_1");
  expect(traveller.nodeList).toHaveLength(100);
  expect(traveller.backtrack).toMatchObject([{ exits: ["down", "right"], id: "cell_1_1", posX: 1, posY: 1, visited: true }]);
  expect(traveller.path).toStrictEqual(["cell_1_1"]);
});

test("should not contain edge moves", () => {
  document.body.innerHTML = '<div id="canvas">' + "</div>";
  const traveller = new Traveller(mazeFun.createBlankMaze(10, "canvas"));
  const nodeList = traveller.nodeList;
  for (const elem in nodeList) {
    if (nodeList.hasOwnProperty(elem)) {
      const node = nodeList[elem];
      if (/cell_1_\d+$/.test(node.id)) {
        expect(node).not.toContain("up");
      }
      if (/cell_10_\d+$/.test(node.id)) {
        expect(node).not.toContain("down");
      }
      if (/cell_\d+_1$/.test(node.id)) {
        expect(node).not.toContain("left");
      }
      if (/cell_\d+_10$/.test(node.id)) {
        expect(node).not.toContain("right");
      }
    }
  }
});

test("should make path for character to move", () => {
  document.body.innerHTML = '<div id="canvas">' + "</div>";
  const traveller = new Traveller(mazeFun.createBlankMaze(10, "canvas"));
  for (let i = 0; i < traveller.path.length - 1; i++) {
    let step = traveller.path[i];
    let nextStep = traveller.path[i + 1];
    if (nextStep.slice(0, 10) === "backtrack_" || (nextStep.slice(0, 10) === "backtrack_" && step.slice(0, 10) === "backtrack_")) {
      continue;
    } else if (step.slice(0, 10) === "backtrack_") {
      step = step.slice(10);
    }
    if (mazeFun.nodeToPosObj(step, "y") > mazeFun.nodeToPosObj(nextStep, "y")) {
      // moving UP
      expect($(`${query}#${step}`).hasClass("no-top-border")).toBeTruthy();
      expect($(`${query}#${nextStep}`).hasClass("no-bottom-border")).toBeTruthy();
    } else if (mazeFun.nodeToPosObj(step, "y") < mazeFun.nodeToPosObj(nextStep, "y")) {
      // moving DOWN
      expect($(`${query}#${step}`).hasClass("no-bottom-border")).toBeTruthy();
      expect($(`${query}#${nextStep}`).hasClass("no-top-border")).toBeTruthy();
    } else if (mazeFun.nodeToPosObj(step, "x") > mazeFun.nodeToPosObj(nextStep, "x")) {
      // moving LEFT
      expect($(`${query}#${step}`).hasClass("no-left-border")).toBeTruthy();
      expect($(`${query}#${nextStep}`).hasClass("no-right-border")).toBeTruthy();
    } else if (mazeFun.nodeToPosObj(step, "x") < mazeFun.nodeToPosObj(nextStep, "x")) {
      // moving RIGHT
      expect($(`${query}#${step}`).hasClass("no-right-border")).toBeTruthy();
      expect($(`${query}#${nextStep}`).hasClass("no-left-border")).toBeTruthy();
    }
  }
});
