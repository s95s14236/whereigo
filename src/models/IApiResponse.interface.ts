/**
 * server response json interface
 */
export default interface IApiResponse<T> {
    data: T,
    message: string,
    statusCode: number
}