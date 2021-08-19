'use strict';

module.exports = (cb, perpage) => {
  perpage = perpage || 10;
  return (req, res, next) => {
    // Example 1: req.params.page = 2
    // parseInt get integer on number
    // make first page is 1
    // Max = 2
    // Result: page = 1
    //
    // Example 2: req.params.page = 1
    // parseInt get integer on number
    // make first page is 1
    // Max = 1
    // Result: page = 0
    let page = Math.max(
      parseInt(req.params.page || '1', 10),
      1
    ) - 1;
    cb((err, total) => {
      if (err) return next(err);
      debugger;
      req.page = res.locals.page = {
        number: page,
        perpage: perpage,
        from: page * perpage,
        to: page * perpage + perpage - 1,
        total: total,
        count: Math.ceil(total / perpage)
      };
      next();
    });
  };
};

