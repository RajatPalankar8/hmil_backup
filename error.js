exports.errorHandler = (err, req, res, next) => {
    console.log('API ERROR', err);
    let error = { ...err };
    error.message = err.message;

    //Log to console
    // console.log(error.stack);

    //MondoDB Bad Object
    if (err.name === 'CastError') {
        const message = `Invalid ${err.path}: ${err.value}`;
        error = new Error(message);
    }

    //Mongoose Duplicate Key
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue).join(' or ');
        const message = `${field} already exists.`;
        error = new Error(message);
    }

    //Mongoose Validation Error
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(el => el.message);

        const message = `Invalid input data. ${errors.join('. ')}`;
        error = new Error(message);
    }

    res.status(err.status || 200).json({
        success: false,
        message: error.message || 'Server Error'
    });
}