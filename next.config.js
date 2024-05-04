/** @type {import('next').NextConfig} */
const nextConfig = { 
    rewrites(){
        return [
            {
              source: '/backend/:path*',
              destination: 'http://localhost:3001/:path*'
            }
        ]
    }
}
module.exports = nextConfig
