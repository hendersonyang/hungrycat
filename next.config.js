module.exports = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/api',
          permanent: true,
        },
      ]
    },
  }
  