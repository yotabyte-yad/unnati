module.exports = function(sequelize, DataTypes) {

	return sequelize.define('purchases', {
		date: {
			type: DataTypes.DATE,
			allowNull: false
		},
		supplier_id: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		supplier_invoice_ref: {
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