const express = require("express");

const router = express.Router();
const { productListController } = require("../Controller/getDataController");




router.get("/productList/:pageno/:perpage/:searchkeyword", productListController);



module.exports = router;