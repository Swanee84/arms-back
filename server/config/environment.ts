
const environments = {
  development: {
    mariadb: {
      username: 'shpark',
      password: 'park1908',
      database: 'ARMS',
      address: 'localhost'
    },
    loginSecret: 'ARMS_Login_dev',
  },

  production: {
    mariadb: {
      username: 'shpark',
      password: 'park1908',
      database: 'ARMS',
      address: 'ARMS_Login_dev'
    },
    loginSecret: 'ARMS_Login',
  }
}

const nodeEnv = process.env.NODE_ENV || 'development';
console.log("nodeEnv : " + nodeEnv + ", process.env.NODE_ENV : " + process.env.NODE_ENV)
export const environment = environments[nodeEnv];
