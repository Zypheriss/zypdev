const zyp = require('../file/export');

console.log('\n╔═══════════════════════════════════════════════════════════╗');
console.log('║           ZYPDEV - Complete Feature Showcase             ║');
console.log('╚═══════════════════════════════════════════════════════════╝\n');

console.log('📦 Version:', zyp.version);
console.log('👤 Author: zypheriss');
console.log('🔗 GitHub: https://github.com/zypheriss/zypdev\n');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('1️⃣  CORE UTILITIES');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('Calculate 25% of 200:', zyp.calculate(25, 200));
console.log('Random number (1-100):', zyp.random(1, 100));
console.log('Short number (2,500,000):', zyp.shortNumber(2500000));
console.log('Format number (12,345,678):', zyp.formatNumber(12345678));
console.log('Timestamp (now):', zyp.timestamp(Date.now()));
console.log('MS conversion (1.5h):', zyp.ms('1.5h'), 'ms');
console.log('MS format (90000):', zyp.ms(90000, { short: true }));
console.log('Generate Password:', zyp.generatePassword({ length: 16, numbers: true }));
console.log('Generate Code:', zyp.generateCode({ length: 16, range: 4 }));

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('2️⃣  STRING UTILITIES');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
const { StringUtils } = zyp;
console.log('Capitalize:', StringUtils.capitalize('hello world'));
console.log('Slugify:', StringUtils.slugify('Hello World! Amazing Module'));
console.log('Camel Case:', StringUtils.camelCase('hello world example'));
console.log('Is Email:', StringUtils.isValidEmail('test@example.com'));
console.log('Is Palindrome:', StringUtils.isPalindrome('racecar'));

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('3️⃣  ARRAY UTILITIES');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
const { ArrayUtils } = zyp;
console.log('Unique:', ArrayUtils.unique([1, 2, 2, 3, 3, 4]));
console.log('Chunk:', ArrayUtils.chunk([1, 2, 3, 4, 5, 6], 2));
console.log('Difference:', ArrayUtils.difference([1, 2, 3, 4], [3, 4, 5, 6]));
console.log('Sum [1,2,3,4,5]:', ArrayUtils.sum([1, 2, 3, 4, 5]));
console.log('Average [1,2,3,4,5]:', ArrayUtils.average([1, 2, 3, 4, 5]));

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('4️⃣  OBJECT UTILITIES');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
const { ObjectUtils } = zyp;
const obj = { a: 1, b: { c: 2, d: 3 } };
console.log('Original:', obj);
console.log('Deep Clone:', ObjectUtils.deepClone(obj));
console.log('Flatten:', ObjectUtils.flatten(obj));
console.log('Is Empty {}:', ObjectUtils.isEmpty({}));

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('5️⃣  COLOR UTILITIES');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
const { ColorUtils } = zyp;
console.log('Hex to RGB (#3498db):', ColorUtils.hexToRgb('#3498db'));
console.log('Hex to Int (#3498db):', ColorUtils.hexToInt('#3498db'));
console.log('Lighten 20%:', ColorUtils.lighten('#3498db', 20));
console.log('Random Hex:', ColorUtils.randomHex());

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('6️⃣  DATA VALIDATOR');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
const { DataValidator } = zyp;
console.log('Is Email:', DataValidator.isEmail('zypheris@example.com'));
console.log('Is URL:', DataValidator.isUrl('https://zypheris-example.com'));
console.log('Is UUID:', DataValidator.isUuid('550e8400-e29b-41d4-a716-446655440000'));
console.log('Is Hex Color:', DataValidator.isHexColor('#3498db'));

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('7️⃣  LOGGER SYSTEM');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
const { Logger } = zyp;
const logger = new Logger({ prefix: 'DEMO' });
logger.success('Module loaded successfully!');
logger.info('All features are working!');
logger.warn('This is a warning message');

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('8️⃣  DISCORD.JS BUILDERS');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
const { EmbedBuilder, ButtonBuilder } = zyp;
const embed = new EmbedBuilder()
  .setTitle('Test Embed')
  .setDescription('This is a test')
  .setColor('#3498db');
console.log('Embed created:', embed.toJSON().title);

const button = new ButtonBuilder()
  .setCustomId('test-button')
  .setLabel('Click Me!')
  .setStyle('PRIMARY');
console.log('Button created:', button.toJSON().label);

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('9️⃣  COOLDOWN MANAGER');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
const { CooldownManager } = zyp;
const cooldowns = new CooldownManager();
cooldowns.setCooldown('user123', 'test', 5000);
console.log('Cooldown set for user123');
console.log('Has cooldown:', cooldowns.hasCooldown('user123', 'test'));
console.log('Remaining time:', cooldowns.getRemainingTime('user123', 'test'), 'seconds');

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🔟  ANALYZE MODULE USAGE');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
try {
  const usage = zyp.analyzeModuleUsage();
  console.log('Used modules:', usage.usedModules.length);
  console.log('Unused modules:', usage.unusedModules.length);
} catch (error) {
  console.log('Module analysis:', error.message);
}

console.log('\n╔═══════════════════════════════════════════════════════════╗');
console.log('║              ✅ All Features Working Perfectly!           ║');
console.log('╚═══════════════════════════════════════════════════════════╝\n');

console.log('📚 For more examples, check: /examples directory');
console.log('📖 Documentation: https://github.com/zypheriss/zypdev');
console.log('💬 Issues: https://github.com/zypheriss/zypdev/issues\n');
