module.exports = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/api',
                permanent: true,
            },
            {
                source: '/feed',
                destination: '/api/feed',
                permanent: true,
            }
        ]
    },
}
