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

    if (url.pathname.startsWith("/delay/") === true) {
        const timeText = url.pathname.split("/")[2]
        const time = parseInt(timeText)

        if (isNaN(time) === true || time <= 0 || time > 20) {
            return Response.json(
                { error: "Invalid time to wait" },
                { status: 400 },
            )
        }
        await new Promise(
            resolve => setTimeout(resolve, time * 1000)
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
