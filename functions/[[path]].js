const parsers = {
    "application/json": (req) => req.json(),
    "application/x-www-form-urlencoded": async (req) => Object.fromEntries(
        (await req.formData()).entries()
    ),
    "text/plain": (req) => req.text(),
    default: () => null,
}

export const onRequest = async ({ request }) => {
    const url = new URL(request.url)

    if (request.method === "GET" && url.pathname === "/favicon.ico") {
        return Response.redirect(
            "https://axel669.net/images/megaman-rounded.png"
        )
    }

    const parser = parsers[request.headers.get("content-type")] ?? parsers.default
    const details = {
        method: request.method,
        path: url.pathname,
        query: Object.fromEntries(
            url.searchParams.entries()
        ),
        headers: Object.fromEntries(
            request.headers.entries()
        ),
        data: await parser(request)
    }
    return Response.json(details)
}
