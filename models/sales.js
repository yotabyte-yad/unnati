module.exports = function(sequelize, DataTypes) {

	return sequelize.define('sales2', {
		date: {
			type: DataTypes.DATE,
			allowNull: false
		},
		buyer: {
			type: DataTypes.STRING,
			allowNull: true
		},
		doctor: {
			type: DataTypes.STRING,
			allowNull: true
		},
		discount_per: {
			type: DataTypes.DECIMAL(6, 2),
			allowNull: true
		},
		discount_amt: {
			type: DataTypes.DECIMAL(15, 2),
			allowNull: true
		},
		tax_per: {
			type: DataTypes.DECIMAL(6, 2),
			allowNull: true
		},
		tax_amt: {
			type: DataTypes.DECIMAL(15, 2),
			allowNull: true
		},
		gross_amount: {
			type: DataTypes.DECIMAL(6, 2),
			allowNull: true
		},
		net_amount: {
			type: DataTypes.DECIMAL(6, 2),
			allowNull: true
		}
	}); 
};