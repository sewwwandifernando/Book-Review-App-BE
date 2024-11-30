module.exports = (sequelize, DataTypes) => {
    const Beds = sequelize.define("Books", {
        bookTitle: {
            type: DataTypes.STRING,
            allowNull: false
        },
        autherName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bookDiscription: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        imageURL: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bookPDFURL: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
      
    }
    );

    return Beds;
}