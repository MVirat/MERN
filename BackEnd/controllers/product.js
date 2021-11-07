const Product = require("../models/product");
const formidable = require('formidable');
const _ = require("lodash")
const fs = require("fs");
const { sortBy, update } = require("lodash");

exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
      .populate("category")
      .exec((err, product) => {
        if (err) {
          return res.status(400).json({
            error: "Product not found"
          });
        }
        req.product = product;
        next();
      });
  };

exports.createProduct = (req,res) => {
    let form = formidable({ multiples: true });
    form.keepExtensions = true ;

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error : "Problem with Image"
            })
           }
        //    desturcture the feils
           const {name,price,description,category,stock} = fields;

           if (
               !name ||
               !description ||
               !price ||
               !category ||
               !stock
           ){
                return  res.status(400).json({
                    error: "Please include all feilds"
                })
           }

        //    TODO restiction fields

           const product = new Product(fields);

        //    handel file here
        if(files.photo){
            if(files.photo.size > 3000000){
                return res.status(400).json({
                    error: "File Size too Big!"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }
        // save to the DB

                 product.save((err,product)=>{
                 if(err){
                 return res.status(400).json({
                error : "Cannot Save Product"
                    })
                 }
                    res.json({product})
            })
        });
    };

exports.getProduct =(req,res) => {
    req.product.photo = undefined;
    return res.json(req.product);
    
}
// middleware
exports.photo = (req, res , next) => {
    if(req.product.photo.data){
        res.set("Content-Type", req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next();
}


exports.deleteProduct =( req, res) => {
        let product = req.product;
        product.remove((err, deletedProduct) => {
            if(err){
                return res.status(400).json({
                    error : "Failed to delete the product"
                });
            }
            res.json({
                message: "Deletion Compleated"
            })
        })
    }



exports.updateProduct =( req, res) => {
    let form = formidable({ multiples: true });
    form.keepExtensions = true ;

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error : "Problem with Image"
            })
        }
         

        //    Updation Code

           let product = req.product;
           product = _.extend(product ,fields)

        //    handel file here
        if(files.photo){
            if(files.photo.size > 3000000){
                return res.status(400).json({
                    error: "File Size too Big!"
                })
            }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type
        }
        // save to the DB

                 product.save((err,product)=>{
                 if(err){
                 return res.status(400).json({
                error : "Updation of Product Failed"
                    })
                 }
                    res.json({product})
            })
        });
}


// product listing

exports.getAllProducts =(req,res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id" ;


    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy,"asc"]])
    .limit(limit)
    .exec((err,products)=>{
        if(err){
            return res.status(400).json({
                error : "No Product Found"
            })
        }
        res.json(products)
    })
}

exports.getAllUniqueCategories = (req,res) => {
    Product.distinct('category',{},(err,category)=>{
        if(err){
            return res.status(400).json({
                error : "No Category found"
            })
        }
        res.jason (category);
    })
}


exports.updateStock =(req,res, next) => {
    let myOperation = req.body.order.products.map(prod => {
        return{
            updateOne: {
                filter: {_id : prod._id},
                update: {$inc: {stock:-prod.count, sold: +prod.count}}
            }
        }
    })

    Product.bulkWrite(myOperation,{},(err,products)=>{
        if(err){
            return res.status(400).json({
                error: "BULK Operation failed"
            })
        }
        next()
    })

}