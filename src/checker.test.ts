import parse from './parser';
import typeCheck from './checker';
import {
  fortyTwoProgram,
  applyIdentityFunctionProgram,
  identityLambdaWithFunctionTypeProgram,
  identityLambdaWithNestedFunctionTypeProgram
} from './parser.test';

it('good programs can type check.', () => {
  expect(typeCheck(fortyTwoProgram).expressionType).toEqual('int');
  expect(typeCheck(applyIdentityFunctionProgram).expressionType).toEqual('int');
  expect(typeCheck(identityLambdaWithFunctionTypeProgram).expressionType).toEqual({
    argumentType: { argumentType: 'int', returnType: 'int' },
    returnType: { argumentType: 'int', returnType: 'int' }
  });
  expect(typeCheck(identityLambdaWithNestedFunctionTypeProgram).expressionType).toEqual({
    argumentType: {
      argumentType: 'int',
      returnType: { argumentType: 'int', returnType: 'int' }
    },
    returnType: {
      argumentType: 'int',
      returnType: { argumentType: 'int', returnType: 'int' }
    }
  });
});

it('bad programs will not type check', () => {
  const badProgram = parse(
    '(:octocat: (:devsam:: :1e10::dti::1e10:) :dti: :devsam:) (:four::two:)'
  );
  expect(() => typeCheck(badProgram)).toThrow();
});
