export const pickProperties = (object: any, properties: string[]) => {
    const result = new Map();
    for (const propertyName of properties)
        result.set(propertyName, object[propertyName]);
    return Object.fromEntries(result.entries());
}