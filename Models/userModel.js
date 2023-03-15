// //user model
// module.exports = (sequelize, DataTypes) => {
//     const User = sequelize.define( "user", {
//         userName: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         email_user: {
//             type: DataTypes.STRING,
//             unique: true,
//             isEmail: true, //checks for email format
//             allowNull: false
//         },
//         password: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//     }, {timestamps: false}, )
//     return User
//  }