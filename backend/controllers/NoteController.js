const Note = require("../models/Note"); // importing note Schema

// Handling the GET /notes Request : sends only logged-in user's notes
const getNotes = async (req, res) => {

    try {

        const notes = await Note.find({
            user: req.user.userId
        });

        res.json({
            message: "Notes Fetched Successfully",
            data: notes
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

// Handling the POST /notes request : create notes for logged-in user

const createNote = async (req, res) => {

    try {

        const note = new Note({
            title: req.body.title,
            user: req.user.userId
        });

        const savedNote = await note.save();

        res.json({
            message: "Note Added Successfully",
            data: savedNote
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

// Handling the PUT /notes request : update only logged-in user's note

const updateNote = async (req, res) => {

    try {

        const updatedNote = await Note.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.userId
            },
            {
                title: req.body.title
            },
            {
                new: true
            }
        );

        res.json({
            message: "Note updated Successfully",
            data: updatedNote
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

// Handling the DELETE /notes request : delete only logged-in user's note

const deleteNote = async (req, res) => {

    try {

        await Note.findOneAndDelete({
            _id: req.params.id,
            user: req.user.userId
        });

        res.json({
            message: "Note deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getNotes,
    createNote,
    updateNote,
    deleteNote
};