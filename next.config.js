module.exports = {
  reactStrictMode: true,
  env:{
    int_frmwk5 : 'https://local.com/tdi/Intranet/Aplicaciones/',
    ext_frmwk5 : 'https://local.com/tdi/Extranet/Aplicaciones/',
    fmk_frmwk6 : 'http://localhost/frmwk/framework/',
    int_frmwk6 : 'http://localhost/frmwk/intranet/',
    ext_frmwk6 : 'http://localhost/frmwk/extranet/',
    frmwk6_title :'Tecnología y Desarrollo Informatico',
    page_title: 'TDI FRAMEWORK',
    enviroment: 'production',
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