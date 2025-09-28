import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

export const prerender = false;

export async function POST({ cookies }) {
    // Clear the admin auth cookie
    cookies.set('admin_auth', '', {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: 0
    });

    return new Response(null, {
        status: 302,
        headers: {
            Location: '/admin/login'
        }
    });
}
