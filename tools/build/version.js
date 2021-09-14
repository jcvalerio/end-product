/* eslint-disable no-console */
const { gitDescribeSync } = require('git-describe');
const { version: versionFromPackage } = require('../../package.json');
const { resolve, relative } = require('path');
const { writeFileSync } = require('fs-extra');

const gitInfo = gitDescribeSync({
  dirtyMark: false,
  dirtySemver: false,
});

const environmentFromCIEnv = process.env.USER_BRANCH || process.env.CODEBUILD_WEBHOOK_TRIGGER || 'local';

const buildNumberFromCIEnv =
  process.env.AWS_JOB_ID ||
  process.env.BUILD_NUM ||
  process.env.CODEBUILD_BUILD_NUMBER ||
  process.env.REACT_APP_BUILD_NUM;
const buildNumber = parseInt(buildNumberFromCIEnv || '0');

const gitCommitHash = gitInfo.hash || process.env.REACT_APP_COMMIT_HASH || '0';

const semanticVersion = versionFromPackage || '0.0.1';

gitInfo.version = `${semanticVersion}.${buildNumber}.${gitCommitHash}`;
gitInfo.stage = environmentFromCIEnv;

const deploymentInfo = JSON.stringify(gitInfo, null, 2);
const file = resolve(__dirname, '..', '..', 'libs', 'environment', 'src', 'deployment', 'version.ts');
const fileContent = `// IMPORTANT: THIS FILE IS AUTO GENERATED! DO NOT MANUALLY EDIT OR CHECKIN!
/* tslint:disable */
export const deploymentInfo = ${deploymentInfo};
/* tslint:enable */
`;
writeFileSync(file, fileContent, { encoding: 'utf-8' });

console.log(`Wrote version info ${gitInfo.version} to ${relative(resolve(__dirname, '..'), file)}`);
console.log(fileContent);
