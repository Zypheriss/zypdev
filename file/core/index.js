module.exports = {
  calculate: function (value, value2) {
    if (value2 === 0) {
      throw new TypeError('Second value cannot be "0" for percentage calculation.');
    }
    return (value / value2) * 100;
  },

  random: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  shortNumber: function (number, locale = 'en-US') {
    return Intl.NumberFormat(locale, {
      notation: 'compact',
      maximumFractionDigits: 2,
    }).format(number);
  },

  formatNumber: function (number) {
    const formattedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    if (formattedNumber.length > 21) {
      throw new Error("The number is bigger than \"21\" digits!");
    } else {
      return formattedNumber;
    };
  },

  timestamp: function (time) {
    return parseInt(time / 1000);
  },

  ms: function (value, options) {
    options = options || {};
    let type = typeof value;
    let lang = options.lang || 'en';
    let largest = options.largest || Infinity;
    let units = options.units || ['y', 'year', 'years', 'yr', 'yrs', 'mo', 'month', 'months', 'w', 'week', 'weeks', 'd', 'day', 'days', 'h', 'hour', 'hours', 'm', 'minute', 'minutes', 's', 'second', 'seconds'];

    if (largest < 1) {
      throw new Error("The minimum 'largest' must be 1!");
    };

    if (type === 'string' && value.length > 0) {
      return parseString(value)
    } else if (type === 'number' && isFinite(value)) {
      let shorts = options.short || false;
      return shorts ? formatShort(value, lang, largest, units) : formatLong(value, lang, largest, units);
    };

    throw new Error('value is not a non-empty string or a valid number! value = ' + JSON.stringify(value));
  },

  generatePassword: function (options) {
    let length = options.length ? parseFloat(options.length) : 15;
    const type = typeof length;
    let number = options.numbers || false;
    let lowercase = options.lowercase || true;
    let uppercase = options.uppercase || true;
    let symbol = options.symbols || false;
    let excludeSimilarCharacter = options.excludeSimilarCharacters || false;
    let allLowercase = options.allLowercase || false;
    let allUppercase = options.allUppercase || false;

    let lowercases = 'abcdefghijklmnopqrstuvwxyz';
    let uppercases = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let numbers = '0123456789';
    let symbols = '!@#$%^&*()+_-=}{[]|:;"/?.><,`~';
    let excludeSimilarCharacters = /[ilLI|`oO0]/g;

    if (!length || length < 2) {
      throw new Error("The password length must be at least 2 character long.");
    };

    if (type === 'number' && isFinite(length)) {
      let words = '';

      if (number) {
        words += numbers;
      };

      if (lowercase) {
        words += lowercases;
      };

      if (uppercase) {
        words += uppercases;
      };

      if (symbol) {
        if (typeof symbol === 'string') {
          words += symbol;
        } else {
          words += symbols;
        };
      };

      if (!words) {
        throw new TypeError('At least one rule for pools must be true.');
      };

      if (allLowercase && allUppercase) {
        throw new TypeError('Are you serious? Just activate either All Lowercase or All Uppercase');
      };

      if (allLowercase) {
        words = words.toLowerCase();
      };

      if (allUppercase) {
        words = words.toUpperCase();
      };

      if (excludeSimilarCharacter) {
        words = words.replace(excludeSimilarCharacters, '');
      };

      const password = generateRandom(options, words);

      return password;
    } else {
      throw new Error('Password length is not a non-empty string or a valid number!');
    };
  },

  generateCode: function (options) {
    let length = options.length ? parseFloat(options.length) : 16;
    let range = options.range ? parseFloat(options.range) : 4;
    const lengthType = typeof length;
    const rangeType = typeof range;
    let numbers = options.numbers || false;
    let lowercase = options.lowercase || false;
    let uppercase = options.uppercase || false;
    let excludeSimilarCharacters = options.excludeSimilarCharacters || false;
    let symbol = options.symbol || '-';
    let allLowercase = options.allLowercase || false;
    let allUppercase = options.allUppercase || true;

    if (!length || length < 1) {
      throw new Error("The code length must be at least 1 character long.");
    };

    if (lengthType === 'number' && rangeType === 'number' && isFinite(length) && isFinite(range)) {
      const str = this.generatePassword({ length, numbers, lowercase, uppercase, excludeSimilarCharacters, allLowercase, allUppercase });
      let result = "";

      for (let i = 0; i < str.length; i += range) {
        result += str.slice(i, i + range) + (i < str.length - range ? symbol : '');
      }

      return result;
    } else {
      throw new Error('Code length is not a non-empty string or a valid number!');
    };
  },
};

let s = 1000;
let m = s * 60;
let h = m * 60;
let d = h * 24;
let w = d * 7;
let mo = d * 30;
let y = d * 365;

function parseString(string) {
  string = String(string);
  if (string.length > 100) {
    return;
  }
  var supported = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|months?|month?|mo?|years?|yrs?|yr?|y)?$/i.exec(
    string
  );
  if (!supported) {
    return;
  }
  var n = parseFloat(supported[1]);
  var type = (supported[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'months':
    case 'month':
    case 'mo':
      return n * mo;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

function formatLong(ms, lang, largest, units) {
  let msAbs = Math.abs(ms);
  let days = Math.floor(msAbs / d);
  let hours = Math.floor((msAbs % (d)) / (h));
  let minutes = Math.floor((msAbs % (h)) / (m));
  let seconds = Math.floor(msAbs % (m) / (s));
  let milliseconds = msAbs % (s);

  let duration = "";

  if (largest === undefined) {
    largest = Infinity;
  }

  if (units === undefined) {
    units = ['y', 'year', 'years', 'yr', 'yrs', 'mo', 'month', 'months', 'w', 'week', 'weeks', 'd', 'day', 'days', 'h', 'hour', 'hours', 'm', 'minute', 'minutes', 's', 'second', 'seconds', 'ms', 'milliseconds', 'millisecond'];
  }

  if (largest > 0 && days > 0) {
    if (units.includes('d') || units.includes('day') || units.includes('days')) {
      duration += days + " day" + (days > 1 ? 's' : '') + " ";
      largest--;
    }
  }

  if (largest > 0 && hours > 0 && (units.includes('h') || units.includes('hour') || units.includes('hours'))) {
    duration += hours + " hour" + (hours > 1 ? 's' : '') + " ";
    largest--;
  }

  if (largest > 0 && minutes && (units.includes('m') || units.includes('minute') || units.includes('minutes'))) {
    duration += minutes + " minute" + (minutes > 1 ? 's' : '') + " ";
    largest--;
  }

  if (largest > 0 && seconds && (units.includes('s') || units.includes('second') || units.includes('seconds'))) {
    duration += seconds + " second" + (seconds > 1 ? 's' : '') + " ";
    largest--;
  }

  if (largest > 0 && milliseconds > 0 && (units.includes('ms') || units.includes('millisecond') || units.includes('milliseconds'))) {
    duration += milliseconds + " millisecond" + (milliseconds > 1 ? 's' : '') + " ";
    largest--;
  };

  duration = duration.trim().replace(/(^|\s)0\s\w+/g, "").replace(/\s+/g, " ");

  return duration;
}

function formatShort(ms, lang, largest, units) {
  let msAbs = Math.abs(ms);
  let days = Math.floor(msAbs / d);
  let hours = Math.floor((msAbs % (d)) / (h));
  let minutes = Math.floor((msAbs % (h)) / (m));
  let seconds = Math.floor(msAbs % (m) / (s));
  let milliseconds = msAbs % (s);

  let duration = "";

  if (largest === undefined) {
    largest = Infinity;
  }

  if (units === undefined) {
    units = ['y', 'year', 'years', 'yr', 'yrs', 'mo', 'month', 'months', 'w', 'week', 'weeks', 'd', 'day', 'days', 'h', 'hour', 'hours', 'm', 'minute', 'minutes', 's', 'second', 'seconds', 'ms', 'milliseconds', 'millisecond'];
  }

  if (days > 0 && largest > 0 && (units.includes('d') || units.includes('day') || units.includes('days'))) {
    duration += days + "d ";
    largest--;
  }

  if (largest > 0 && hours > 0 && (units.includes('h') || units.includes('hour') || units.includes('hours'))) {
    duration += hours + "h ";
    largest--;
  }

  if (largest > 0 && minutes && (units.includes('m') || units.includes('minute') || units.includes('minutes'))) {
    duration += minutes + "m ";
    largest--;
  }

  if (largest > 0 && seconds && (units.includes('s') || units.includes('second') || units.includes('seconds'))) {
    duration += seconds + "s ";
    largest--;
  }

  if (largest > 0 && milliseconds > 0 && (units.includes('ms') || units.includes('millisecond') || units.includes('milliseconds'))) {
    duration += milliseconds + "ms ";
    largest--;
  };

  duration = duration.replace(/(^|\s)0\w+/g, "").replace(/\s+/g, "");

  return duration;
}

function generateRandom(options, words) {
  let password = '';
  let optionsLength = options.length;
  let passLength = words.length;

  for (var i = 0; i < optionsLength; i++) {
    password += words[randomNumber(passLength)];
  }

  return password;
};

function randomNumber(max) {
  var rand = randomValue();
  while (rand >= 256 - (256 % max)) {
    rand = randomValue();
  }
  return rand % max;
};

function randomValue() {
  const crypto = require('crypto');

  var randomIndex;
  var randomBytes;

  if (randomIndex === undefined || randomIndex >= randomBytes.length) {
    randomIndex = 0;
    randomBytes = crypto.randomBytes(256);
  }

  var result = randomBytes[randomIndex];
  randomIndex += 1;

  return result;
};
