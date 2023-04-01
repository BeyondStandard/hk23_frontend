/**
 * @return {boolean} true if (lng, lat) is in bounds
 */
export function contains(bounds: string | any[], lat: any, lng: any): boolean {
  let count = 0
  for (let b = 0; b < bounds[0].length; b++) {
    const vertex1 = bounds[0][b]
    const vertex2 = bounds[0][(b + 1) % bounds[0].length]
    if (west(vertex1, vertex2, lng, lat)) ++count
  }
  return count % 2 === 1

  /**
   * @return {boolean} true if (x,y) is west of the line segment connecting A and B
   */
  function west(
    A: [number, number], // { y: number; x: number },
    B: [number, number], // { y: number; x: number },
    x: number,
    y: number
  ): boolean {
    if (A[1] <= B[1]) {
      if (y <= A[1] || y > B[1] || (x >= A[0] && x >= B[0])) {
        return false
      } else if (x < A[0] && x < B[0]) {
        return true
      } else {
        return (y - A[1]) / (x - A[0]) > (B[1] - A[1]) / (B[0] - A[0])
      }
    } else {
      return west(B, A, x, y)
    }
  }
}
