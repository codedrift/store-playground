export function deserialize(value: any): string {
  try {
    return JSON.parse(value);
  } catch (e) {
    console.warn("RedisStore", "Error deserializing", value);
    return value;
  }
}

export function serialize(value: any): string {
  try {
    return JSON.stringify(value);
  } catch (e) {
    console.warn("RedisStore", "Error serializing", value);
    return `${value}`;
  }
}
