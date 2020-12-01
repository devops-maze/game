const mazeFun = require("../public/js/maze");
const Node = require("../public/js/maze").Node;

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
