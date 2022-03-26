const StoreModel = require('../models/StoreModel');
const apiResponse = require('../helpers/apiResponse')

const getStoreID = async (req,res,next)=>{
    try {
        let userID = req.user._id;

        let store = await StoreModel.findOne({
            userID:userID
        }).lean();

        if(store){
            req.store = {
                _id:store._id
            }
            return next();
        }else{
            return apiResponse.notFoundResponse(res,'Not found store')
        }

    } catch (error) {
        return apiResponse.ErrorResponse(res, error);
    }
}

module.exports = getStoreID;

