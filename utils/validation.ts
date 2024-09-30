export const validation = {
    checkArrayDublicate: (array, field: string) => {
        const seenValues = new Set();
        for (const obj of array) {
            const value = obj[field];
            if (seenValues.has(value)) {
                return true; // Duplicate found
            }
            seenValues.add(value);
        }
        return false;
    }
}