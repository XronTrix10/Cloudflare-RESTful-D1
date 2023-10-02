// copyright 2023 © Xron Trix | https://github.com/Xrontrix10

export function serverRoot(): Response {
	return new Response('Server is up and running!', { status: 200 });
}

export function returnJson(data: any): Response {
	return new Response(data, {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
	});
}

export function noContent(): Response {
	return new Response(null, { status: 204 });
}

export function badRequest(): Response {
	return new Response('Bad Request', { status: 400 });
}

export function notAuthorized(): Response {
	return new Response('Unauthorized', { status: 401 });
}

export function notFound(): Response {
	return new Response('Not Found', { status: 404 });
}

export function notAllowed(): Response {
	return new Response('Method not Allowed', { status: 405 });
}

export function dataConflict(): Response {
	return new Response('Data conflicts with current resource', { status: 409 });
}

export function badEntity(): Response {
	return new Response('Unprocessable Entity', { status: 422 });
}

export function serverError(): Response {
	return new Response('Internal Server error', { status: 500 });
}
