module.exports = {
    username: "postgres",
    password: 'docker',
    database: 'nav_test',
    host: 'localhost' || 'db',
    port: 5435 || 5432,
    dialect: "postgres",
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true
    },
    logging: (process.env.SQL_DEBUG === 'true' ? console.log : false)
}
