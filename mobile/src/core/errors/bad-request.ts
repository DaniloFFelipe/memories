import { AppErrors } from './app-errors'

export class BadRequest extends Error implements AppErrors {}
