import interpret from './interpreter';
import { fortyTwoProgram, applyIdentityFunctionProgram } from './parser.test';

it('interpreter produces good result', () => {
  expect(interpret(fortyTwoProgram)).toEqual({ type: 'int', value: 42 });
  expect(interpret(applyIdentityFunctionProgram)).toEqual({ type: 'int', value: 42 });
});
