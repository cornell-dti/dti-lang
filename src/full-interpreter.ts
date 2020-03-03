import parse from './parser';
import typeCheck from './checker';
import interpret from './interpreter';

export default (code: string): number | string => {
  const rawExpression = parse(code.toString());
  const checkedExpression = typeCheck(rawExpression);
  const value = interpret(checkedExpression);
  switch (value.type) {
    case 'int':
      return value.value;
    case 'closure':
      return 'Function (...) -> ...';
    default:
      throw new Error();
  }
};
