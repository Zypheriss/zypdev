# ZYPDEV

<div align="center">
<p>
   <img src="https://img.shields.io/npm/v/zypdev?style=for-the-badge">
   <img src="https://img.shields.io/npm/l/zypdev?style=for-the-badge">
   <img src="https://img.shields.io/npm/dt/zypdev?style=for-the-badge">
</p>
</div>

## About

**Zypdev** is a comprehensive JavaScript utility module designed for Discord bots and general JavaScript applications. It provides a wide range of features including handlers, utilities, logging systems, managers, and much more - all in one package!

## Installation

```bash
npm install zypdev
```

## Features Overview

### 🎯 Core Utilities
- **calculate** - Calculate percentage between two numbers
- **random** - Generate random numbers within a range
- **shortNumber** - Format large numbers (e.g., 150000 -> 150K)
- **formatNumber** - Add separators to numbers for better readability
- **timestamp** - Convert milliseconds to seconds
- **ms** - Advanced time conversion utility with multiple formats
- **generatePassword** - Secure password generator with customization
- **generateCode** - License/activation code generator
- **AntiCrash** - Prevent your application from crashing
- **analyzeModuleUsage** - Analyze and find unused modules in your project

### 🤖 Discord.js Features
- **CommandHandler** - Automatic command loading and handling system
- **EventHandler** - Automatic event loading system
- **EmbedBuilder** - Easy and intuitive Discord embed creation
- **ButtonBuilder** - Create buttons and select menus
- **ActionRowBuilder** - Build action rows for components
- **PermissionChecker** - Check user and channel permissions
- **Pagination** - Create paginated embeds with navigation
- **CooldownManager** - Command cooldown system

### 🛠️ Utility Tools
- **StringUtils** - 15+ string manipulation functions
- **ArrayUtils** - 20+ array helper functions
- **ObjectUtils** - Deep clone, merge, flatten, and more
- **ColorUtils** - Color conversion (hex, rgb, hsl, int)
- **DataValidator** - Comprehensive input validation

### 📝 Logger & Debug
- **Logger** - Colorful console logging with timestamps
- **showBanner** - Display ASCII art banner
- **WebhookLogger** - Send logs to Discord webhooks
- **AdvancedLogger** - File-based logging with rotation

### 📦 Managers
- **ConfigManager** - JSON configuration file management
- **BackupSystem** - Automatic backup and restore system
- **CooldownManager** - User cooldown tracking

## Quick Examples

### Basic Utilities

```js
const zyp = require('zypdev');

zyp.calculate(25, 200);
zyp.random(1, 100);
zyp.shortNumber(2500000);
zyp.formatNumber(12345678);
zyp.timestamp(Date.now());

zyp.ms('1.5h');
zyp.ms(90000, { short: true });

zyp.generatePassword({ length: 16, numbers: true, symbols: true });
zyp.generateCode({ length: 16, range: 4, numbers: true });
```

### Console Logger & Banner

```js
const { Logger, showBanner } = require('zypdev');

showBanner('My Awesome Bot v1.0');

const logger = new Logger({ prefix: 'BOT' });
logger.success('Bot is online!');
logger.info('Loading commands...');
logger.warn('Rate limit approaching');
logger.error('Connection failed');
```

### Discord.js Command Handler

```js
const { Client } = require('discord.js');
const { CommandHandler, EventHandler } = require('zypdev');

const client = new Client({ intents: [...] });

const commandHandler = new CommandHandler(client, {
  commandsPath: './commands',
  prefix: '!'
});

const eventHandler = new EventHandler(client, {
  eventsPath: './events'
});

await commandHandler.loadCommands();
await eventHandler.loadEvents();

client.on('messageCreate', (message) => {
  commandHandler.handleMessage(message);
});
```

### Embed Builder

```js
const { EmbedBuilder } = require('zypdev');

const embed = new EmbedBuilder()
  .setTitle('Welcome!')
  .setDescription('Thanks for joining our server')
  .setColor('#3498db')
  .addField('Members', '1,234', true)
  .addField('Online', '567', true)
  .setThumbnail('https://example.com/logo.png')
  .setTimestamp()
  .setFooter('Server Bot', 'https://example.com/icon.png');

await message.channel.send({ embeds: [embed.toJSON()] });
```

### Cooldown Manager

```js
const { CooldownManager } = require('zypdev');

const cooldowns = new CooldownManager();

cooldowns.setCooldown(userId, 'ping', 5000);

if (cooldowns.hasCooldown(userId, 'ping')) {
  const remaining = cooldowns.getRemainingTime(userId, 'ping');
  return message.reply(`Please wait ${remaining} seconds`);
}
```

### String Utils

```js
const { StringUtils } = require('zypdev');

StringUtils.capitalize('hello world');
StringUtils.capitalizeWords('hello world');
StringUtils.slugify('Hello World! This is awesome');
StringUtils.camelCase('hello world example');
StringUtils.snakeCase('helloWorldExample');
StringUtils.truncate('Long text here', 10);
StringUtils.isPalindrome('racecar');
StringUtils.isValidEmail('test@example.com');
```

### Array Utils

```js
const { ArrayUtils } = require('zypdev');

ArrayUtils.shuffle([1, 2, 3, 4, 5]);
ArrayUtils.unique([1, 2, 2, 3, 3, 4]);
ArrayUtils.chunk([1, 2, 3, 4, 5, 6], 2);
ArrayUtils.difference([1, 2, 3], [2, 3, 4]);
ArrayUtils.intersection([1, 2, 3], [2, 3, 4]);
ArrayUtils.groupBy(users, 'age');
ArrayUtils.sortBy(users, 'name', 'asc');
```

### Config Manager

```js
const { ConfigManager } = require('zypdev');

const config = new ConfigManager('./config.json');
config.load();

config.set('bot.prefix', '!');
config.set('bot.color', '#3498db');

const prefix = config.get('bot.prefix', '!');
const color = config.get('bot.color');

config.save();
```

### Anti-Crash System

```js
const { AntiCrash } = require('zypdev');

new AntiCrash().start();

new AntiCrash({ url: 'DISCORD_WEBHOOK_URL' })
  .setShow('webhook')
  .setHide('console')
  .start();
```

### Backup System

```js
const { BackupSystem } = require('zypdev');

const backup = new BackupSystem({
  sourcePath: './data',
  backupPath: './backups',
  maxBackups: 10
});

const result = backup.createBackup();
console.log(result);

backup.startAutoBackup();

const backups = backup.listBackups();
backup.restoreBackup('backup_2025-01-01');
```

## Module Structure

```
zypdev/
├── Core Utilities (calculate, random, ms, generatePassword, etc.)
├── Discord Features (handlers, embed, buttons, pagination)
├── Utils (string, array, object, color, validator)
├── Managers (cooldown, config, backup)
└── Loggers (console, webhook, file-based)
```

## Documentation

For detailed documentation, examples, and API reference, visit:
- **GitHub**: [https://github.com/zypheriss/zypdev](https://github.com/zypheriss/zypdev)
- **Examples**: Check the `/examples` folder in the repository

## TypeScript Support

Zypdev includes full TypeScript definitions for all features!

```typescript
import { calculate, Logger, EmbedBuilder } from 'zypdev';

const result: number = calculate(25, 100);
const logger = new Logger({ prefix: 'APP' });
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

MIT License - Copyright (c) 2025 zypheriss

## Author

Created by **zypheriss**
- GitHub: [@zypheriss](https://github.com/zypheriss)
