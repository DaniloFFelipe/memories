import { AppErrors } from './app-errors'

export class UnexpectedError extends Error implements AppErrors {}
