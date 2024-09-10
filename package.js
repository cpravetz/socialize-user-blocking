/* global Package*/
Package.describe({
    name: 'socialize:user-blocking',
    version: '1.0.7',
    summary: 'Allow users to block each other',
    git: 'https://github.com/copleykj/socialize-user-blocking.git',
});

Package.onUse(function _(api) {
    api.versionsFrom(['1.10.2', '2.3','3.0']);
    api.use([
        'check',
        'reywood:publish-composite',
        'socialize:user-model',
    ]);
    api.imply('socialize:user-model');
    api.mainModule('server/server.js', 'server');
    api.mainModule('common/common.js', 'client');
});
