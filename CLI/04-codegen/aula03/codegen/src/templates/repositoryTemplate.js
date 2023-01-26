import Util from "../util.js";

const componentNameAnchor = "$$componentName";

const template = `
export default class $$componentNameRepository {
  constructor() {}

  create(data) {
    return Promise.reject("Method not implemented!");
  }

  read(query) {
    return Promise.reject("Method not implemented!");
  }

  update(id, data) {
    return Promise.reject("Method not implemented!");
  }

  delete(id) {
    return Promise.reject("Method not implemented!");
  }
}`;

export function repositoryTemplate(componentName) {
  return {
    fileName: `${componentName}Repository`,
    template: template.replaceAll(
      componentNameAnchor,
      Util.upperCaseFirstLetter(componentName)
    ),
  };
}
