const router = require('express').Router()
const {productModel} = require('../../../models')

router.get('/',(req,res)=>{
    res.send('this is product model')
})


router.post('/add',async(req,res)=>{
    try {
        
        
    const product=await productModel.insertMany(req.body);
    res.status(200).json({message:'product successfully added'})
    } catch (error) {
        res.json({message:error.message})
    }
})


router.get('/get',async(req,res)=>{
    try {
        const data = await productModel.find({})
        res.json(data)
    } catch (error) {
        res.json({message:error.message})
    }
})


router.put('/update/:id',async(req,res)=>{
    try {
        const data = await productModel.findOneAndUpdate({_id:req.params.id},{
            SKU:req.body.SKU,
            category:req.body.category,
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            availableQty:req.body.availableQty
        },{new:true})
        res.status(200).json({message:'product successfully added'})
    } catch (error) {
        res.json({message:error.message})
    }
})


router.delete('/delete/:id',async(req,res)=>{
    try {
        const deleted = await productModel.deleteOne({_id:req.params.id})
          res.status(200).json({message:'product successfully deleted'})
    } catch (error) {
        res.json({message:error.message})
    }
})

module.exports = router