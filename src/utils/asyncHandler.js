const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}
    




export {asyncHandler};


// const asyncHandler = () => {}
// const asyncHandler = (func) => () =>{} ek function ko dusre function me paas kar diya aur function ko as a prameter le liya ye high order function kahlata hai
// const asyncHandler = (func) => async () =>{} 

// const asyncHandler = (fn) => async(req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch(error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }