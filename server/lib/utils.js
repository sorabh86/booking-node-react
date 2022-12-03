export const newError = (status, msg) => {
    const err = new Error();
    err.status = status
    err.message = msg
    return err
}

export const handleError = (err, req, res, next) => {
    console.log("ServerError: "+err);
    // 400 Bad Request
    // 500 Internal Server Error
    const errcode = err.status || 500;
    return res.status(errcode).json({
        success:false,
        status:errcode,
        message:err.message || "Something went wrong",
        stack:err.stack 
    })
} 