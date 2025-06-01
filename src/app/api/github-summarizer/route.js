import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';
import { summarizeGitHubReadme } from '@/lib/chain';

// Validate API key
async function validateApiKey(apiKey) {
    if (!apiKey) {
        return { valid: false, error: 'API key is required' };
    }

    try {
        // Query Supabase to check if the API key exists
        const { data: apiKeyData, error } = await supabase
            .from('api_keys')
            .select('id, key, type, usage')
            .eq('key', apiKey)
            .single();

        // Handle the case when no API key is found
        if (error?.code === 'PGRST116') {
            return { valid: false, error: 'Invalid API Key' };
        }

        // Handle other database errors
        if (error) {
            console.error('Supabase query error:', error);
            return { valid: false, error: 'Error validating API key' };
        }

        // Increment the usage counter
        if (apiKeyData) {
            const { error: updateError } = await supabase
                .from('api_keys')
                .update({ usage: (apiKeyData.usage || 0) + 1 })
                .eq('id', apiKeyData.id);

            if (updateError) {
                console.error('Error updating usage count:', updateError);
            }
        }

        return {
            valid: true,
            type: apiKeyData.type
        };
    } catch (error) {
        console.error('Validation error:', error);
        return { valid: false, error: 'Error validating API key' };
    }
}

async function getGitHubReadme(githubUrl) {
    try {
        // Extract owner and repo from GitHub URL
        const urlParts = githubUrl.replace('https://github.com/', '').split('/');
        const owner = urlParts[0];
        const repo = urlParts[1];

        // Fetch the README content from GitHub API
        const response = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/readme`,
            {
                headers: {
                    'Accept': 'application/vnd.github.v3.raw'
                }
            }
        );

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('README not found');
            }
            throw new Error(`GitHub API error: ${response.statusText}`);
        }

        const readmeContent = await response.text();
        return readmeContent;

    } catch (error) {
        console.error('Error fetching GitHub README:', error);
        throw new Error('Failed to fetch README content');
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { githubUrl } = body;
        const apiKey = request.headers.get('x-api-key');

        // Validate the API key
        const validation = await validateApiKey(apiKey);
        if (!validation.valid) {
            return NextResponse.json(
                { error: validation.error },
                { status: 401 }
            );
        }

        if (!githubUrl) {
            return NextResponse.json(
                { error: 'Repository URL is required' },
                { status: 400 }
            );
        }

        // Fetch README content
        const readmeContent = await getGitHubReadme(githubUrl);

        // Generate summary using the imported function
        const summary = await summarizeGitHubReadme(readmeContent);

        return NextResponse.json({
            ...summary,
            type: validation.type
        });

    } catch (error) {
        console.error('Error in GitHub summarizer:', error);

        // Handle specific error types
        if (error.message === 'README not found') {
            return NextResponse.json(
                { error: 'Repository README not found' },
                { status: 404 }
            );
        }

        if (error.message.includes('Failed to generate valid summary')) {
            return NextResponse.json(
                { error: 'Failed to generate summary' },
                { status: 422 }
            );
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

