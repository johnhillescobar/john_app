import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

// Generate a secure API key
function generateApiKey(type) {
    const prefix = type === 'prod' ? 'live' : 'test';
    const randomBytes = crypto.randomBytes(24).toString('hex');
    return `${prefix}_${randomBytes}`;
}

// GET all API keys
export async function GET() {
    try {
        console.log('GET /api/apikeys: Starting request');

        if (!supabase) {
            console.error('GET /api/apikeys: Supabase client is not initialized');
            return NextResponse.json(
                { error: 'Database connection not initialized' },
                { status: 500 }
            );
        }

        console.log('GET /api/apikeys: Attempting database query');
        const { data, error } = await supabase
            .from('api_keys')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('GET /api/apikeys: Database error:', error);
            return NextResponse.json(
                { error: `Database error: ${error.message}` },
                { status: 500 }
            );
        }

        console.log('GET /api/apikeys: Success, returning data');
        return NextResponse.json(data);
    } catch (error) {
        console.error('GET /api/apikeys: Unexpected error:', error);
        return NextResponse.json(
            { error: `Server error: ${error.message}` },
            { status: 500 }
        );
    }
}

// POST new API key
export async function POST(request) {
    try {
        const body = await request.json();
        const { name, type } = body;

        if (!name || !type) {
            return NextResponse.json(
                { error: 'Name and type are required' },
                { status: 400 }
            );
        }

        const apiKey = generateApiKey(type);

        const { data, error } = await supabase
            .from('api_keys')
            .insert([
                {
                    name,
                    key: apiKey,
                    type,
                    usage: 0,
                }
            ])
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error creating API key:', error);
        return NextResponse.json({ error: 'Failed to create API key' }, { status: 500 });
    }
}

// PATCH update API key
export async function PATCH(request) {
    try {
        const body = await request.json();
        const { id, name } = body;

        if (!id || !name) {
            return NextResponse.json(
                { error: 'ID and name are required' },
                { status: 400 }
            );
        }

        console.log('Updating API key:', { id, name });

        const { data, error } = await supabase
            .from('api_keys')
            .update({ name })
            .eq('id', id)
            .select('*')
            .single();

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: `Failed to update API key: ${error.message}` },
                { status: 500 }
            );
        }

        if (!data) {
            return NextResponse.json(
                { error: 'API key not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error updating API key:', error);
        return NextResponse.json(
            { error: 'Failed to update API key' },
            { status: 500 }
        );
    }
}

// DELETE API key
export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'ID is required' },
                { status: 400 }
            );
        }

        const { error } = await supabase
            .from('api_keys')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting API key:', error);
        return NextResponse.json({ error: 'Failed to delete API key' }, { status: 500 });
    }
} 