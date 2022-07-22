
const Product = require("../models/Product");
const cloudinary = require("../middleware/clodinary");
const upload = require("../middleware/multer");
const {
    verifyToken ,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
}= require("./verifyToken")
  
const router = require("express").Router();

//CREATE PRODUCTS


router.post("/", upload.single("image"),  verifyTokenAndAdmin, async(req, res) => {
    try{
        const result = await cloudinary.uploader.upload(req.file.path);
        let product = new Product({
            name: req.body.name,
            title: req.body.title,
            categories: req.body.categories,
            size: req.body.size,
            color: req.body.color,
            price: req.body.price,
        });
        res.json(product)
    }catch(err){
        console.log(err);
    }
})




// //UPDATED_PRODUCTS

router.put("/:id", verifyTokenAndAdmin,async (req, res) => {
    try{
        const updatedProducts =  await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        },
            {
                new: true
            }, 
            );
            res.status(200).json(updatedUser)
    }catch(err) {
        res.status(500).json(err)
    }

});


// //DELETE USER
router.delete("/:id", verifyTokenAndAdmin, async(req, res)=> {
    try{
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User has been deleted...."})
    }catch(err) {
        res.status(500).json(err)
    }
})

// //GET PRODUCTS

router.get("/find/:id",  async(req, res)=> {
    try{
        const product=  await Product.findById(req.params.id);
        res.status(200).json(product)
    }catch(err) {
        res.status(500).json(err)
    }
})

// //GET ALL PRODUCTS
router.get("/",  async(req, res)=> {
    const Newquery = req.query.new;
    const NewCategory = req.query.category;
    try{
    
        let products; 


        if(Newquery){
            products = await Product.find().sort({createdAt: -1}).limit(1);
        }else if(NewCategory ){
            products = await Product.find({categories:  {
                $in: [NewCategory],
            },
        });
        }else{
            products = await Product.find();
        }
        res.status(200).json(products)
    }catch(err) {
        res.status(500).json(err)
    }
});



module.exports = router