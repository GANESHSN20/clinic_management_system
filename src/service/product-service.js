const ProductDAO = require("../dao/product-dao");
const ProductService = {
	create: (payload) => {
		return new Promise((resolve, reject) => {
			ProductDAO.create(payload)
				.then((result) => {
					resolve(result);
				})
				.catch((error) => {
					reject(result);
				});
		});
	},
};

module.exports = ProductService;
