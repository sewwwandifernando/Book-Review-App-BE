module.exports = (sequelize, DataTypes) => {
    const UserRoles = sequelize.define("Roles", {
        role: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    }
    
    );

    return UserRoles
}