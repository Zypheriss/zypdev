const { ColorUtils } = require('../file/export');

console.log('=== Color Utils Examples ===\n');

const hex = '#3498db';
const rgb = ColorUtils.hexToRgb(hex);

console.log('Hex to RGB:', hex, '->', rgb);
console.log('RGB to Hex:', rgb.r, rgb.g, rgb.b, '->', ColorUtils.rgbToHex(rgb.r, rgb.g, rgb.b));
console.log('Hex to Int:', hex, '->', ColorUtils.hexToInt(hex));
console.log('Int to Hex:', 3447003, '->', ColorUtils.intToHex(3447003));

const hsl = ColorUtils.rgbToHsl(rgb.r, rgb.g, rgb.b);
console.log('RGB to HSL:', hsl);
console.log('HSL to RGB:', ColorUtils.hslToRgb(hsl.h, hsl.s, hsl.l));

console.log('Lighten 20%:', ColorUtils.lighten(hex, 20));
console.log('Darken 20%:', ColorUtils.darken(hex, 20));
console.log('Random Hex:', ColorUtils.randomHex());
console.log('Is Valid Hex (#3498db):', ColorUtils.isValidHex('#3498db'));
console.log('Is Valid Hex (invalid):', ColorUtils.isValidHex('not-a-color'));
