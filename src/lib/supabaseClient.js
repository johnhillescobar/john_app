import { createClient } from '@supabase/supabase-js';

// Debug logging
console.log('Environment variables check:');
console.log('SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Exists' : 'Missing');
console.log('SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Exists' : 'Missing');

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.error('Supabase URL is missing. Current env:', {
        NODE_ENV: process.env.NODE_ENV,
        envKeys: Object.keys(process.env).filter(key => key.includes('SUPABASE'))
    });
    throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_URL');
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error('Supabase Anon Key is missing. Current env:', {
        NODE_ENV: process.env.NODE_ENV,
        envKeys: Object.keys(process.env).filter(key => key.includes('SUPABASE'))
    });
    throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Test the connection and verify schema
(async () => {
    try {
        console.log('Testing Supabase connection and schema...');

        // Insert a test record to verify schema
        const testKey = {
            name: '_test_schema_verification',
            key: 'test_key',
            type: 'test',
            usage: 0
        };

        const { data: insertResult, error: insertError } = await supabase
            .from('api_keys')
            .insert([testKey])
            .select();

        if (insertError) {
            console.error('Schema verification failed. Error details:', {
                message: insertError.message,
                hint: insertError.hint,
                details: insertError.details,
                code: insertError.code
            });

            if (insertError.message.includes('column') && insertError.message.includes('does not exist')) {
                console.log('\nExpected table schema:');
                console.log(`
                    create table api_keys (
                        id uuid default uuid_generate_v4() primary key,
                        name text not null,
                        key text not null unique,
                        type text not null,
                        usage integer default 0,
                        created_at timestamp with time zone default timezone('utc'::text, now())
                    );
                `);
            }
        } else {
            console.log('Schema verification successful!');

            // Clean up test record
            await supabase
                .from('api_keys')
                .delete()
                .match({ name: '_test_schema_verification' });
        }

    } catch (err) {
        console.error('Schema verification error:', err.message);
    }
})(); 