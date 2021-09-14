const envCi = require('env-ci');

const {
  name,
  service,
  isCi,
  branch,
  commit,
  tag,
  build,
  buildUrl,
  job,
  jobUrl,
  isPr,
  pr,
  prBranch,
  slug,
  root,
} = envCi();

if (isCi) {
  console.log(`Building repo ${slug} on ${name} service`);
  if (isPr) {
    console.log(
      `Building Pull Request #${pr} originating from branch ${prBranch} and targeting branch ${branch}`,
    );
  } else {
    console.log(`Building branch ${branch}`);
  }
}

const plugins = [
  '@semantic-release/commit-analyzer',
  '@semantic-release/release-notes-generator',
  [
    '@semantic-release/changelog',
    {
      changelogFile: 'CHANGELOG.md',
    },
  ],
  [
    '@semantic-release/npm',
    {
      npmPublish: false,
      tarballDir: 'dist',
    },
  ],
  [
    '@semantic-release/git',
    {
      assets: ['CHANGELOG.md', 'package.json', 'package-lock.json'],
      message: 'chore(release): ${nextRelease.version} [skip-cd]\n\n${nextRelease.notes}',
    },
  ],
];

module.exports = {
  branches: ['main', 'staging', 'develop'],
  tagFormat: '${version}',
  plugins,
};
