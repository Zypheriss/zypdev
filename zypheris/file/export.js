'use strict';

const { version } = require('../package.json');
const { __exportStar } = require('tslib');
const axios = require('axios');

versionCheck(version);

__exportStar(require('./core/index'), exports);
__exportStar(require('./core/AntiCrash'), exports);
__exportStar(require('./core/analyzeModuleUsage'), exports);
__exportStar(require('./core/consoleTools'), exports);

__exportStar(require('./discord/handlers'), exports);
__exportStar(require('./discord/embedBuilder'), exports);
__exportStar(require('./discord/buttonBuilder'), exports);
__exportStar(require('./discord/permissionChecker'), exports);
__exportStar(require('./discord/pagination'), exports);

__exportStar(require('./utils/stringUtils'), exports);
__exportStar(require('./utils/arrayUtils'), exports);
__exportStar(require('./utils/objectUtils'), exports);
__exportStar(require('./utils/colorUtils'), exports);
__exportStar(require('./utils/dataValidator'), exports);

__exportStar(require('./managers/cooldownManager'), exports);
__exportStar(require('./managers/configManager'), exports);
__exportStar(require('./managers/backupSystem'), exports);

__exportStar(require('./logger/webhookLogger'), exports);
__exportStar(require('./logger/advancedLogger'), exports);

exports.version = version;

function versionCheck(version) {
    try {
        axios.get('https://registry.npmjs.org/zypdev/latest').then((response) => {
            const data = response.data;

            if (version !== data.version) console.warn(`[ZYPDEV] It seems like you are using an outdated version of zypdev. Run 'npm install zypdev@latest' to update the module. Need help? Visit: https://discord.gg/PEsxpFfkZu`);
        }).catch(() => {});
    } catch (err) { }
}
