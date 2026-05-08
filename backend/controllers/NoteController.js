const Note = require("../models/Note"); // importing note Schema

// Handling the GET /notes Request : sends the notes to frontend as json format
const getNotes = async (req, res) => {

    try {

        const notes = await Note.find();

       res.json({
            message:"Notes Fetched Successfully",
            data: notes
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

// Handling the POST /notes request : create notes on server / add notes in DB

const createNote = async (req, res) => {

    try {

        const note = new Note({
            title: req.body.title
        });

        const savedNote = await note.save();

        res.json({
            message:"Note Added Successfully",
            data: savedNote
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

// Handling the Put /notes request : updates notes on server / updates notes in DB
const updateNote = async (req, res) => {

    try {

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title
            },
            {
                new: true
            }
        );

        res.json({
            message:"Note updated Successfully",
            data: updatedNote
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

//// Handling the DELETE /notes request : deletes notes in DB
const deleteNote = async (req, res) => {

    try {

        await Note.findByIdAndDelete(req.params.id);

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