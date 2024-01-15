export const calculateAverageSimilarity = (arr) => {

    if (arr.length === 0) {
        return 0;
    }

    const sum = arr.reduce((acc, value) => acc + value, 0);

    // Calculate the average
    const average = sum / arr.length;

    return average;

}