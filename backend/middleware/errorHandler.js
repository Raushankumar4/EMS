// const ErrorHanlder = (hanlder) => {
//   return async (req, res, next) => {
//     try {
//       await hanlder(req, res, next);
//     } catch (error) {
//       next(res.status(500).json({ message: error.message }));
//     }
//   };
// };

// module.exports = ErrorHanlder;

const ErrorHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = ErrorHandler;
