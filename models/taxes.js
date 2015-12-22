module.exports = function(sequelize, DataTypes) {

	return sequelize.define('taxes', {
		tax_desc: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1, 250]
			}
		},
		tax_per: {
			type: DataTypes.DECIMAL(5,2),
			allowNull: false
		},
		tax_active: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		}
	});

};