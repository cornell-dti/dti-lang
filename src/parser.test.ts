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

it('can parse a simple lambda application', () => {
  expect(parse('(:octocat: (:devsam:: :1e10:) :dti: :devsam:) (:four::two:)')).toEqual({
    type: 'app',
    range: {
      start: { line: 0, column: 0 },
      end: { line: 0, column: 59 }
    },
    expressionType: 'unknown',
    lambda: {
      type: 'lambda',
      range: {
        start: { line: 0, column: 1 },
        end: { line: 0, column: 44 }
      },
      expressionType: 'unknown',
      parameter: ':devsam:',
      parameterType: 'int',
      body: {
        type: 'id',
        range: {
          start: { line: 0, column: 36 },
          end: { line: 0, column: 44 }
        },
        expressionType: 'unknown',
        name: ':devsam:'
      }
    },
    argument: {
      type: 'int',
      range: {
        start: { line: 0, column: 47 },
        end: { line: 0, column: 58 }
      },
      expressionType: 'int',
      value: 42
    }
  });
});

it('Can parse function type', () => {
  expect(parse(':octocat: (:devsam:: :1e10::dti::1e10:) :dti: :devsam:')).toEqual({
    type: 'lambda',
    range: {
      start: { line: 0, column: 0 },
      end: { line: 0, column: 54 }
    },
    expressionType: 'unknown',
    parameter: ':devsam:',
    parameterType: { argumentType: 'int', returnType: 'int' },
    body: {
      type: 'id',
      range: {
        start: { line: 0, column: 46 },
        end: { line: 0, column: 54 }
      },
      expressionType: 'unknown',
      name: ':devsam:'
    }
  });
});

it('Can parse nested function type', () => {
  expect(parse(':octocat: (:devsam:: :1e10::dti::1e10::dti::1e10:) :dti: :devsam:')).toEqual({
    type: 'lambda',
    range: {
      start: { line: 0, column: 0 },
      end: { line: 0, column: 65 }
    },
    expressionType: 'unknown',
    parameter: ':devsam:',
    parameterType: { argumentType: 'int', returnType: { argumentType: 'int', returnType: 'int' } },
    body: {
      type: 'id',
      range: {
        start: { line: 0, column: 57 },
        end: { line: 0, column: 65 }
      },
      expressionType: 'unknown',
      name: ':devsam:'
    }
  });
});
