import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request) {
    try {
        const { apiKey } = await request.json();

        if (!apiKey) {
            return NextResponse.json(
                { valid: false, error: 'API key is required' },
                { status: 400 }
            );
        }

        // Query Supabase to check if the API key exists
        const { data: apiKeyData, error } = await supabase
            .from('api_keys')
            .select('id, key, type')
            .eq('key', apiKey)
            .single();

        if (error) {
            console.error('Supabase query error:', error);
            return NextResponse.json(
                { valid: false, error: 'Error validating API key' },
                { status: 500 }
            );
        }

        // API key is valid if we found a matching record
        const isValid = !!apiKeyData;

        if (isValid) {
            // Increment the usage counter
            const { error: updateError } = await supabase
                .from('api_keys')
                .update({ usage: apiKeyData.usage + 1 })
                .eq('id', apiKeyData.id);

            if (updateError) {
                console.error('Error updating usage count:', updateError);
            }
        }

        return NextResponse.json({
            valid: isValid,
            type: isValid ? apiKeyData.type : null
        });
    } catch (error) {
        console.error('Validation error:', error);
        return NextResponse.json(
            { valid: false, error: 'Invalid request' },
            { status: 400 }
        );
    }
} 