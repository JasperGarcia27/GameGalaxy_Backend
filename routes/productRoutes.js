// [SECTION] Dependecies and Modules
const express = require("express");
const productController = require("../controllers/productController")
const auth = require("../auth")
const {verify, verifyAdmin} = auth;

const router = express.Router();


router.post("/", verify, verifyAdmin, productController.addProduct)

router.get("/allProducts", productController.getAllProducts)

// All Active Products
router.get("/allActiveProducts", productController.getAllActive)
router.get("/allActiveProducts0To50k", productController.getAllActive0To50k)
router.get("/allActiveProducts50kTo100k", productController.getAllActive50kTo100k)
router.get("/allActiveProducts100kTo150k", productController.getAllActive100kTo150k)
router.get("/allActiveProducts150kAndAbove", productController.getAllActive150kAndAbove)

// All Active Desktop Products
router.get("/allDesktop", productController.getAllDesktop)
router.get("/allDesktop0To50k", productController.getAllDesktop0To50k)
router.get("/allDesktop50kTo100k", productController.getAllDesktop50kTo100k)
router.get("/allDesktop100kTo150k", productController.getAllDesktop100kTo150k)
router.get("/allDesktop150kAndAbove", productController.getAllDesktop150kAndAbove)

// All Active Laptop Products
router.get("/allLaptop", productController.getAllLaptop)
router.get("/allLaptop0To50k", productController.getAllLaptop0To50k)
router.get("/allLaptop50kTo100k", productController.getAllLaptop50kTo100k)
router.get("/allLaptop100kTo150k", productController.getAllLaptop100kTo150k)
router.get("/allLaptop150kAndAbove", productController.getAllLaptop150kAndAbove)

// All Active Console Products
router.get("/allConsole", productController.getAllConsole)
router.get("/allConsole0To50k", productController.getAllConsole0To50k)
router.get("/allConsole50kTo100k", productController.getAllConsole50kTo100k)
router.get("/allConsole100kTo150k", productController.getAllConsole100kTo150k)
router.get("/allConsole150kAndAbove", productController.getAllConsole150kAndAbove)

// All Active Accessories Products
router.get("/allAccessories", productController.getAllAccessories)
router.get("/allAccessories0To50k", productController.getAllAccessories0To50k)
router.get("/allAccessories50kTo100k", productController.getAllAccessories50kTo100k)
router.get("/allAccessories100kTo150k", productController.getAllAccessories100kTo150k)
router.get("/allAccessories150kAndAbove", productController.getAllAccessories150kAndAbove)

router.get("/:productId", productController.getProduct)

router.put("/:productId", verify, verifyAdmin, productController.updateProduct)

router.put("/:productId/archive", verify, verifyAdmin, productController.archiveProduct)

router.put("/:productId/activate", verify, verifyAdmin, productController.activateProduct)

router.post('/searchByName', productController.searchProductsByName);





module.exports = router









