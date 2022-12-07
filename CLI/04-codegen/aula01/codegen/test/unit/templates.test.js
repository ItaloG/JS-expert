import { expect, describe, test, jest, beforeEach } from "@jest/globals";

import templates from "../../src/templates/index.js";
import { serviceTemplate } from "../../src/templates/serviceTemplate.js";
import { repositoryTemplateMock, serviceTemplateMock } from "./mocks/index.js";

const { repositoryTemplate } = templates;

describe("#Codegen 3-layers arch", () => {
  const componentName = "product";
  const repositoryName = `${componentName}Repository`;
  const serviceName = `${componentName}Service`;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test("should generate repository template", () => {
    const expected = {
      fileName: repositoryName,
      template: repositoryTemplateMock,
    };

    const result = repositoryTemplate(componentName);
    expect(result).toStrictEqual(expected);
  });

  test("should generate service template", () => {
    const expected = {
      fileName: serviceName,
      template: serviceTemplateMock,
    };

    const result = serviceTemplate(componentName, repositoryName);
    expect(result).toStrictEqual(expected);
  });
});
