export const calculateVectors = (bodyPoints, connectionArray) => {

    const x1 = bodyPoints[connectionArray[0]].x
    const x2 = bodyPoints[connectionArray[1]].x

    const y1 = bodyPoints[connectionArray[0]].y
    const y2 = bodyPoints[connectionArray[1]].y

    const delta_x = x1 - x2
    const delta_y = y1 - y2

    // Calculate the angle in radians
    let angleInRadians = Math.atan2(delta_y, delta_x);

    // Normalize the angle to be between -180 and 180 degrees
    angleInRadians = ((angleInRadians + Math.PI) % (2 * Math.PI)) - Math.PI;

    // Convert radians to degrees
    const angleInDegrees = (angleInRadians * 180) / Math.PI;

    
    return Math.abs(angleInDegrees)
    
   
}