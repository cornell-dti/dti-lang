export type Position = { readonly line: number; readonly column: number };
export type Range = { readonly start: Position; readonly end: Position };

export type ExpressionType =
  | 'unknown' // dummy placeholder type for parser
  | 'int'
  | { readonly argumentType: ExpressionType; readonly returnType: ExpressionType };

interface BaseNode {
  readonly type: string;
  readonly range: Range;
  readonly expressionType: ExpressionType;
}

interface IdentifierNode extends BaseNode {
  readonly type: 'id';
  readonly name: string;
}

interface IntLiteralNode extends BaseNode {
  readonly type: 'int';
  readonly value: number;
}

interface AddNode extends BaseNode {
  readonly type: 'add';
  readonly e1: DTILangNode;
  readonly e2: DTILangNode;
}

interface MultiplyNode extends BaseNode {
  readonly type: 'multiply';
  readonly e1: DTILangNode;
  readonly e2: DTILangNode;
}

interface LambdaNode extends BaseNode {
  readonly type: 'lambda';
  readonly parameter: string;
  readonly parameterType: ExpressionType;
  readonly body: DTILangNode;
}

interface FunctionApplicationNode extends BaseNode {
  readonly type: 'app';
  readonly lambda: DTILangNode;
  readonly argument: DTILangNode;
}

export type DTILangNode =
  | IdentifierNode
  | IntLiteralNode
  | AddNode
  | MultiplyNode
  | LambdaNode
  | FunctionApplicationNode;
