import ShortUniqueId from "short-unique-id";

export class UUID {
  value: string;

  constructor(length: number = 6) {
    const generate = new ShortUniqueId({
      length
    })

    const code = String(generate()).toUpperCase()

    this.value = code;
  }
}