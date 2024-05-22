const express = require("express");
const {
  handleGetAllUsers,
  handleCreateNewUser,
  handleGetSingleUser,
  handleUpdateSingleUser,
  handleDeleteSingleUser,
} = require("../controllers/user");

const router = express.Router();

router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);

// as "/api/users/:id" route is comman for these request we used .route() method
router
  .route("/:id")
  .get(handleGetSingleUser)
  .patch(handleUpdateSingleUser)
  .delete(handleDeleteSingleUser);

module.exports = router;
