declare namespace Libs {

  namespace Crypto {

    interface EncryptionResult {
      encrypted: string
      iv: string
    }
  }

  namespace CredentialsStorage {
    interface UserCredentials {
      username?: string
      password?: string
    }
  }
}
