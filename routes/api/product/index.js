const router = require("express").Router();
const { productModel } = require("../../../models");

router.get("/", (req, res) => {
  res.send("this is product model");
});

router.post("/add", async (req, res) => {
  try {
    const product = await productModel.insertMany(req.body);
    res.status(200).json({ message: "product successfully added" });
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.get("/get", async (req, res) => {
  try {
    const data = await productModel.find({});
    res.json(data);
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const data = await productModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        SKU: req.body.SKU,
        category: req.body.category,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        availableQty: req.body.availableQty,
      },
      { new: true }
    );
    res.status(200).json({ message: "product successfully added" });
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const deleted = await productModel.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "product successfully deleted" });
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.get("/filter", async (req, res) => {
  try {
    const user = await productModel.find(
      {},
      { name: 1, _id: 0, price: 1, SKU: 1 }
    );

    return res.json(user);
  } catch (error) {
    return res.json({ msg: error.message });
  }
});

router.get("/sort", async (req, res) => {
  try {
    const data = await productModel.find().sort({ price: 1 });
    return res.json(data);
  } catch (error) {
    return res.json({ msg: error.message });
  }
});

router.get("/aggregate/:category/:price1-:price2", async (req, res) => {
  try {
    
const max = req.params.price2;
const min = req.params.price1;

    const data = await productModel
      .aggregate([
        {
          "$match": 
            { price: { $gte: parseInt(min), $lte: parseInt(max) } },
        
          
        },
        {
            "$match":{category:req.params.category}
        }
      ])
      .sort({ price: 1 });

   

    return res.json(data);
  } catch (error) {
    return res.json({ msg: error.message });
  }
});

router.get("/:name", async (req, res) => {
  try {
    const user = await productModel.find({ name: { $regex: req.params.name } });

    return res.status(200).json(user);
  } catch (error) {
    return res.json({ msg: error.message });
  }
});

// router.get("/all/products",async(req,res)=>{
//     try {
//         const user=await Product.find({name:{$regex:"f"}}).populate.select("-__v -_id  -createdAt -updatedAt");
//         res.json("");
//     } catch (error) {
//          res.json(error);
//     }
//    ;
// });

module.exports = router;
