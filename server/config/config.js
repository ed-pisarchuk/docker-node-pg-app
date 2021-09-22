module.exports = {
    username: "postgres",
    password: 'docker',
    database: 'nav_test',
    host: 'db',
    port: 5432,
    dialect: "postgres",
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true
    },
    logging:true
}
