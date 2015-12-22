module.exports = function(sequelize, DataTypes) {

	return sequelize.define('purchase_details', {
		purchase_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		},		
		purchase_item_master_id: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		purchase_item_uom: {
			type: DataTypes.STRING,
			allowNull: true
		},
		purchase_item_location: {
			type: DataTypes.STRING,
			allowNull: true
		},
		purchase_item_package_unit: {
			type: DataTypes.STRING,
			allowNull: true
		},
		purchase_item_costprice: {
			type: DataTypes.DECIMAL(15, 2),
			allowNull: true
		},
		purchase_item_batch: {
			type: DataTypes.STRING,
			allowNull: true
		},
		purchase_item_exp: {
			type: DataTypes.DATE,
			allowNull: true
		},
		purchase_tax_per: {
			type: DataTypes.DECIMAL(6, 2),
			allowNull: true
		},
		purchase_tax_amt: {
			type: DataTypes.DECIMAL(15, 2),
			allowNull: true
		},
		purchase_item_purchase_qty: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		purchase_item_current_stock: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		purchase_item_comments: {
			type: DataTypes.STRING,
			allowNull: true
		}

	});

};