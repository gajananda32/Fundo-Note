import HttpStatus from 'http-status-codes';
import * as notesService from '../services/notes.service';

/**
 * Controller to get all users available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllNotes = async (req, res, next) => {
  try {
    const data = await notesService.getAllNotes();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All notes fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get a single user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getNotes = async (req, res, next) => {
  try {
    const data = await notesService.getNotes(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Notes fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newNotes = async (req, res, next) => {
  try {
    const data = await notesService.newNotes(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Notes created successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to update a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateNotes = async (req, res, next) => {
  try {
    const data = await notesService.updateNotes(req.params._id, req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Notes updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to delete a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deleteNotes = async (req, res, next) => {
  try {
    await notesService.deleteNotes(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: [],
      message: 'Notes deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};


//archive note
export const archivenote= async(req,res,next)=>{
  try {
    const data=await notesService.archivenote(req.params._id);
    res.status(HttpStatus.ACCEPTED).json({
      code:HttpStatus.ACCEPTED,
      data:data,
      message:'note archived successfully'
    });    
  } catch (error) {
    next(error);
  }
}

//unarchive note
export const unarchivenote= async(req,res,next)=>{
  try {
    const data=await notesService.unarchivenote(req.params._id);
    res.status(HttpStatus.ACCEPTED).json({
      code:HttpStatus.ACCEPTED,
      data:data,
      message:'note unarchived successfully'
    });    
  } catch (error) {
    next(error);
  }
}


// trash note
export const trashnote=async(req,res,next)=>{
  try {
    const data=await notesService.trashnote(req.params._id);
    res.status(HttpStatus.ACCEPTED).json({
      code:HttpStatus.ACCEPTED,
      data:data,
      message:'Note trashed successfully'
    });    
  } catch (error) {
    next(error);    
  }
}

// untrash note
export const untrashnote=async(req,res,next)=>{
  try {
    const data=await notesService.untrashnote(req.params._id);
    res.status(HttpStatus.ACCEPTED).json({
      code:HttpStatus.ACCEPTED,
      data:data,
      message:'Note untrashed successfully'
    });    
  } catch (error) {
    next(error);    
  }
}