import { STATUS_CODES, STATUS_MESSAGES } from './status'

export class AppError {
  statusCode: number
  message: string

  constructor(
    status: keyof (typeof STATUS_CODES)['ERRORS'],
    messageCode: keyof (typeof STATUS_MESSAGES)['ERRORS'],
  ) {
    this.statusCode = STATUS_CODES.ERRORS[status]
    this.message = STATUS_MESSAGES.ERRORS[messageCode]
  }
}
