module.exports = {
    async redirects() {
      return [
        {
          source: '/:path',
          destination: '/api/:path',
          permanent: true,
        },
      ]
    },
  }
  