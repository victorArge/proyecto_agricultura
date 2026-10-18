export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: {
          message: 'Datos inválidos',
          details: result.error.issues.map((i) => ({ path: i.path, message: i.message })),
        },
      });
    }
    req.body = result.data;
    next();
  };
}
