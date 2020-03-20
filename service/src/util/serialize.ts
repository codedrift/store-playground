export function deserializeFromString(value: any): string {
  try {
    return JSON.parse(value);
  } catch (e) {
    console.warn("Error deserializing", value);
    return value;
  }
}

export function serializeToString(value: any): string {
  try {
    return JSON.stringify(value);
  } catch (e) {
    console.warn("Error serializing", value);
    return `${value}`;
  }
}
