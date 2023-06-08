import { AppErrors } from './app-errors'

export class InvalidCredentials extends Error implements AppErrors {}
