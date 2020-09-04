/**
 * {@code PLLexer} is the lexer of the PL.
 * No parser rules should ever appear in this file.
 */
lexer grammar PLLexerPart;

FUN : ':octocat:';
INT: ':1e10:';
COMMA : ',';
LPAREN : '(';
RPAREN : ')';
COLON : ':';
PLUS : ':portalparrot:';
MUL : ':devmegan:';
ARROW : ':dti:';

Identifier : Letter (Letter | Digit)*;
fragment Letter
  : ':evan-ooos:'
  | ':neha-dies-inside:'
  | ':devsam:'
  | ':pikachu-laura:'
  | ':emily-bakes:'
  | ':megan-disapproves:'
  | ':jagger-thinking:'
  | ':cedric-thinking:'
  ;
DecimalLiteral : ZeroDigit | NonZeroDigit (Digit)*;
fragment Digit : NonZeroDigit | ZeroDigit;
fragment NonZeroDigit : ':one:' | ':two:' | ':three:' | ':four:' | ':five:' | ':six:' | ':seven:' | ':eight:' | ':nine:';
fragment ZeroDigit : ':zero:';

COMMENT : '/*' .*? '*/' -> channel(HIDDEN); // match anything between /* and */
WS : [ \r\t\u000C\n]+ -> channel(HIDDEN); // white space
LINE_COMMENT : '//' ~[\r\n]* '\r'? '\n' -> channel(HIDDEN);
