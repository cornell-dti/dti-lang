# dti-lang

![CI Status](https://github.com/SamChou19815/dti-lang/workflows/CI/badge.svg)

A variant of lambda calculus, `dti-lang` is a programming language that is composed of
[Cornell DTI](https://cornelldti.org)'s slack workspace emojis.

## Getting Started

```bash
yarn # Install and compile everything.
yarn start examples/forty-two.dti # parse, type-check, and interpret this file
```

## Language Specification

The programming language has two possible categories of types: int type and function type.
The int type can be specified with syntax `:1e10:`.
The function type can be specified with syntax `argumentType :dti: returnType`.
Parentheses can be added to disambiguate.

The program **is** an expression. The language has five possible expressions:

- Identifier `:devsam::evan-ooos:`, `:megan-disapproves::three:`, etc
- Int Literal `:one::two:`, `:four::two:`, `:zero:`, etc
- Add Expression `e1 :portalparrot: e2`
- Lambda Expression `:octocat: (:devsam:: :1e10:):dti :one:`
- Function Application `lambda(argument)`

## Design Goals

- [x] Colorful
- [x] Fun
- [ ] ~~Readability~~

## Examples

- 42: `:four::two:` ![42](./images/42.png)
- identity function: `:octocat: (:devsam:: :1e10:) :dti: :devsam:`  ![id](./images/id.png)
- identity function applied to get 84:
  `(:octocat: (:devsam:: :1e10:) :dti: :devsam:) (:four::two: :portalparrot: :four::two:)`
  ![id-84](./images/id-84.png)

## Development

Run `yarn` to install all dependencies and compile the project.

If you also want to play with the VSCode extension, install `vsce` globally, run `yarn package`, and
use keyboard shortcut `F5` to launch extension in VSCode debugger.
