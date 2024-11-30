const express = require('express');
const app = express();
const cors = require("cors");
// const dotEnv = require("dotenv")

// dotEnv.config()

// const PORT = process.env.PORT || 4000;
// const HOST = process.env.HOST || "10.10.92.143"
app.use(express.json());
app.use(cors());

const db = require("./models");

const swaggerjsdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");
const postmanToOpenApi = require("postman-to-openapi");

const swaggerJson = require('./openapi.json');



app.use('/api-docs', swaggerui.serve, swaggerui.setup(swaggerJson));

app.get('/swagger-json', (req,res)=> {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerJson);
});

app.get('/generate-yml', async(req,res)=> {
    const postmanCollection = 'collection.json'

    const outputFile = 'collection.yml'

    try{
        const result = await postmanToOpenApi(postmanCollection, outputFile, {
            defaultTag: 'General'
        })

        const result2 = await postmanToOpenApi(postmanCollection, null, {
            defaultTag: 'General'
        })
        console.log('OpenAPI specs: ${result}')

    }catch(err){
        console.log(err)
    }
})

// Routers
const routes = require("./routes/index.routes");
app.use("/", routes);

try{

    db.Users.belongsTo(db.Roles, { as: "roles", foreignKey: "roleId"});
    db.Roles.hasMany(db.Users, {as: "users", foreignKey: "roleId"});

    db.Books.belongsToMany(db.Users, {through: "UserRatings", foreignKey: "bookId", onDelete: "cascade"});
    db.Users.belongsToMany(db.Books, {through: "UserRatings", foreignKey: "userId", onDelete: "cascade"});

    db.Users.hasMany(db.UserRatings, { foreignKey: 'userId', onDelete: 'cascade' });
    db.UserRatings.belongsTo(db.Users, { foreignKey: 'userId', onDelete: 'cascade' });

} catch (error) {
    console.log(error);
}

db.sequelize.sync({ alter: true }).then(() => {
    app.listen(3000, () => {
        console.log("SERVER RUNNING ON PORT 3000");
    });

    // app.listen(PORT,HOST,() => console.log(`Server running on ${HOST} at ${PORT}`));
})