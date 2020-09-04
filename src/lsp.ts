import {
  createConnection,
  ProposedFeatures,
  CompletionItem,
  CompletionItemKind,
  TextDocumentPositionParams,
  InitializeResult,
  TextDocumentSyncKind,
} from 'vscode-languageserver';

const start = (): void => {
  // Create a connection for the server. The connection uses Node's IPC as a transport.
  // Also include all preview / proposed LSP features.
  const connection = createConnection(ProposedFeatures.all);

  connection.onInitialize(
    (): InitializeResult => ({
      capabilities: {
        textDocumentSync: TextDocumentSyncKind.Full,
        completionProvider: {
          triggerCharacters: [':'],
          resolveProvider: false,
        },
      },
    })
  );

  const completionItems = [
    {
      insertText: 'octocat:',
      kind: CompletionItemKind.Keyword,
    },
    {
      insertText: 'dti:',
      kind: CompletionItemKind.Keyword,
    },
    {
      insertText: 'portalparrot:',
      kind: CompletionItemKind.Keyword,
    },
    {
      insertText: '1e10:',
      kind: CompletionItemKind.Class,
    },
    {
      insertText: 'evan-ooos:',
      kind: CompletionItemKind.Text,
    },
    {
      insertText: 'neha-dies-inside:',
      kind: CompletionItemKind.Text,
    },
    {
      insertText: 'devsam:',
      kind: CompletionItemKind.Text,
    },
    {
      insertText: 'devmegan:',
      kind: CompletionItemKind.Text,
    },
    {
      insertText: 'pikachu-laura:',
      kind: CompletionItemKind.Text,
    },
    {
      insertText: 'emily-bakes:',
      kind: CompletionItemKind.Text,
    },
    {
      insertText: 'megan-disapproves:',
      kind: CompletionItemKind.Text,
    },
    {
      insertText: 'jagger-thinking:',
      kind: CompletionItemKind.Text,
    },
    {
      insertText: 'cedric-thinking:',
      kind: CompletionItemKind.Text,
    },
    {
      insertText: 'zero:',
      kind: CompletionItemKind.Constant,
    },
    {
      insertText: 'one:',
      kind: CompletionItemKind.Constant,
    },
    {
      insertText: 'two:',
      kind: CompletionItemKind.Constant,
    },
    {
      insertText: 'three:',
      kind: CompletionItemKind.Constant,
    },
    {
      insertText: 'four:',
      kind: CompletionItemKind.Constant,
    },
    {
      insertText: 'five:',
      kind: CompletionItemKind.Constant,
    },
    {
      insertText: 'six:',
      kind: CompletionItemKind.Constant,
    },
    {
      insertText: 'seven:',
      kind: CompletionItemKind.Constant,
    },
    {
      insertText: 'eight:',
      kind: CompletionItemKind.Constant,
    },
    {
      insertText: 'nine:',
      kind: CompletionItemKind.Constant,
    },
  ].map((item) => ({ ...item, label: `:${item.insertText}` }));

  // This handler provides the initial list of the completion items.
  connection.onCompletion((): CompletionItem[] => completionItems);

  // Listen on the connection
  connection.listen();
};

start();
