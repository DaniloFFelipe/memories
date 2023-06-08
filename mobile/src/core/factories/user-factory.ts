import { AuthenticateUser } from '../feature/authenticate-user'
import { SignUpUser } from '../feature/signup-user'
import { HttpUploadRepository } from '../repositories/http/http-upload-repository'
import { HttpUserRepository } from '../repositories/http/http-user-repository'

export const UserFactory = {
  authentication() {
    return new AuthenticateUser(new HttpUserRepository())
  },
  signUp() {
    return new SignUpUser(new HttpUserRepository(), new HttpUploadRepository())
  },
}
