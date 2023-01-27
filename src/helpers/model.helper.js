const {
    Types
} = require('mongoose');

const mongoose = require('mongoose');


class ModelHelper {
    checkIdInModel({
        model,
        user,
        field,
        customQuery
    }) {
        const availableModels = [
            'Friend',
            'Blog',
            'User',
            'Comment'
        ];

        if (!availableModels.includes(model)) {
            throw new Error('Model not found');
        }

        return async (value, { req }) => {
            const ModelName = mongoose.model(model);

            let query = {
                _id: value
            }

            if (user) {
                query.user = req.user._id
            }

            const data = await ModelName.findById(query)
            if (!data) {
                throw new Error(`${model} id not found`);
            }
            req[model] = data;
            return true;
        }


    }
}

module.exports = new ModelHelper();