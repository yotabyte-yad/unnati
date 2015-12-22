module.exports = function(sequelize, DataTypes) {

	return sequelize.define('items', {
		item_barcode: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		item_name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		item_mfg: {
			type: DataTypes.STRING,
			allowNull: true
		},
		item_uom: {
			type: DataTypes.STRING,
			allowNull: true
		},
		item_description: {
			type: DataTypes.STRING,
			allowNull: true
		},
		item_current_stock: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		item_reorder_level: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		item_reorder_qty: {
			type: DataTypes.INTEGER,
			allowNull: true
		},		
		item_costprice: {
			type: DataTypes.DECIMAL(15, 2),
			allowNull: true
		},
		item_salesprice: {
			type: DataTypes.DECIMAL(15, 2),
			allowNull: true
		},
		item_tax_per: {
			type: DataTypes.DECIMAL(6, 2),
			allowNull: true
		},
		active: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}
	});

};