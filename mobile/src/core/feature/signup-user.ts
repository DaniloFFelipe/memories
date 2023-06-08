import { UploadRepository } from '../repositories/upload-repository'
import { UserRepository } from '../repositories/user-repository'

export type Input = {
  name: string
  email: string
  password: string
  fileUri: string
}

export class SignUpUser {
  constructor(
    private userRepository: UserRepository,
    private uploadRepository: UploadRepository,
  ) {}

  async execute({ name, email, password, fileUri }: Input) {
    const uploadResult = await this.uploadRepository.upload(fileUri)
    if (uploadResult.isRight()) {
      const { filePath } = uploadResult.value
      const result = await this.userRepository.signUp({
        name,
        email,
        password,
        pictureUrl: filePath,
      })
      return result
    }

    return uploadResult
  }
}
