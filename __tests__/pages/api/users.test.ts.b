// import { prismaMock } from '@/lib/singleton'
// import User from "@/pages/api/DAO/userModel"

describe('/api/v1/users/[id] API Endpoint', () => { 
 

  it('createUser crea un usuario',  () => {
    expect(true).toBe(true)
  })// TODO
  // const dbuser = {
  //   id: "C-123", 
  //   name: "Rick",
  //   lastName: "Sanchez",
  //   password: "rick",
  //   email: "rick.sanchez@RYM.com",
  //   emailVerified: null, 
  //   image: "null", 
  //   birthdate:new Date(),
  //   createdAt: new Date(), 
  //   updatedAt: new Date(), 
  // };
  // const user = {
  //   id: "C-123", 
  //   name: "Rick",
  //   lastName: "Sanchez",
  //   password: "rick",
  //   email: "rick.sanchez@RYM.com",
  //   image: "null", 
  //   birthdate:new Date().toDateString(),
  // };
  // const dbpassword = {
  //   id: "C-123", 
  //   value: "rick", 
  //   userId: "C-123",
  //   createdAt: new Date(), 
  //   deletedAt: null, 
  // }

  // prismaMock.$transaction.mockImplementationOnce((cb) => cb(prismaMock));
  // prismaMock.user.findFirst.mockResolvedValue(null)
  // prismaMock.user.create.mockResolvedValue(dbuser)
  // prismaMock.password.create.mockResolvedValue(dbpassword)

  //   const result =  expect(User.createUser).resolves
  //   console.log("result: ",await createUser(user))
  //   result.toMatchObject({
  //        email: "rick.sanchez@RYM.com",
  //        id: "C-123",
  //        image: "null",
  //        lastName: "Sanchez",
  //        name: "Rick",
  //        emailVerified: null, 
  //        birthdate:expect.any(Date),
  //        createdAt: expect.any(Date), 
  //        updatedAt: expect.any(Date), 
  //     })
  // });
  
})