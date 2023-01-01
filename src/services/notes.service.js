import notes from '../models/notes.model';

//get all notes
export const getAllNotes = async () => {
  const data = await notes.find();
  return data;
};

//create new note
export const newNotes = async (body) => {
  const data = await notes.create(body);
  return data;
};

//update single note
export const updateNotes = async (_id, body) => {
  const data = await notes.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete single user
export const deleteNotes = async (id) => {
  await notes.findByIdAndDelete(id);
  return '';
};

//get single user
export const getNotes = async (id) => {
  const data = await notes.findById(id);
  return data;
};
