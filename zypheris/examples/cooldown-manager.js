const { CooldownManager } = require('../file/export');

const cooldowns = new CooldownManager();

console.log('=== Cooldown Manager Examples ===\n');

const userId = 'zypheris123';
const commandName = 'ping';

console.log('Setting cooldown (5 seconds)...');
cooldowns.setCooldown(userId, commandName, 5000);

console.log('Has cooldown?', cooldowns.hasCooldown(userId, commandName));
console.log('Remaining time:', cooldowns.getRemainingTime(userId, commandName), 'seconds');

setTimeout(() => {
  console.log('\nAfter 2 seconds:');
  console.log('Has cooldown?', cooldowns.hasCooldown(userId, commandName));
  console.log('Remaining time:', cooldowns.getRemainingTime(userId, commandName), 'seconds');
}, 2000);

setTimeout(() => {
  console.log('\nAfter 6 seconds:');
  console.log('Has cooldown?', cooldowns.hasCooldown(userId, commandName));
  console.log('Remaining time:', cooldowns.getRemainingTime(userId, commandName), 'seconds');
  console.log('\nAll user cooldowns:', cooldowns.getAllCooldowns(userId));
}, 6000);
