import { readFile } from 'fs';
import interpret from './full-interpreter';

const interpretFile = (file: string): void => {
  readFile(file, {}, (error, data) => {
    if (error != null) {
      console.error(`Unable to read ${file}. Reason:`);
      console.error('  ' + error.message);
      process.exit(2);
    }
    try {
      console.log(interpret(data.toString()));
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  });
};

const main = (): void => {
  const file = process.argv[2];
  if (file != null) {
    interpretFile(file);
  } else {
    console.error('Missing position argument `file`');
    process.exit(2);
  }
};

main();
