import { createLogger, format, Logger as LoggerWinston, transports } from 'winston';

const { combine, timestamp, label, printf } = format;

export class Logger {
    private logger: LoggerWinston;
    private processId: number = process.pid;

    private myFormat: any = printf(({ level, message, label, timestamp }) => {
        return `[${timestamp}][ ${level.toUpperCase()}]Process ID:[${this.processId}][${label}]: ${message}`;
    });

    constructor(className: string) {
        this.logger = createLogger({
            format: combine(
                label({ label: className }),
                timestamp(),
                this.myFormat,
            ),
            transports: [new transports.Console()],
        });
    }

    public info(logMessage: any): void {
        this.logger.info(logMessage);
    }

    public debug(logMessage: any): void {
        this.logger.debug(logMessage);
    }

    public error(logMessage: any): void {
        this.logger.error(logMessage);
    }
}
