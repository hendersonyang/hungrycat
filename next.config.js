module.exports = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/api/',
                permanent: true,
            },
            {
                source: '/:path',
                destination: '/api/:path',
                permanent: true,
            }
        ]
    },
}
