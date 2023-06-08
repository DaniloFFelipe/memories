import { EnterpriseError } from './enterprise-error'

export class InvalidResource extends Error implements EnterpriseError {}
