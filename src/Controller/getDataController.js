const BussinessData = require("../Model/bussinessDataModel");



const productListController = async (req, res) => {
    try {
      let pageno=Number(req.params.pageno);
      let perpage=Number(req.params.perpage)
      let searchValue=req.params.searchkeyword;

      let skipPage=(pageno-1)*perpage;
      let resData;

      if(searchValue!==0){
        let searchRegex={
          "$regex":searchValue,"$options":"i"
        }
        let searchQuery={$or:[
          {title:searchRegex},
          {price:searchRegex},
          {special_price:searchRegex},
          {category:searchRegex},
          {subcategory:searchRegex},
          {remark:searchRegex},
          {brand:searchRegex},
          {shop:searchRegex},
          {shop_name:searchRegex},
          {product_code:searchRegex},
          {stock:searchRegex},
        ]}
         resData= await BussinessData.aggregate([
          {
            $facet:{
              total:[{$match:searchQuery},{$count:"count"}],
              rows:[{$match:searchQuery},{$skip:skipPage},{$limit:perpage}]
            }
          }
        ]);
      }
      else {
         resData= await BussinessData.aggregate([
          {
            $facet:{
              total:[{$count:"count"}],
              rows:[{$skip:skipPage},{$limit:perpage}]
            }
          }
        ]);
      }
      res.status(200).json({
        status:"success",
        data:resData
      })
      
    
    } catch (error) {
      res.status(500).json({
        error: "Internal server error",
      });
    }
  };

  module.exports = { productListController };