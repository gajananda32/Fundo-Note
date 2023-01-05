import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/index';

let token;
let noteid;
describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => { });
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });


  // 1 test case
  describe('UserRegistration', () => {
    const input = {
      "firstName": "Gajananda",
      "lastName": "Rathod",
      "email": "gajanandarathod32@gmail.com",
      "password": "gaja1234"
    }
    it('Given user details should be saved in database', (done) => {
      request(app)
        .post('/api/v1/users/register')
        .send(input)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
  });
  //2 test case for invalid details
  describe('UserRegistration for invalid details', () => {
    const input = {
      "firstName": "Gaja",
      "lastName": "R",
      "email": "gaj@gmail.com",
      "password": "1234"
    }
    it('Given user invalid details should thorw error', (done) => {
      request(app)
        .post('/api/v1/users/register')
        .send(input)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });
  //3 test case
  describe('UserRegistration', () => {
    const input = {
      firstName: "ga",
      lastName: "Ak",
      email: "gaja@gmail.com",
      password: "reeta1234"
    }
    it('Given user details should be saved in database', (done) => {
      request(app)
        .post('/api/v1/users/register')
        .send(input)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  //4 Test case for user login
  describe('Userlogin', () => {
    const input = {
      "email": "gajanandarathod32@gmail.com",
      "password": "gaja1234"
    }
    it('Given user login details should get logged into account', (done) => {
      request(app)
        .post('/api/v1/users/loginuser')
        .send(input)
        .end((err, res) => {
          token = res.body.data
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });

  // 5 for invalid email

  describe('Userlogin', () => {
    const input = {
      "email": "gajananda@gmail.com",
      "password": "gaja1234"
    }
    it('Given user login details should get error as invalid emailid', (done) => {
      request(app)
        .post('/api/v1/users/loginuser')
        .send(input)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  //6 for invalid password
  describe('Userlogin', () => {
    const input = {
      "email": "gajanandarathod32@gmail.com",
      "password": "gaja"
    }
    it('Given user login details should throw invalid password', (done) => {
      request(app)
        .post('/api/v1/users/loginuser')
        .send(input)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });
  // 7 create new note 
  describe('Addnote', () => {
    const input = {
      "Title": "BridgeLabz",
      "descrption": "skill devoloping company",
      "colour": "blue",
      "isArchived": "false",
      "isTrashed": "false"
    }
    it('Given new note should save in database', (done) => {
      request(app)
        .post('/api/v1/notes/add')
        .set('authorization', `Bearer ${token}`)
        .send(input)
        .end((err, res) => {
          noteid = res.body.data._id;
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
  });

  // 8 note without auth
  describe('Addnote', () => {
    const input = {
      "Title": "BridgeLabz",
      "descrption": "skill devoloping company",
      "colour": "blue",
      "isArchived": "false",
      "isTrashed": "false"
    }
    it('Given new note should thorw invalid auth', (done) => {
      request(app)
        .post('/api/v1/notes/add')
        .send(input)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);
          done();
        });
    });
  });

  //9 note for invalid Title
  describe('Addnote', () => {
    const input = {
      "Title": "",
      "descrption": "skill devoloping company",
      "colour": "blue",
      "isArchived": "false",
      "isTrashed": "false"
    }
    it('Given new note should thow invalid title', (done) => {
      request(app)
        .post('/api/v1/notes/add')
        .send(input)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);
          done();
        });
    });
  });

  //10 note for invalid colour
  describe('Addnote', () => {
    const input = {
      "Title": "BridgeLabz",
      "descrption": "skill devoloping company",
      "colour": "",
      "isArchived": "false",
      "isTrashed": "false"
    }
    it('Given new note should throe invalid colour', (done) => {
      request(app)
        .post('/api/v1/notes/add')
        .send(input)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);
          done();
        });
    });
  });

  // 11 delete note by id 
  describe('Delete note byid', () => {
    it('Given note by id  should delete note', (done) => {
      request(app)
        .delete(`/api/v1/notes/${noteid}`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });

  //12 update note
  describe('updateNote', () => {
    const input = {
      "Title": "BridgeLabz",
      "descrption": "skill devoloping company",
      "colour": "white",
    }
    it('Given new note should update colour', (done) => {
      request(app)
        .put(`/api/v1/notes/${noteid}`)
        .set('authorization', `Bearer ${token}`)
        .send(input)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(202);
          done();
        });
    });
  });

  //13
  describe('Addnote', () => {
    const input = {
      "Title": "BridgeLabz",
      "descrption": "",
      "colour": "blue",
      "isArchived": "false",
      "isTrashed": "false"
    }
    it('Given new note should throw invalid description', (done) => {
      request(app)
        .post('/api/v1/notes/add')
        .send(input)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);
          done();
        });
    });
  });


  //14 update note without auth 
  describe('updateNote', () => {
    const input = {
      "Title": "BridgeLabz",
      "descrption": "skill devoloping company",
      "colour": "white",
    }
    it('Given new note should thorw error for auth', (done) => {
      request(app)
        .put(`/api/v1/notes/${noteid}`)
        .send(input)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);
          done();
        });
    });
  });

  //15 delete note without id should throw error
  describe('Delete note byid', () => {
    it('Given  note without token should throw error', (done) => {
      request(app)
        .delete(`/api/v1/notes/${noteid}`)
        // .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);
          done();
        });
    });
  });

  // 16 Test case for archive note by ID with authorization
  describe(' Archive note by id with authorization ', () => {
    it('Given valid id archive note by ID successfully complete should return status code 202', (done) => {
      request(app)
        .put(`/api/v1/notes/${noteid}/archive`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(202);
          done();
        });
    });
  });

  // 17 Test case for archive note without token should throw error
  describe(' Archive without token ', () => {
    it('Given valid id archive note without token  should throw error', (done) => {
      request(app)
        .put(`/api/v1/notes/${noteid}/archive`)
        //.set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);
          done();
        });
    });
  });

  // 18 Test case for trash note by ID with authorization
  describe('Trash note by id', () => {
    it('Given valid id trash note by ID successfully complete should be trashed', (done) => {
      request(app)
        .put(`/api/v1/notes/${noteid}/trash`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(202);
          done();
        });
    });
  });
  // 19 Test case for trash note without authorization
  describe('Trash note by id', () => {
    it('Given trash note without authorization should throw error', (done) => {
      request(app)
        .put(`/api/v1/notes/${noteid}/trash`)
        //.set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);
          done();
        });
    });
  });
 // 20 Test case for trash note without noteid
 describe('Trash note by id', () => {
  it('Given note without noteid should throw error', (done) => {
    request(app)
      .put(`/api/v1/notes/trash`)
      //.set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(400);
        done();
      });
  });
});

});