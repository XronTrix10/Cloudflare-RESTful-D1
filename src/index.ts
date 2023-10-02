// copyright 2023 © Xron Trix | https://github.com/Xrontrix10

import { notAllowed } from './handler/responses';
import { respondRequest } from './handler/requests';

export interface Env {
	AUTH_TOKEN: string;
	DB: D1Database;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const method = request.method;
		const { pathname } = new URL(request.url);

		if (method === 'POST') {

			const respond = await respondRequest(request, env, pathname, true, false, false, false);
			return respond;
		}

		else if (method === 'GET') {

			const respond = await respondRequest(request, env, pathname, false, true, false, false);
			return respond;
		}

		else if (method === 'PUT') {

			const respond = await respondRequest(request, env, pathname, false, false, true, false);
			return respond;
		}

		else if (method === 'DELETE') {

			const respond = await respondRequest(request, env, pathname, false, false, false, true);
			return respond;
		}

		else {
			return notAllowed();
		}
	},
};
