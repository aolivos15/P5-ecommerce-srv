import jwt from 'jsonwebtoken';

export const authRequire = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    const decoded = jwt.verify(authorization, process.env.SECRET_KEY);
    const currentTime = (new Date()/1000);

    if (currentTime > decoded.exp) {
      return res.status(401).json({message: 'Tu token ha expirado :('});
    }

    req.data = decoded.data;

  } catch (error) {
    return res.status(401).json(error);
  }

  next();
}