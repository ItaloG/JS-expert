import { randomUUID as uuid } from "node:crypto";

export default class Cart {
  constructor() {
    this.id = uuid();
  }
}
