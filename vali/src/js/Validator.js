export default class Validator {
  validateUsername(username) {
    if (typeof username !== 'string') {
      return false;
    }

    return /^(?!.*\d{4})[A-Za-z](?:[A-Za-z0-9_-]*[A-Za-z])?$/.test(username);
  }
}