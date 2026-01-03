export const baseUrl = "https://nseemapp-server.onrender.com";

export const fetchApi = async (route, method = 'GET', body = null) => {
    try {
        const url = `${baseUrl}${route}`;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        // Only add body for methods that support it
        if (body && method !== 'GET' && method !== 'HEAD') {
            options.body = typeof body === 'string' ? body : JSON.stringify(body);
        }

        const response = await fetch(url, options);

        // Check if response is ok (status 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Check if response has content before parsing
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        }

        return await response.text();

    } catch (error) {
        console.error('Fetch Error:', {
            message: error.message,
            route,
            method
        });

        // Re-throw to allow caller to handle the error
        throw error;
    }
}; 
export const isLive= async () => {
    const route = "/";
    return await fetchApi(route, 'GET', null)
}
