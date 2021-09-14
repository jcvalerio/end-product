/* eslint-disable no-console */
const { resolve, relative } = require('path');
const { writeFileSync } = require('fs-extra');
const { exec } = require('child_process');

const libsName = [
  {
    name: 'auth',
    src: 'libs/auth/src',
    main: 'index',
  },
];

libsName.forEach(({ name, src, main }) => {
  exec(`npx nx build ${name}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }

    const fileContent = `{
  "name": "@kleeen/${name}",
  "version": "1.0.0",
  "description": "End Product Infusion app",
  "main": "main.js",
  "author": {
    "name": "Kleeen Software"
  },
  "files": [
    "*.js",
    "*.d.ts",
    "${main}.d.ts"
  ],
  "types":"${main}.d.ts"
}
`;

    const file = resolve(__dirname, '..', '..', 'dist', 'libs', name, 'package.json');
    writeFileSync(file, fileContent, { encoding: 'utf-8' });
    console.log(`Wrote package.json to ${relative(resolve(__dirname, '..'), file)}`);

    exec(
      `npx -p typescript tsc ${src}/${main}.ts --declaration --emitDeclarationOnly --outDir dist/libs/${name}`,
      (er, s, st) => {
        if (er) {
          return;
        }
        if (st) {
          return;
        }
      },
    );
  });
});
