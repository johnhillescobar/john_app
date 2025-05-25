'use client';

export async function fetchApiKeys() {
    try {
        const response = await fetch('/api/apikeys');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching API keys:', error);
        throw error;
    }
}

export async function createApiKey(name, type) {
    try {
        const response = await fetch('/api/apikeys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, type }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating API key:', error);
        throw error;
    }
}

export async function updateApiKey(id, name) {
    try {
        const response = await fetch('/api/apikeys', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, name }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating API key:', error);
        throw error;
    }
}

export async function deleteApiKey(id) {
    try {
        const response = await fetch(`/api/apikeys?id=${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error deleting API key:', error);
        throw error;
    }
} 