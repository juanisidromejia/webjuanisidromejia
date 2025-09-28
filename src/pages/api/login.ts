import type { APIContext } from 'astro';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

export const prerender = false;

export async function POST({ request, cookies }: APIContext) {
    try {
        const data = await request.formData();
        const password = data.get('password');

        if (!password || password !== process.env.ADMIN_PASSWORD) {
            return new Response(null, {
                status: 302,
                headers: {
                    Location: '/admin/login?error=1'
                }
            });
        }

        // Set cookie for authentication
        cookies.set('admin_auth', 'true', {
            path: '/',
            httpOnly: true,
            secure: false, // Set to true in production with HTTPS
            maxAge: 60 * 60 * 24 * 7 // 7 days
        });

        return new Response(null, {
            status: 302,
            headers: {
                Location: '/admin'
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        return new Response(null, {
            status: 302,
            headers: {
                Location: '/admin/login?error=1'
            }
        });
    }
}
