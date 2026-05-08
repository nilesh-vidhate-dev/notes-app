const express = require("express");
const authMiddleware = require("../middleware/AuthMiddleware");

const {
    getNotes,
    createNote,
    updateNote,
    deleteNote
} = require("../controllers/NoteController");

const router = express.Router();

router.get("/", authMiddleware, getNotes);

router.post("/", authMiddleware, createNote);

router.put("/:id", authMiddleware, updateNote);

router.delete("/:id", authMiddleware, deleteNote);

module.exports = router;