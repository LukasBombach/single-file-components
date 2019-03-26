import compiler from "./compiler";

test("Does not do much", async () => {
  const output = await compiler("./dummy.vue");
  expect(output).toBe("-");
});
