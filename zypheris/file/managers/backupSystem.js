const fs = require('fs');
const path = require('path');

class BackupSystem {
  constructor(options = {}) {
    this.sourcePath = options.sourcePath || './data';
    this.backupPath = options.backupPath || './backups';
    this.maxBackups = options.maxBackups || 10;
    this.autoBackup = options.autoBackup || false;
    this.backupInterval = options.backupInterval || 24 * 60 * 60 * 1000;
    this.intervalId = null;
  }

  createBackup(customName = null) {
    try {
      const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
      const backupName = customName || `backup_${timestamp}`;
      const backupDir = path.resolve(this.backupPath, backupName);

      if (!fs.existsSync(this.backupPath)) {
        fs.mkdirSync(this.backupPath, { recursive: true });
      }

      this.copyDirectory(this.sourcePath, backupDir);
      this.cleanOldBackups();

      return {
        success: true,
        backupName,
        backupPath: backupDir,
        timestamp: new Date()
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  restoreBackup(backupName) {
    try {
      const backupDir = path.resolve(this.backupPath, backupName);

      if (!fs.existsSync(backupDir)) {
        throw new Error('Backup not found');
      }

      if (fs.existsSync(this.sourcePath)) {
        this.removeDirectory(this.sourcePath);
      }

      this.copyDirectory(backupDir, this.sourcePath);

      return {
        success: true,
        restoredFrom: backupName
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  listBackups() {
    try {
      if (!fs.existsSync(this.backupPath)) {
        return [];
      }

      const backups = fs.readdirSync(this.backupPath)
        .filter(file => {
          const filePath = path.join(this.backupPath, file);
          return fs.statSync(filePath).isDirectory();
        })
        .map(name => {
          const filePath = path.join(this.backupPath, name);
          const stats = fs.statSync(filePath);
          return {
            name,
            created: stats.birthtime,
            size: this.getDirectorySize(filePath)
          };
        })
        .sort((a, b) => b.created - a.created);

      return backups;
    } catch (error) {
      throw new Error('Failed to list backups: ' + error.message);
    }
  }

  deleteBackup(backupName) {
    try {
      const backupDir = path.resolve(this.backupPath, backupName);

      if (!fs.existsSync(backupDir)) {
        return { success: false, error: 'Backup not found' };
      }

      this.removeDirectory(backupDir);

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  cleanOldBackups() {
    const backups = this.listBackups();
    
    if (backups.length > this.maxBackups) {
      const toDelete = backups.slice(this.maxBackups);
      toDelete.forEach(backup => this.deleteBackup(backup.name));
    }
  }

  startAutoBackup() {
    if (this.intervalId) {
      return { success: false, error: 'Auto backup already running' };
    }

    this.autoBackup = true;
    this.createBackup();

    this.intervalId = setInterval(() => {
      this.createBackup();
    }, this.backupInterval);

    return { success: true };
  }

  stopAutoBackup() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.autoBackup = false;
      return { success: true };
    }

    return { success: false, error: 'Auto backup not running' };
  }

  copyDirectory(src, dest) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        this.copyDirectory(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }

  removeDirectory(dir) {
    if (fs.existsSync(dir)) {
      fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
          this.removeDirectory(filePath);
        } else {
          fs.unlinkSync(filePath);
        }
      });
      fs.rmdirSync(dir);
    }
  }

  getDirectorySize(dir) {
    let size = 0;

    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        size += this.getDirectorySize(filePath);
      } else {
        size += stats.size;
      }
    }

    return size;
  }
}

module.exports = { BackupSystem };
