const { Logger, showBanner } = require('../file/export');

showBanner('Welcome to ZypDev');

const logger = new Logger({
  showTimestamp: true,
  prefix: 'MYAPP'
});

logger.success('Application started successfully!');
logger.info('Loading configuration...');
logger.warn('This is a warning message');
logger.error('An error occurred!');
logger.debug('Debug information');
logger.log('General log message');
