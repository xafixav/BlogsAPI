const error = (e, _req, res, _next) => {
  const Error = e.status || 500;
  const ErrorMessage = e.message || 'Internal Server Error'; 
  console.log(
    `
    
    
    
    ${ErrorMessage}




  `,
);

  return res.status(Error).json({ message: ErrorMessage });
};

module.exports = error;