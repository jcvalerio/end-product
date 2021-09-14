/* eslint-disable no-console */
const { resolve, relative } = require('path');
const { writeFileSync, readFileSync, existsSync } = require('fs-extra');
const { html2json } = require('html2json');
const { companyName, productName } = require('../../apps/cloud/src/app/settings/app.json');
const kebabCase = require('lodash.kebabcase');

const file = resolve(__dirname, '..', '..', 'dist', 'apps', 'cloud', 'package.json');

const companyNamekebabCase = kebabCase(companyName);
const productNameKebabCase = kebabCase(productName);

const fileContent = `{
  "name": "@${companyNamekebabCase}/${productNameKebabCase}",
  "version": "1.0.0",
  "description": "End Product Infusion app",
  "main": "index.js",
  "files": [
    "sw.js",
    "main.*.esm.js",
    "polyfills.*.esm.js",
    "vendor.*.esm.js",
    "runtime.*.js",
    "*.ico",
    "*.css",
    "*esm.js.LICENSE.txt",
    "assets"
  ]
}

`;
writeFileSync(file, fileContent, { encoding: 'utf-8' });

console.log(`Wrote package.json to ${relative(resolve(__dirname, '..'), file)}`);
console.log(fileContent);

const indexHtmlFile = resolve(__dirname, '..', '..', 'dist', 'apps', 'cloud', 'index.html');

if (!existsSync(indexHtmlFile)) throw new Error(`Cannot find ${file}`);

const indexHtmlFileContent = readFileSync(indexHtmlFile, 'utf8');

const fileJson = html2json(indexHtmlFileContent);

const html = fileJson.child.find((obj) => obj.tag === 'html');
const body = html.child.find((obj) => obj.tag === 'body');
const scripts = body.child.filter((obj) => obj.tag === 'script' && obj.attr.type === 'module');

const indexFile = resolve(__dirname, '..', '..', 'dist', 'apps', 'cloud', 'index.js');
const indexFileContent = `${scripts.map((script) => `import "./${script.attr.src}";\n`).join('')}`;
writeFileSync(indexFile, indexFileContent, { encoding: 'utf-8' });

console.log(`Wrote index.js to ${relative(resolve(__dirname, '..'), indexFile)}`);
console.log(indexFileContent);

require('./infusion-libs-package');
