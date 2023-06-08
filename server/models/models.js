const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   email: { type: DataTypes.STRING, unique: true, },
   password: { type: DataTypes.STRING },
   role: { type: DataTypes.STRING, defaultValue: "USER" },

}
)
const Basket = sequelize.define('basket', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
}
)
const BasketPet = sequelize.define('basket_pet', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
}
)
const Pet = sequelize.define('pet', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   name: { type: DataTypes.STRING, unique: true, allowNull: false },
   price: { type: DataTypes.INTEGER, allowNull: false },
   rating: { type: DataTypes.INTEGER, defaultValue: 0 },
   img: { type: DataTypes.STRING, allowNull: false },

}
)
const Type = sequelize.define('type', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   name: { type: DataTypes.STRING, unique: true, allowNull: false },
}
)
const Brand = sequelize.define('brand', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   name: { type: DataTypes.STRING, unique: true, allowNull: false },
}
)
const Rating = sequelize.define('rating', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   rate: { type: DataTypes.INTEGER, allowNull: false },
}
)
const PetInfo = sequelize.define('pet_info', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   title: { type: DataTypes.STRING, unique: true, allowNull: false },
   descrtiption: { type: DataTypes.STRING, unique: true, allowNull: false },
}
)
const TypeBrand = sequelize.define('type_brand', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketPet)
BasketPet.belongsTo(Basket)

Type.hasMany(Pet)
Pet.belongsTo(Type)

Brand.hasMany(Pet)
Pet.belongsTo(Brand)

Pet.hasMany(Rating)
Rating.belongsTo(Pet)

Pet.hasMany(BasketPet)
BasketPet.belongsTo(Pet)

Pet.hasMany(PetInfo, { as: 'info' });
PetInfo.belongsTo(Pet)

Type.belongsToMany(Brand, { through: TypeBrand })
Brand.belongsToMany(Type, { through: TypeBrand })

module.exports = {
   User,
   Basket,
   BasketPet,
   Pet,
   Type,
   Brand,
   Rating,
   TypeBrand,
   PetInfo
}
