const fs = require('fs');
const path = require('path');

class AdvancedLogger {
  constructor(options = {}) {
    this.logDir = options.logDir || './logs';
    this.logFile = options.logFile || 'app.log';
    this.maxFileSize = options.maxFileSize || 5 * 1024 * 1024;
    this.maxFiles = options.maxFiles || 5;
    this.logToConsole = options.logToConsole !== false;
    this.logLevel = options.logLevel || 'info';
    
    this.levels = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3
    };

    this.ensureLogDirectory();
  }

  ensureLogDirectory() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  shouldLog(level) {
    return this.levels[level] >= this.levels[this.logLevel];
  }

  getLogFilePath() {
    return path.join(this.logDir, this.logFile);
  }

  rotateLog() {
    const logPath = this.getLogFilePath();
    
    if (!fs.existsSync(logPath)) return;
    
    const stats = fs.statSync(logPath);
    if (stats.size < this.maxFileSize) return;

    for (let i = this.maxFiles - 1; i > 0; i--) {
      const oldFile = path.join(this.logDir, `${this.logFile}.${i}`);
      const newFile = path.join(this.logDir, `${this.logFile}.${i + 1}`);
      
      if (fs.existsSync(oldFile)) {
        if (i === this.maxFiles - 1) {
          fs.unlinkSync(oldFile);
        } else {
          fs.renameSync(oldFile, newFile);
        }
      }
    }

    fs.renameSync(logPath, path.join(this.logDir, `${this.logFile}.1`));
  }

  formatMessage(level, message, meta = {}) {
    const timestamp = new Date().toISOString();
    let logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
    
    if (Object.keys(meta).length > 0) {
      logMessage += ` ${JSON.stringify(meta)}`;
    }
    
    return logMessage;
  }

  write(level, message, meta = {}) {
    if (!this.shouldLog(level)) return;

    const formattedMessage = this.formatMessage(level, message, meta);

    if (this.logToConsole) {
      console.log(formattedMessage);
    }

    this.rotateLog();

    try {
      fs.appendFileSync(
        this.getLogFilePath(),
        formattedMessage + '\n',
        'utf8'
      );
    } catch (error) {
      console.error('Failed to write to log file:', error.message);
    }
  }

  debug(message, meta) {
    this.write('debug', message, meta);
  }

  info(message, meta) {
    this.write('info', message, meta);
  }

  warn(message, meta) {
    this.write('warn', message, meta);
  }

  error(message, meta) {
    this.write('error', message, meta);
  }

  clearLogs() {
    try {
      const files = fs.readdirSync(this.logDir);
      files.forEach(file => {
        if (file.startsWith(this.logFile)) {
          fs.unlinkSync(path.join(this.logDir, file));
        }
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  getLogs(count = 100) {
    try {
      const logPath = this.getLogFilePath();
      
      if (!fs.existsSync(logPath)) {
        return [];
      }

      const content = fs.readFileSync(logPath, 'utf8');
      const lines = content.split('\n').filter(line => line.trim() !== '');
      
      return lines.slice(-count);
    } catch (error) {
      console.error('Failed to read logs:', error.message);
      return [];
    }
  }
}

module.exports = { AdvancedLogger };
