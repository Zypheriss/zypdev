let chalk;
try {
  chalk = require('chalk');
} catch (e) {
  chalk = {
    green: (text) => text,
    red: (text) => text,
    yellow: (text) => text,
    blue: (text) => text,
    cyan: (text) => text,
    magenta: (text) => text,
    gray: (text) => text,
    bold: (text) => text
  };
}

class Logger {
  constructor(options = {}) {
    this.showTimestamp = options.showTimestamp !== false;
    this.prefix = options.prefix || 'ZYPDEV';
  }

  getTimestamp() {
    if (!this.showTimestamp) return '';
    const now = new Date();
    return `[${now.toLocaleTimeString()}]`;
  }

  success(message) {
    console.log(`${chalk.gray(this.getTimestamp())} ${chalk.green('✓')} ${chalk.bold(this.prefix)} ${chalk.green(message)}`);
  }

  error(message) {
    console.log(`${chalk.gray(this.getTimestamp())} ${chalk.red('✗')} ${chalk.bold(this.prefix)} ${chalk.red(message)}`);
  }

  warn(message) {
    console.log(`${chalk.gray(this.getTimestamp())} ${chalk.yellow('⚠')} ${chalk.bold(this.prefix)} ${chalk.yellow(message)}`);
  }

  info(message) {
    console.log(`${chalk.gray(this.getTimestamp())} ${chalk.blue('ℹ')} ${chalk.bold(this.prefix)} ${chalk.blue(message)}`);
  }

  debug(message) {
    console.log(`${chalk.gray(this.getTimestamp())} ${chalk.magenta('◆')} ${chalk.bold(this.prefix)} ${chalk.magenta(message)}`);
  }

  log(message) {
    console.log(`${chalk.gray(this.getTimestamp())} ${chalk.cyan('●')} ${chalk.bold(this.prefix)} ${message}`);
  }
}

function showBanner(customText) {
  const banner = `
███████╗██╗   ██╗██████╗ ██████╗ ███████╗██╗   ██╗
╚══███╔╝╚██╗ ██╔╝██╔══██╗██╔══██╗██╔════╝██║   ██║
  ███╔╝  ╚████╔╝ ██████╔╝██║  ██║█████╗  ██║   ██║
 ███╔╝    ╚██╔╝  ██╔═══╝ ██║  ██║██╔══╝  ╚██╗ ██╔╝
███████╗   ██║   ██║     ██████╔╝███████╗ ╚████╔╝ 
╚══════╝   ╚═╝   ╚═╝     ╚═════╝ ╚══════╝  ╚═══╝  
  `;

  console.log(chalk.cyan(banner));
  console.log(chalk.bold.white('  This project is made by Zypheris discord _zypherisComprehensive JavaScript Utility Module'));
  console.log(chalk.gray('  Author: zypheriss'));
  console.log(chalk.gray('  GitHub: https://github.com/zypheriss/zypdev'));
  if (customText) {
    console.log(chalk.yellow(`  ${customText}`));
  }
  console.log('');
}

module.exports = { Logger, showBanner };
