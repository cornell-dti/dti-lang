grammar PL;

import PLLexerPart;

topLevel : expression EOF;

expression
  : LPAREN expression RPAREN # NestedExpression
  | Identifier # IdentifierExpression
  | DecimalLiteral # NumberLiteralExpression
  | expression PLUS expression # PlusExpression
  | FUN LPAREN Identifier COLON type RPAREN ARROW expression # LambdaExpression
  | expression LPAREN expression RPAREN # FunctionApplicationExpression
  ;

type
  : LPAREN type RPAREN # NestedType
  | INT # IntType
  | type ARROW type # FunctionType
  ;
