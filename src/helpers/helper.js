class Helper {
  successMessage(res, data = null) {
    res.status(200).json({
      status: "success",
      response: data ? data : "Request process successfully",
    });
  }

  errorMessage(res, error = null) {
    res.status(422).json({
      status: "fail",
      errorResponse: {
        error: error ? error : "Something went wrong",
      },
    });
  }
  
  getAuthErrorMessage(res, data = null) {
    return res.status(401).json({
      status: "fail",
      response: "Unauthorized",
    });
  }
}

module.exports = new Helper();
