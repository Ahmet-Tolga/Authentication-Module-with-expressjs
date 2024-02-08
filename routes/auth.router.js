const {Router}=require("express");
const authController=require("../controller/auth.controller");
const router=Router();

router.get("/signin",authController.get_signin);
router.get("/signup",authController.get_signup);
router.post("/signin",authController.post_signin);
router.post("/signup",authController.post_signup);
router.post("/logout",authController.logout);

module.exports=router;