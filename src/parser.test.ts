import parse, { parseDTILangNumber } from './parser';

it('can parse single-emoji numbers.', () => {
  expect(parseDTILangNumber(':zero:')).toBe(0);
  expect(parseDTILangNumber(':one:')).toBe(1);
  expect(parseDTILangNumber(':two:')).toBe(2);
  expect(parseDTILangNumber(':three:')).toBe(3);
  expect(parseDTILangNumber(':four:')).toBe(4);
  expect(parseDTILangNumber(':five:')).toBe(5);
  expect(parseDTILangNumber(':six:')).toBe(6);
  expect(parseDTILangNumber(':seven:')).toBe(7);
  expect(parseDTILangNumber(':eight:')).toBe(8);
  expect(parseDTILangNumber(':nine:')).toBe(9);
});

it('can parse three-emoji-numbers', () => {
  expect(parseDTILangNumber(':four::two:')).toBe(42);
});

it('can parse two-emoji-numbers', () => {
  expect(parseDTILangNumber(':four::two::four:')).toBe(424);
});

it('can parse simple programs', () => {
  expect(parse(':four::two:')).toEqual({
    type: 'int',
    range: { start: { line: 0, column: 0 }, end: { line: 0, column: 11 } },
    expressionType: 'int',
    value: 42
  });
});
