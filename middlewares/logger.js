import path from "path";

import { transports, format } from "winston";
import { logger, errorLogger as expressErrorLogger } from "express-winston";

const requestLogger = logger({
  transports: [
    new transports.File({ filename: path.resolve("logs", "request.log") }),
  ],
  format: format.combine(format.timestamp(), format.json()),
});

const errorLogger = expressErrorLogger({
  transports: [
    new transports.File({ filename: path.resolve("logs", "error.log") }),
  ],
  format: format.combine(format.timestamp(), format.json()),
});

export default { requestLogger, errorLogger };
