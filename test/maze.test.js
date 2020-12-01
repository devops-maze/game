import Node, { nodeToPosObj, removeEdgeMoves, createBlankMaze } from "../public/js/maze";

test("should create position numbers", () => {
  expect(nodeToPosObj("cell_5_8", "y")).toBe(5);
  expect(nodeToPosObj("cell_10_3", "x")).toBe(3);
  expect(nodeToPosObj("cell_40_82", "x")).toBe(82);
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
  expect(nodeToPosObj(node.id, "y")).toBe(2);
  expect(nodeToPosObj(node.id, "x")).toBe(5);
});

// test("should remove edge moves from node", () => {
//   const edgeNode = new Node(1, 10);
//   removeEdgeMoves(10);
// });
