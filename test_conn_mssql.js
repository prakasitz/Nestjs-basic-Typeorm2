const sql = require('mssql')


const sqlConfig = {
    user: "test_user",
    password: "admin",
    database: "test",
    server: "172.27.150.191",
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 15000
    },
    options: {
      encrypt: true, // for azure
      trustServerCertificate: true // change to true for local dev / self-signed certs
    }
  }

const a = async () => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(sqlConfig)
        const result = await sql.query`select * from quizs where id = 1`
        console.dir(result)
    } catch (err) {
        // ... error checks
        console.error(err)
    }
}

function main () {
    a(function(data) {
        console.log(data)
    });
}

main();
