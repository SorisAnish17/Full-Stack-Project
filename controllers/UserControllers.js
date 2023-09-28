import User from "../models/Users.js";
export const createUser = (req, res) => {
  new User(req.body)
    .save()
    .then((user) =>
      res
        .status(200)
        .json({ success: true, message: "successfully added", data: user })
    )
    .catch((err) =>
      res.status(400).json({ success: false, message: "failure to add data" })
    );
};

export const allUser = (req, res) => {
  User.find({})
    .then((user) =>
      res.status(200).json({
        success: true,
        message: "successfully get all users",
        data: user,
      })
    )
    .catch((err) =>
      res
        .status(400)
        .json({ success: false, message: "failure to get all data" })
    );
};

export const getUser = (req, res) => {
  let { id } = req.params;
  User.findById(id)
    .then((user) =>
      res.status(200).json({ success: true, message: "success", data: user })
    )
    .catch((error) =>
      res
        .status(400)
        .json({ success: false, message: "user not found", data: [] })
    );
};

export const updateUser = (req, res) => {
  let { id } = req.params;
  let { firstName, lastName, email, password, mobileNumber, profilePicture } =
    req.body;
  User.findByIdAndUpdate(id, {
    firstName,
    lastName,
    email,
    password,
    mobileNumber,
    profilePicture,
  })
    .then((user) => res.status(200).json({ success: true, data: user }))
    .catch((error) => res.status(400).json({ success: false, data: [] }));
};

export const deleteUser = (req, res) => {
  let { id } = req.params;
  User.findByIdAndDelete(id)
    .then((user) => res.status(200).json({ success: true, data: user }))
    .catch((error) => res.status(400).json({ success: false, data: [] }));
};
