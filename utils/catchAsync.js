/**
 * Function used to handle async errors
 * @function
 * @param {function} callback - route callback
 * @return  {function} callback function
 */
module.exports = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
