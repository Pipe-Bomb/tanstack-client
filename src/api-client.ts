let baseUrl = "http://127.0.0.1:3000";

export function setBaseUrl(newBaseUrl: string) {
	baseUrl = newBaseUrl;
}

export interface RequestConfig extends Omit<RequestInit, "method"> {
	method: "GET" | "PUT" | "PATCH" | "POST" | "DELETE";
	responseType?: string;
}

type ResponseSuccess = {
	data: any;
	status: number;
	headers: Headers;
};

export async function customFetch<T extends ResponseSuccess>(
	url: string,
	config: RequestConfig,
): Promise<T> {
	const { method, headers, body, responseType } = config;

	const fullUrl = new URL(baseUrl + url);

	const finalHeaders = new Headers(headers);
	if (!finalHeaders.has("Content-Type") && !(body instanceof FormData)) {
		finalHeaders.set("Content-Type", "application/json");
	}

	const res = await fetch(fullUrl.toString(), {
		method,
		headers: finalHeaders,
		body,
		credentials: "include",
	});

	let parsedBody: any;

	if (responseType === "blob") {
		parsedBody = await res.blob();
	} else if (responseType === "text") {
		parsedBody = await res.text();
	} else {
		try {
			parsedBody = await res.json();
		} catch {
			parsedBody = null;
		}
	}

	if (!res.ok) {
		throw {
			status: res.status,
			body: parsedBody,
			headers: res.headers,
		};
	}

	return {
		data: parsedBody,
		status: res.status,
		headers: res.headers,
	} as T;
}
