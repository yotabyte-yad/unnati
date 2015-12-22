module.exports = function(sequelize, DataTypes) {

	return sequelize.define('sales_details', {
		sales_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		},		
		sales_item_master_id: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		sales_item_uom: {
			type: DataTypes.STRING,
			allowNull: true
		},
		sales_item_batch: {
			type: DataTypes.STRING,
			allowNull: true
		},
		sales_item_exp: {
			type: DataTypes.DATE,
			allowNull: true
		},
		sales_tax_per: {
			type: DataTypes.DECIMAL(6, 2),
			allowNull: true
		},
		sales_tax_amt: {
			type: DataTypes.DECIMAL(15, 2),
			allowNull: true
		},
		sales_item_purchase_qty: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		sales_item_current_stock: {
			type: DataTypes.INTEGER,
			allowNull: true
		}
	});

};


// ,
// 		sales_item_comments: {
// 			type: DataTypes.STRING,
// 			allowNull: true
// 		}

		// sales_item_location: {
		// 	type: DataTypes.STRING,
		// 	allowNull: true
		// },
		// sales_item_package_unit: {
		// 	type: DataTypes.STRING,
		// 	allowNull: true
		// },
		// sales_item_costprice: {
		// 	type: DataTypes.DECIMAL(15, 2),
		// 	allowNull: true
		// },