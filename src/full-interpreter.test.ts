import { readFileSync } from 'fs';
import { join } from 'path';
import run from './full-interpreter';

const expectedResults: { readonly [key: string]: number | string } = {
  add: 84,
  'forty-two': 42,
  'identity-function-applied-42': 42,
  'identity-function-applied-itself': 'Function (...) -> ...',
  'identity-function': 'Function (...) -> ...',
};

Object.keys(expectedResults).forEach((testName) => {
  it(`'${testName}' produces expected result`, () => {
    const content = readFileSync(join('examples', `${testName}.dti`)).toString();
    expect(run(content)).toBe(expectedResults[testName]);
  });
});
