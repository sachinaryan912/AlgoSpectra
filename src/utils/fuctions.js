export const hasEqualBrackets = (str) => {
    let leftCount = 0, rightCount = 0;

    for (let char of str) {
        if (char === '(') leftCount++;
        else if (char === ')') rightCount++;
    }

    return [(leftCount === rightCount), leftCount];
};

export function parseNumberString(input) {
    return input
        .split(',')
        .map(num => num.trim().replace(/\s+/g, '')) // Remove extra spaces
        .filter(num => num !== '') // Remove empty elements
        .map(Number); // Convert to numbers
}

export function getLastNumberLength(str) {
    let numbers = str.split(',').map(num => num.trim()); // Split and trim spaces
    let lastNumber = numbers.length > 0 ? numbers[numbers.length - 1] : ''; // Get last number
    return lastNumber.length; // Return its length
}