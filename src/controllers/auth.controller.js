import { registerUser, loginUser } from "../services/auth.service.js";

export const register =
async (req, res, next) => {

  try {

    const user = await registerUser(req.body);

    res.status(201).json(user);

  } catch (error) {

    next(error);

  }

};

export const login = async (req, res, next) => {
  try {

    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.status(200).json(result);
    next

  } catch (error) {
    throw next(error);
  }

};