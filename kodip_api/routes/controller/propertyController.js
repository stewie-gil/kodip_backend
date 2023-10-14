const  basemodel = require('../../models/basemodel');

class propertyController{
    async post(req, res){

        
const { propertyType, price, description, propertyName, location, amenities, contactInfo, imageUrls } = req.body;

const newProperty = new basemodel(
    {
        propertyType,
        price,
        amenities,
        contactInfo,
        imageUrls,
        description,
        propertyName,
        location,
    }
)
console.log(newProperty);

await newProperty.save();
res.json({message: 'saved Property:', newProperty})
    }


    async get(req, res){

        const property = await basemodel.find();
        res.json({message: 'items', property});

    }
}

module.exports = new propertyController();