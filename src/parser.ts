import { ANTLRInputStream, CommonTokenStream, Token, ParserRuleContext } from 'antlr4ts';
import { PLLexer } from './generated/PLLexer';
import {
  PLParser,
  NestedTypeContext,
  FunctionTypeContext,
  NestedExpressionContext,
  IdentifierExpressionContext,
  NumberLiteralExpressionContext,
  PlusExpressionContext,
  LambdaExpressionContext,
  FunctionApplicationExpressionContext,
} from './generated/PLParser';
import { PLVisitor } from './generated/PLVisitor';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import { Position, Range, ExpressionType, DTILangNode } from './ast';

const numberMapper: { readonly [k: string]: string } = {
  ':zero:': '0',
  ':one:': '1',
  ':two:': '2',
  ':three:': '3',
  ':four:': '4',
  ':five:': '5',
  ':six:': '6',
  ':seven:': '7',
  ':eight:': '8',
  ':nine:': '9',
};

// Visible for testing.
export const parseDTILangNumber = (text: string): number => {
  const parts = text.split('::');
  if (parts.length === 0) {
    throw new Error('Number literal should not be empty!');
  }
  if (parts.length === 1) {
    return parseInt(numberMapper[parts[0]], 10);
  }
  const first = numberMapper[parts[0] + ':'];
  const last = numberMapper[':' + parts[parts.length - 1]];
  const middleParts = parts.slice(1, parts.length - 1).map((part) => numberMapper[`:${part}:`]);
  const all = [first, ...middleParts, last].join('');
  return parseInt(all, 10);
};

const getStartPosition = (token: Token): Position => ({
  line: token.line - 1,
  column: token.charPositionInLine,
});

const getEndPosition = (token: Token): Position => ({
  line: token.line - 1,
  column: token.charPositionInLine + (token.text?.length ?? 0),
});

const getRangeOfToken = (token: Token): Range => ({
  start: getStartPosition(token),
  end: getEndPosition(token),
});

const getRangeOfContext = (context: ParserRuleContext): Range => ({
  start: getStartPosition(context.start),
  end: getEndPosition(context.stop ?? context.start),
});

const throwParserError = (): never => {
  throw new Error('ParserError: The program has syntax errors.');
};

class TypeVisitor extends AbstractParseTreeVisitor<ExpressionType>
  implements PLVisitor<ExpressionType> {
  defaultResult = (): ExpressionType => throwParserError();

  visitNestedType = (ctx: NestedTypeContext): ExpressionType => ctx.type().accept(this);

  visitIntType = (): ExpressionType => 'int';

  visitFunctionType = (ctx: FunctionTypeContext): ExpressionType => {
    const children = ctx.type();
    return { argumentType: children[0].accept(this), returnType: children[1].accept(this) };
  };
}

const typeVisitor = new TypeVisitor();

class ExpressionVisitor extends AbstractParseTreeVisitor<DTILangNode>
  implements PLVisitor<DTILangNode> {
  defaultResult = (): DTILangNode => throwParserError();

  visitNestedExpression = (ctx: NestedExpressionContext): DTILangNode =>
    ctx.expression().accept(this);

  visitIdentifierExpression = (ctx: IdentifierExpressionContext): DTILangNode => ({
    type: 'id',
    range: getRangeOfToken(ctx.Identifier().symbol),
    expressionType: 'unknown',
    name: ctx.Identifier().text,
  });

  visitNumberLiteralExpression = (ctx: NumberLiteralExpressionContext): DTILangNode => ({
    type: 'int',
    range: getRangeOfToken(ctx.DecimalLiteral().symbol),
    expressionType: 'int',
    value: parseDTILangNumber(ctx.DecimalLiteral().text),
  });

  visitPlusExpression = (ctx: PlusExpressionContext): DTILangNode => {
    const children = ctx.expression();
    return {
      type: 'add',
      range: getRangeOfContext(ctx),
      expressionType: 'int',
      e1: children[0].accept(this),
      e2: children[1].accept(this),
    };
  };

  visitLambdaExpression = (ctx: LambdaExpressionContext): DTILangNode => ({
    type: 'lambda',
    range: getRangeOfContext(ctx),
    expressionType: 'unknown',
    parameter: ctx.Identifier().text,
    parameterType: ctx.type().accept(typeVisitor),
    body: ctx.expression().accept(this),
  });

  visitFunctionApplicationExpression = (ctx: FunctionApplicationExpressionContext): DTILangNode => {
    const children = ctx.expression();
    return {
      type: 'app',
      range: getRangeOfContext(ctx),
      expressionType: 'unknown',
      lambda: children[0].accept(this),
      argument: children[1].accept(this),
    };
  };
}

const expressionVisitor = new ExpressionVisitor();

const parse = (programString: string): DTILangNode => {
  const lexer = new PLLexer(new ANTLRInputStream(programString));
  const parser = new PLParser(new CommonTokenStream(lexer));
  return parser.topLevel().expression().accept(expressionVisitor);
};

export default parse;
