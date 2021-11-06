/* eslint-disable no-template-curly-in-string, no-unused-vars */
// noinspection JSUnusedLocalSymbols

const name = 'bandcamp-plus--extension';
const firefoxId = '{891ed2be-6ca9-47d1-9466-1595afa33b80}';
const chromeId = 'hggjmjobahhmbmnfndhdgidchhhhjkad';

module.exports = {
  'plugins': [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    ['@semantic-release/changelog', {
      changelogFile: 'CHANGELOG.md',
    }],
    ['@semantic-release/exec', {
      prepareCmd: 'yarn build:prepare ${nextRelease.version} && yarn build',
    }],
    ['semantic-release-firefox-add-on', {
      extensionId: firefoxId,
      targetXpi: '${name}-${nextRelease.version}.xpi',
      artifactsDir: 'packages',
      channel: 'listed',
    }],
    ['semantic-release-chrome', {
      extensionId: chromeId,
      asset: '${name}-${nextRelease.version}.zip',
    }],
    ['@semantic-release/github', {
      assets: [
        'packages/${name}-${nextRelease.version}.xpi',
        '${name}-${nextRelease.version}.zip',
      ],
    }],
    ['@semantic-release/git', {
      assets: [
        'CHANGELOG.md',
        'package.json',
        'src/manifest.json',
      ],
      message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
    }],
  ],
};
