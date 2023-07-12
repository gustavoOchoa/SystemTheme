module.exports = {
  reactStrictMode: true,
  env:{
    int : 'http://localhost/app/intranet',
    ext : 'http://localhost/app/extranet',
    title :'Gurthang Dashboard Themplate',
    page_title: 'Gurthang Theme',
    enviroment: 'development',
    maxAge: 2592000
  },
  async redirects() {
    return [
      {
        source: '/',
        permanent: true,
        destination: '/extranet'
      }
    ]
  }
};