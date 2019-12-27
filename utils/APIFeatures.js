class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  /**
   * Function used to build query to filter customers
   * @function
   * @param {object} query - Collection query object
   * @param {object} queryStr - query object
   * @return  {Object} class
   */
  filter() {
    const qryObj = { ...this.queryStr };
    const excludedQry = ['page', 'sort', 'limit', 'fields'];
    excludedQry.forEach(el => delete qryObj[el]);

    // 2. Advanced Query Parameters
    let queryStr = JSON.stringify(qryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  /**
   * Function used to build query to sort customers
   * @function
   * @param {object} query - Collection query object
   * @param {object} queryStr - query object
   * @return  {Object} class
   */
  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query.sort('-createdAt');
    }

    return this;
  }

  /**
   * Function used to build query to limit fields customers
   * @function
   * @param {object} query - Collection query object
   * @param {object} queryStr - query object
   * @return  {Object} class
   */
  limitField() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  /**
   * Function used to build query for pagination on customers
   * @function
   * @param {object} query - Collection query object
   * @param {object} queryStr - query object
   * @return  {Object} class
   */
  pagination() {
    const page = this.queryStr.page * 1 || 1;
    const limit = this.queryStr.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
