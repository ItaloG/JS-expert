export default class Util {
  static #transform({ str: [first, ...rest], upperCase = true }) {
    const firstLetter = upperCase ? first.toUpperCase() : first.toLowerCase();
    return [firstLetter, ...rest].join("");
  }
  static upperCaseFirstLetter(str) {
    return Util.#transform({ str });
  }

  static lowerCaseFirstLetter(str) {
    return Util.#transform({ str, upperCase: false });
  }
}
