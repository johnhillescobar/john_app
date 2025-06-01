/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
        LANGCHAIN_API_KEY: process.env.LANGCHAIN_API_KEY,
        LANGCHAIN_TRACING_V2: process.env.LANGCHAIN_TRACING_V2,
        LANGCHAIN_PROJECT: process.env.LANGCHAIN_PROJECT
    }
}

export default nextConfig 