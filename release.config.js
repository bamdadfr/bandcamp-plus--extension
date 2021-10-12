/* eslint-disable no-template-curly-in-string */
module.exports = {
    'plugins': [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        ['@semantic-release/changelog', {
            'changelogFile': 'CHANGELOG.md',
        }],
        ['@semantic-release/exec', {
            'prepareCmd': 'yarn build:prepare ${nextRelease.version} && yarn build',
        }],
        // ['semantic-release-firefox-add-on', {
        //     'extensionId': '{efb65d38-d0a9-42ff-9025-2d26ee8c753f}',
        //     'targetXpi': 'bandcamp-plus--extension-${nextRelease.version}.xpi',
        //     'artifactsDir': 'packages',
        //     'channel': 'listed',
        // }],
        // ['semantic-release-chrome', {
        //     'extensionId': 'ibihnhlidngpabcbomjepjnkhindhlkn',
        //     'asset': 'bandcamp-plus--extension-${nextRelease.version}.zip',
        // }],
        ['@semantic-release/github', {
            'assets': [
                'packages/bandcamp-plus--extension-${nextRelease.version}.xpi',
                'bandcamp-plus--extension-${nextRelease.version}.zip',
            ],
        }],
        ['@semantic-release/git', {
            'assets': [
                'CHANGELOG.md',
                'package.json',
                'src/manifest.json',
            ],
            'message': 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
        }],
    ],
}