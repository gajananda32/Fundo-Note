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

//archive note
export const archivenote=async(_id)=>{
  const data =await notes.findByIdAndUpdate(
    {
      _id:_id
    },
    { isArchived:true },
    {new: true}
  );
  return data;
};

//unarchive note 
export const unarchivenote= async(_id)=>{
  const data=await notes.findByIdAndUpdate(
    {_id:_id },
    {isArchived:false},
    {new :false}
    );
    return data;
}

//trash note 
export const trashnote=async(_id)=>{
  const data=await notes.findByIdAndUpdate(
    { 
      _id
    },
    { isTrashed:true},
    { new:true}
  );
  return data;
}

//untrash note 
export const untrashnote= async(_id)=>{
  const data=await notes.findByIdAndUpdate(
    {_id:_id },
    {isTrashed:false},
    {new :false}
    );
    return data;
}


//export const archivenote=async(_id)=>{
//  const note =await notes.findOne({_id:_id});
// const isArchived=note.isArchived == false | true
// const data =await notes.findByIdAndUpdate(
//   {
//     _id:_id
//   },
//   { isArchived:isArchived},
//   {new:true}
// )
//}