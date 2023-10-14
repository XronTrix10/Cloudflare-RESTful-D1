// copyright 2023 © Xron Trix | https://github.com/Xrontrix10

import { isAuthorized } from "../auth/authenticate";
import { Env } from "..";
import { returnJson, badEntity, badRequest, serverRoot, notFound, notAllowed, noContent, serverError } from "./responses";
import { getDataByTable, getRowByID, updateRowById, insertRowInTable, deleteRowById, dropEntireTable, getRowByCol } from "../database/d1sqlite";

export async function respondRequest(req: Request, env: Env, path: string, search: string, searchParams: any, is_post: boolean, is_get: boolean, is_put: boolean, is_delete: boolean): Promise<Response> {

    if (is_get && path === '/') { // Check If Server is Live
        return serverRoot();
    }
    if (is_get && (path === '/favicon.ico' || path === '/robots.txt')) { // In case any Stupid Opens in Browser ( Like Me :)
        return noContent();
    }

    // ====== Check For Authorization ====== //
    const authResult = isAuthorized(req, env)
    if (authResult) {
        return authResult
    }

    // ====== If authorized, then continue the request ====== //

    if ((path === '/faculties' || path === '/members') && !search) {

        const table = (path === '/faculties') ? "Faculties" : "Members";

        if (is_post) {

            let reqData;
            try {

                reqData = await req.json() as { name: string; role: string; image: string; mobile: number; roll: string; };
                const { name, role, image, mobile } = reqData;

                if (!name || !role || !image || !mobile) { // If any field is missing
                    return badEntity();
                }

                if (table === 'Members' && !reqData.roll) { // If roll field is missing for Members
                    return badEntity();
                }
            } catch (e) {
                console.log(e);
                return badEntity();
            }
            // Insert new data in the D1 store
            const response = await insertRowInTable(env, reqData, table);
            return response;
        }

        else if (is_get) {
            const details = await getDataByTable(env, table);
            if (details) {
                return returnJson(details);
            }
            return notFound();
        }

        else if (is_delete) {
            const response = await dropEntireTable(env, table);
            return response;
        }

        else {
            return notAllowed();
        }
    }

    else if ((path.startsWith('/faculties/') || path.startsWith('/members/')) && !search) {

        const table = (path.startsWith('/faculties/')) ? "Faculties" : "Members";
        const dataID = decodeURIComponent(path.split('/')[2]);  // Get the id from the URL path

        if (is_get) {
            const response = await getRowByID(env, dataID, table);
            return response;
        }

        else if (is_put) {

            let newData;
            try {

                newData = await req.json() as { name: string; role: string; image: string; mobile: number; roll: string; };
                const { name, role, image, mobile } = newData;

                if (!name && !role && !image && !mobile) { // If No field is provided
                    return badEntity();
                }
            } catch (e) {
                console.log(e);
                return badEntity();
            }
            // Update data in the D1 store
            const response = await updateRowById(env, dataID, newData, table)
            return response;
        }

        else if (is_delete) {
            const response = await deleteRowById(env, dataID, table);
            return response;
        }

        else {
            return notAllowed();
        }
    }

    else if ((path.startsWith('/faculties') || path.startsWith('/members')) && search) {

        const table = (path.startsWith('/faculties')) ? "Faculties" : "Members";

        const columns = ["id", "name", "role", "image", "mobile"];
        if (path.startsWith('/members')) {
            columns.push("roll");
        }

        console.log(columns);

        for (const key of searchParams.keys()) {

            const value = searchParams.get(key); // Get the Query Value

            if (columns.includes(key)) { // Search for known column in Query Key

                const [exists, results] = await getRowByCol(env, key, value, table);
                if (exists && results) {
                    return returnJson(results);
                }
                else if (!exists) {
                    return notFound();
                }
                else {
                    return serverError();
                }
            }
        }

        return badRequest();
    }

    else if (path === '/events' && !search) {
        const table = 'Events';

        if (is_post) {

            let reqData;
            try {
                reqData = await req.json() as { title: string; page: string; image: string };
                const { title, page, image } = reqData;

                if (!title || !page || !image) { // If any field is missing
                    return badEntity();
                }
            } catch (e) {
                console.log(e);
                return badEntity();
            }
            // Insert new data in the D1 store
            const response = await insertRowInTable(env, reqData, table);
            return response;
        }

        else if (is_get) {
            const details = await getDataByTable(env, table);
            if (details) { return returnJson(details); }
            return notFound();
        }

        else if (is_delete) {
            const response = await dropEntireTable(env, table);
            return response;
        }

        else {
            return notAllowed();
        }
    }

    else if (path.startsWith('/events/') && !search) {
        const table = 'Events';
        const dataID = decodeURIComponent(path.split('/')[2]);  // Get the Event id from the URL path

        if (is_get) {
            const response = await getRowByID(env, dataID, table);
            return response;
        }

        else if (is_put) {
            let newData;
            try {
                newData = await req.json() as { title: string; page: string; image: string; teams: any };
                const { title, page, image, teams } = newData;

                if (!title && !page && !image && !teams) { // If No field is provided
                    return badEntity();
                }
            } catch (e) {
                console.log(e);
                return badEntity();
            }
            // Update data in the D1 store
            const response = await updateRowById(env, dataID, newData, table)
            return response;
        }

        else if (is_delete) {
            const response = await deleteRowById(env, dataID, table);
            return response;
        }

        else {
            return notAllowed();
        }
    }


    else if ((path.startsWith('/events')) && search) {

        const table = "Events";

        const columns = ["id", "title", "image", "page"];

        for (const key of searchParams.keys()) {

            const value = searchParams.get(key); // Get the Query Value

            if (columns.includes(key)) { // Search for known column in Query Key

                const [exists, results] = await getRowByCol(env, key, value, table);
                if (exists && results) {
                    return returnJson(results);
                }
                else if (!exists) {
                    return notFound();
                }
                else {
                    return serverError();
                }
            }
        }

        return badRequest();
    }

    else {
        return badRequest();
    }
}