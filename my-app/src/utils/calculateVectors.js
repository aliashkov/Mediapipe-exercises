export const calculateVectors = (bodyPoints, connectionArray) => {

    const x1 = bodyPoints[connectionArray[0]].x
    const x2 = bodyPoints[connectionArray[1]].x

    const y1 = bodyPoints[connectionArray[0]].y
    const y2 = bodyPoints[connectionArray[1]].y

    const delta_x = x1 - x2
    const delta_y = y1 - y2

    const angleInRadians = Math.atan2(delta_y, delta_x);

    // Convert radians to degrees
    const angleInDegrees = (angleInRadians * 180) / Math.PI;

    return angleInDegrees

}