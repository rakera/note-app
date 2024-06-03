export const loggerModuleConfig = {
  pinoHttp: {
    level: 'info', // Hide messages below the specified log level. Accepts a trace, debug, info, warn, error, or fatal
    transport: {
      target: 'pino-pretty',
      options: {
        ignore: 'req,res',
        messageFormat: '{req.url}',
        singleLine: true, // Print each log message on a single line (errors will still be multi-line)
        colorize: true, // Adds terminal color escape sequences to the output
        colorizeObjects: true, // Allows suppressing colorization of objects when set to false
        translateTime: true, // Translate time from timestamp to hh:mm format
      },
    },
  },
};
