// copyright 2023 © Xron Trix | https://github.com/Xrontrix10

import { notAuthorized } from "../handler/responses";
import { Env } from "..";

export function isAuthorized(request: Request, env: Env): Response | null {
	const apiKey: string | null = request.headers.get('Authorization');

	// Check if the apiKey is valid (compare it with your stored keys).
	const isValidApi: boolean = isValidApiKey(apiKey, env.AUTH_TOKEN);

	if (!isValidApi) {
		return notAuthorized();
	}

	// If the API key is valid, you can proceed with the request.
	return null;
}

// Function to validate API keys (you should implement this)
function isValidApiKey(apiKey: string | null, AUTH_TOKEN: string): boolean {
	if (apiKey === AUTH_TOKEN) {
		return true;
	}
	return false;
}
