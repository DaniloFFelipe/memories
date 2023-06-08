import { AxiosError } from 'axios'
import { api } from '../../../lib'
import { AppErrors } from '../../errors/app-errors'
import { Either, left, right } from '../../types/either'
import { UploadRepository } from '../upload-repository'
import { UploadError } from '../../errors/upload-error'
import { UnexpectedError } from '../../errors/unexpected-error'

export class HttpUploadRepository implements UploadRepository {
  async upload(uri: string): Promise<Either<AppErrors, { filePath: string }>> {
    try {
      const uploadFormData = new FormData()

      uploadFormData.append('file', {
        uri,
        name: 'image.jpg',
        type: 'image/jpg',
      } as any)

      const uploadResponse = await api.post('/api/upload', uploadFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      const filePath = uploadResponse.data.fileUrl
      return right({ filePath })
    } catch (error) {
      if (error instanceof AxiosError) {
        return left(new UploadError())
      }

      return left(new UnexpectedError())
    }
  }
}
