

const createQuery = async (req, res, next) => {
    try {
      let { query } = req;
      let { limit, page } = query;
      let { sort } = query;
      let { order } = query;
      let { filters } = query;
      let { fields } = query;
      if(fields){
        const fieldsArray = fields.split(',');
        fieldsArray.forEach((field) => {
          if (field.includes('.')) {
            const fieldArray = field.split('.');
            if (fieldArray.length > 2) {
              throw new APIError('Invalid field', 400);
            }
          }
        });
      }
      if(filters){
        const filterArray = filters.split(',');
        filters={};
        filterArray.forEach((field) => {
          if (field.includes(':')) {
            const fieldArray = field.split(':');
            if (fieldArray.length > 3) {
              throw new APIError('Invalid field', 400);
            }
            if(fieldArray.length === 2){
                if(fieldArray[0].includes('.')){
                    filters["$"+fieldArray[0]+"$"] = fieldArray[1];
                }
                else{
                    filters[fieldArray[0]] = fieldArray[1];
                }   
            }
          }
          else{
            throw new APIError('Invalid syntax for fields', 400);
        }
        });
      }
      const queryBuilder = {
        limit: limit || 20,
        sort: sort || '',
        order: order || '',
        filters: filters || {},
        fields: fields || '',
      };
      req.queryBuilder = queryBuilder;
      next();
    } catch (error) {
      console.error(error);
      throw new APIError(error, 400);
    }
  };

  module.exports = createQuery;