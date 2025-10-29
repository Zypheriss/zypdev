const { StringUtils } = require('../file/export');

console.log('=== String Utils Examples ===\n');

console.log('Capitalize:', StringUtils.capitalize('hello world'));
console.log('Capitalize Words:', StringUtils.capitalizeWords('hello world'));
console.log('Reverse:', StringUtils.reverse('hello'));
console.log('Truncate:', StringUtils.truncate('This is a long text', 10));
console.log('Slugify:', StringUtils.slugify('Hello World! This is awesome'));
console.log('Camel Case:', StringUtils.camelCase('hello world example'));
console.log('Snake Case:', StringUtils.snakeCase('helloWorldExample'));
console.log('Kebab Case:', StringUtils.kebabCase('helloWorldExample'));
console.log('Remove Whitespace:', StringUtils.removeWhitespace('  hello   world  '));
console.log('Count Words:', StringUtils.countWords('This is a test sentence'));
console.log('Is Palindrome (racecar):', StringUtils.isPalindrome('racecar'));
console.log('Is Palindrome (hello):', StringUtils.isPalindrome('hello'));
console.log('Repeat:', StringUtils.repeat('abc', 3));
console.log('Is Valid Email:', StringUtils.isValidEmail('zypheris@example.com'));
console.log('Is Valid URL:', StringUtils.isValidUrl('https://example.com'));
