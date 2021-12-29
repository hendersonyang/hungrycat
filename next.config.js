module.exports = {
    async redirects() {
        return [
            {
                source: '/:path',
                destination: '/api/:path',
                permanent: true,
            }, {
                source: '/',
                destination: '/api',
                permanent: true,
            },
        ]
    },
}
