export const onRequestOptions = () => {
    return new Response(
        null,
        {
            status: 204,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Methods": "GET, POST, HEAD, DELETE, PUT, PATCH",
            }
        }
    )
}

export const onRequest = async ({ next }) => {
    const response = await next()
    response.headers.set("Access-Control-Allow-Origin", "*")
    response.headers.set("Access-Control-Allow-Headers", "*")
    response.headers.set(
        "Access-Control-Allow-Methods",
        "GET, POST, HEAD, DELETE, PUT, PATCH"
    )
    return response
}
