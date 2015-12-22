module.exports = function(sequelize, DataTypes) {

	return sequelize.define('item_taxes', {
		pur_sales_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		item_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		tax_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		flag: {
			type: DataTypes.STRING,
			allowNull: false
		},
		active: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		}
	});

};