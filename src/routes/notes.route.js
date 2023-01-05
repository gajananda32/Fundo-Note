import express from 'express';
import * as notesController from '../controllers/notes.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all notes
router.get('', notesController.getAllNotes);

//route to create a new note
router.post('/add', userAuth, notesController.newNotes);

//route to get note for given id
router.get('/:_id',userAuth, notesController.getNotes);

//route to update notes
router.put('/:_id',userAuth, notesController.updateNotes);

//route to delete note
router.delete('/:_id',userAuth, notesController.deleteNotes);  

//route to archive note
router.put('/:_id/archive',userAuth, notesController.archivenote);

//route to trash a note
router.put('/:_id/trash',userAuth, notesController.trashnote);

//route to unarchive note
router.put('/:_id/unarchive',userAuth, notesController.unarchivenote);

//route to untrash a note
router.put('/:_id/untrash',userAuth, notesController.untrashnote);


export default router;