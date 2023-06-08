import { AppErrors } from '../errors/app-errors'

import { Either } from '../types/either'

export interface UploadRepository {
  upload(uri: string): Promise<Either<AppErrors, { filePath: string }>>
}
