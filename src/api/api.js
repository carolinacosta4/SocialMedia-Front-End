import axios from "axios";

export default axios.create({
    baseURL: "http://127.0.0.1:3000",
    headers: {
        "Content-type": "application/json"
    }
});

/**
 * GET utility function
 * @param {string} apiBaseUrl - this is the base URL from the API
 * @param {string} endpoint - this is the endpoint of the API
 * @returns a promise object with the response
 */

export async function get(apiBaseUrl, endpoint, token) {
    try {
        const response = await fetch(`${apiBaseUrl}/${endpoint}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return handleResponse(response)
    } catch (error) {
        throw Error
    }
}

/**
 * POST utility function
 * @param {*} apiBaseUrl - this is the base URL from the API
 * @param {*} endpoint - this is the endpoint of the API
 * @param {*} data - this is the data that we will send to the server
 */


// Buscar aqui a parte dos tokens
export async function post(apiBaseUrl, endpoint, data, token) {
    try {
        const response = await fetch(`${apiBaseUrl}/${endpoint}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })
        return handleResponse(response)
    } catch (error) {
        throw error
    }
}

export async function postForm(apiBaseUrl, endpoint, data, token) {
    try {
        for (let [key, value] of data.entries()) {
            console.log(`${key}:`, value);
        }
        
        const response = await fetch(`${apiBaseUrl}/${endpoint}`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: data
            })
        return handleResponse(response)
    } catch (error) {
        throw error
    }
}

/**
 * PATCH utility function
 * @param {string} apiBaseUrl - the base URL from the API
 * @param {string} endpoint - the endpoint of the API
 * @param {object} data - the data that will be sent to the server
 * @returns a promise object with the response
 */
export async function patch(apiBaseUrl, endpoint, data, token) {
    try {
        const response = await fetch(`${apiBaseUrl}/${endpoint}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        return handleResponse(response);
    } catch (error) {
        throw error;
    }
}

export async function patchForm(apiBaseUrl, endpoint, data, token) {
    try {
        const response = await fetch(`${apiBaseUrl}/${endpoint}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: data
        });
        return handleResponse(response);
    } catch (error) {
        throw error;
    }
}


/**
 * DELETE utility function
 * @param {string} apiBaseUrl - this is the base URL from the API
 * @param {string} endpoint - this is the endpoint of the API
 * @returns a promise object with the response
 */
export async function remove(apiBaseUrl, endpoint, token) {
    try {
        const response = await fetch(`${apiBaseUrl}/${endpoint}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        return handleResponse(response);
    } catch (error) {
        throw error;
    }
}


/**
 * Response handling 
 * @param {object} response a promise object with the response of the server
 * @returns the response from the server 
 */

async function handleResponse(response) {
    if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(`API request failed with status ${response.status}: ${errorMessage}`)
    }
    const data = await response.json()
    return data
}