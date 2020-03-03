import * as vscode from 'vscode';
import * as path from 'path';
import { LanguageClient, LanguageClientOptions, TransportKind } from 'vscode-languageclient';

export function activate(context: vscode.ExtensionContext) {
  const serverModule = context.asAbsolutePath(path.join('lib', 'lsp.js'));
  const serverOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: { execArgv: ['--nolazy', '--inspect=6009'] }
    }
  };
  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: 'file', language: 'dtilang' }]
  };

  const languageClient = new LanguageClient(
    'dtilang',
    'DTI Lang Language Client',
    serverOptions,
    clientOptions
  );

  languageClient.registerProposedFeatures();
  languageClient.start();
}
