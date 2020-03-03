import { DTILangNode } from './ast';

export type Value =
  | { readonly type: 'int'; readonly value: number }
  | {
      readonly type: 'closure';
      readonly context: Context;
      readonly parameter: string;
      readonly body: DTILangNode;
    };

export type Context = { readonly [name: string]: Value };

const interpret = (node: DTILangNode, context: Context = {}): Value => {
  switch (node.type) {
    case 'int':
      return { type: 'int', value: node.value };
    case 'id': {
      const value = context[node.name];
      if (value == null) {
        throw new Error(`\`${node.name}\ is not found in the context.`);
      }
      return value;
    }
    case 'add': {
      const v1 = interpret(node.e1, context);
      if (v1.type !== 'int') {
        throw new Error('Expect v1 to be int, got lambda.');
      }
      const v2 = interpret(node.e2, context);
      if (v2.type !== 'int') {
        throw new Error('Expect v2 to be int, got lambda.');
      }
      const value = v1.value + v2.value;
      return { type: 'int', value };
    }
    case 'lambda':
      return { type: 'closure', context, parameter: node.parameter, body: node.body };
    case 'app': {
      const lambda = interpret(node.lambda, context);
      if (lambda.type !== 'closure') {
        throw new Error('Cannot apply a number!');
      }
      const newContext = {
        ...context,
        [lambda.parameter]: interpret(node.argument, context)
      };
      return interpret(lambda.body, newContext);
    }
    default:
      throw new Error('We should never get here!');
  }
};

export default interpret;
