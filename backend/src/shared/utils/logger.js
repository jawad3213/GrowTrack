const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue'
};

const log = (level, message, meta = {}) => {
  const timestamp = new Date().toISOString();
  const logObject = {
    timestamp,
    level: level.toUpperCase(),
    message,
    ...meta
  };

  if (process.env.NODE_ENV !== 'test') {
    const color = colors[level] || 'white';
    console.log(`[${timestamp}] ${level.toUpperCase()}: ${message}`, meta);
  }

  return logObject;
};

module.exports = {
  error: (message, meta) => log('error', message, meta),
  warn: (message, meta) => log('warn', message, meta),
  info: (message, meta) => log('info', message, meta),
  http: (message, meta) => log('http', message, meta),
  debug: (message, meta) => log('debug', message, meta)
};
