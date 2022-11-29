import { expect, describe, test, jest, beforeEach } from "@jest/globals";
import { InjectHttpInterceptor } from "./agent.js";
import { Server } from "http";

const originalHttp = jest.createMockFromModule("http");

describe("HTTP Interceptor Agent", () => {
  const eventName = "request";
  const request = null;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("should not change header", () => {
    const response = {
      setHeader: jest.fn().mockReturnThis(),
    };
    const serverInstance = new originalHttp.Server();
    serverInstance.emit(eventName, request, response);
    expect(response.setHeader).not.toHaveBeenCalled();
  });

  test("should active header interceptor", () => {
    InjectHttpInterceptor()
    const response = {
      setHeader: jest.fn().mockReturnThis(),
    };
    const serverInstance = new Server();
    serverInstance.emit(eventName, request, response);
    expect(response.setHeader).toHaveBeenCalledWith('X-Instrumented-By', 'ItaloGabriel');
  });
});
