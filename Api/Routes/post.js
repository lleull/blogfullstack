import express from "express";
import { getpost, getsinglepost, addpost,deletepost,updatepost } from "../Controller/post.js";
const router = express.Router()

router.get('/',  getpost)
router.get('/:id', getsinglepost)
router.post('/', addpost )
router.delete('/:id',  deletepost)
router.put('/:id', updatepost)


export default router