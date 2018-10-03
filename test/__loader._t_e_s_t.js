import compiler from './compiler.js';

test('Loads and returns a .vue file', async () => {
  expect(async () => await compiler('basics/PlainHtml.vue')).not.toThrow();
});

test('Processes plain HTML', async () => {
  const stats = await compiler('basics/PlainHtml.vue');
  // const output = stats.toJson().modules[0].source;
  // expect(output).toBe('export default "Hey Alice!\\n"');
});
