const globalErrorHandler = (err, req, res, next) => {

    res.status(err.statusCode || 500).json({
      status: 'error',
      message: err.message || 'Internal Server Error'
    })
  }
  
export default globalErrorHandler