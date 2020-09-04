import { ExpressionType, DTILangNode } from './ast';

export type Context = { readonly [name: string]: ExpressionType };

const typeEquals = (t1: ExpressionType, t2: ExpressionType): boolean => {
  if (t1 === 'unknown' || t1 === 'int') {
    return t1 === t2;
  }
  if (t2 === 'unknown' || t2 === 'int') {
    return false;
  }
  return typeEquals(t1.argumentType, t2.argumentType) && typeEquals(t1.returnType, t2.returnType);
};

const typeToString = (type: ExpressionType): string => {
  if (type === 'unknown' || type === 'int') {
    return type;
  }
  return `(${typeToString(type.argumentType)}) -> ${typeToString(type.returnType)}`;
};

const typeCheck = (node: DTILangNode, context: Context = {}): DTILangNode => {
  switch (node.type) {
    case 'int':
      return node;
    case 'id': {
      const expressionType = context[node.name];
      if (expressionType == null) {
        throw new Error(`\`${node.name}\ is not found in the context.`);
      }
      return { ...node, expressionType };
    }
    case 'add':
    case 'multiply': {
      const e1 = typeCheck(node.e1, context);
      if (e1.expressionType !== 'int') {
        throw new Error(`TypeError: Expect e1 to be int, got ${typeToString(e1.expressionType)}.`);
      }
      const e2 = typeCheck(node.e2, context);
      if (e2.expressionType !== 'int') {
        throw new Error(`TypeError: Expect e2 to be int, got ${typeToString(e2.expressionType)}.`);
      }
      return { ...node, e1, e2 };
    }
    case 'lambda': {
      const body = typeCheck(node.body, { ...context, [node.parameter]: node.parameterType });
      const expressionType = { argumentType: node.parameterType, returnType: body.expressionType };
      return { ...node, expressionType, body };
    }
    case 'app': {
      const argument = typeCheck(node.argument, context);
      const lambda = typeCheck(node.lambda, context);
      const lambdaType = lambda.expressionType;
      if (lambdaType === 'int' || lambdaType === 'unknown') {
        throw new Error(`TypeError: Expect a function type for function, got ${lambdaType}.`);
      }
      if (!typeEquals(lambdaType.argumentType, argument.expressionType)) {
        throw new Error(
          `TypeError: Expect argument to have type ${typeToString(
            lambdaType.argumentType
          )}, got ${typeToString(argument.expressionType)}.`
        );
      }
      return { ...node, lambda, argument, expressionType: lambdaType.returnType };
    }
    default:
      throw new Error('We should never get here!');
  }
};

export default typeCheck;
