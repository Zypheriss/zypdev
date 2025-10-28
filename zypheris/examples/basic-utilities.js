const zyp = require('../file/export');

console.log('=== Calculate Example ===');
console.log('25% of 200:', zyp.calculate(25, 200));
console.log('50% of 100:', zyp.calculate(50, 100));
console.log('');

console.log('=== Random Example ===');
console.log('Random between 1-100:', zyp.random(1, 100));
console.log('Random between 50-150:', zyp.random(50, 150));
console.log('');

console.log('=== Short Number Example ===');
console.log('150000 shortened:', zyp.shortNumber(150000));
console.log('2500000 shortened:', zyp.shortNumber(2500000));
console.log('');

console.log('=== Format Number Example ===');
console.log('1000000 formatted:', zyp.formatNumber(1000000));
console.log('12345678 formatted:', zyp.formatNumber(12345678));
console.log('');

console.log('=== Timestamp Example ===');
console.log('Current timestamp (ms):', Date.now());
console.log('Current timestamp (s):', zyp.timestamp(Date.now()));
console.log('');

console.log('=== MS Example ===');
console.log('90000ms formatted:', zyp.ms(90000));
console.log('90000ms short:', zyp.ms(90000, { short: true }));
console.log('1.5m to ms:', zyp.ms('1.5m'));
console.log('1h to ms:', zyp.ms('1h'));
console.log('');

console.log('=== Generate Password Example ===');
console.log('Basic password:', zyp.generatePassword({ length: 16 }));
console.log('Password with numbers:', zyp.generatePassword({ length: 16, numbers: true }));
console.log('Password with symbols:', zyp.generatePassword({ length: 16, symbols: true }));
console.log('');

console.log('=== Generate Code Example ===');
console.log('Basic code:', zyp.generateCode({ length: 16 }));
console.log('Code with custom range:', zyp.generateCode({ length: 16, range: 8 }));
console.log('Code with numbers:', zyp.generateCode({ length: 16, numbers: true }));
