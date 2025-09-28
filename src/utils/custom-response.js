const CustomResponse = {
  success: (statusCode, message, data) => {
    return {
      statusCode,
      message,
      data,
    };
  },

  error: (statusCode, message, error) => {
    return {
      statusCode,
      message,
      error,
    };
  },
};

module.exports = CustomResponse;
