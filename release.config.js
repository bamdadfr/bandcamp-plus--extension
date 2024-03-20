/* eslint-disable no-template-curly-in-string */

module.exports = {
  plugins: [
    ['@semantic-release/commit-analyzer'],
    ['@semantic-release/release-notes-generator'],
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
      },
    ],
    [
      '@semantic-release/exec',
      {
        prepareCmd: 'pnpm build:increment ${nextRelease.version} && pnpm build',
      },
    ],
    [
      'semantic-release-firefox-add-on',
      {
        extensionId: '{891ed2be-6ca9-47d1-9466-1595afa33b80}',
        targetXpi: 'bandcamp-plus--extension-${nextRelease.version}.xpi',
        sourceDir: 'dist/firefox',
        artifactsDir: 'packages',
        channel: 'listed',
      },
    ],
    [
      'semantic-release-chrome',
      {
        extensionId: 'hggjmjobahhmbmnfndhdgidchhhhjkad',
        asset: 'bandcamp-plus--extension-${nextRelease.version}.zip',
        distFolder: 'dist/chrome',
      },
    ],
    [
      '@semantic-release/github',
      {
        assets: [
          'packages/bandcamp-plus--extension-${nextRelease.version}.xpi',
          'bandcamp-plus--extension-${nextRelease.version}.zip',
        ],
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json', 'src/manifest-*.json'],
        message:
          'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
};
