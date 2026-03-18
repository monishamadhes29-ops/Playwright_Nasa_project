class FrameworkException extends Error {

  constructor(message, error) {

    super(message)

    this.name = "FrameworkException"

    this.originalError = error

  }

}

module.exports = FrameworkException