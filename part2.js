// #1 Add a person to the collection. You pick the data, but they should have an empty array for children.
db.people.insertOne({ first_name: "Charles",
 last_name: "Lee",
 email: "clee@revolution.us",
 age: 50,
 state: "Pennsylvania",
 children: [] })
// #2 Add another person. They should have at least two children.
db.people.insertOne({ "first_name": "Gabriel",
last_name: "Winship",
email: "gwinship@example.com",
age: 27,
state: "Georgia",
children: [
  {name: "Patricia", age: 14},
  {name: "Keith", age: 12}
] })
// #3 Update one person named Clarence. He moved from North Dakota to South Dakota.
db.people.updateOne({ first_name: "Clarence" }, { $set: { state: "South Dakota" }})
// #4 Update Rebecca Hayes. Remove her email address.
db.people.updateOne({ first_name: "Rebecca", last_name: "Hayes" }, { $unset: { email: 1 }})
// #5 Update everyone from Missouri. They all had a birthday today, so add one to their age. (expect 4 matches)
db.people.updateMany({ state: "Missouri" }, { $inc: { age: 1 } })
// #6 Replace Jerry Baker has updated information. Replace with a new document:
db.people.replaceOne(
  { first_name: "Jerry", last_name: "Baker" },
  {
    first_name: "Jerry",
    last_name: "Baker-Mendez",
    email: "jerry@classic.ly",
    gender: "Male",
    age: 28,
    state: "Vermont",
    children: [
      { name: "Alan", age: 18 },
      { name: "Jenny", age: 3 },
    ],
  }
);
// #7 Delete Wanda Bowman.
db.people.deleteOne({ first_name: "Wanda", last_name: "Bowman" })
// #8 Delete everyone who does not have an email address specified. (expect 37 matches)
db.people.deleteMany({ email: null })

// #9 Add several documents to a new submissions collection. Do it all in one command.
db.submissions.insertMany([
  { title: "The River Bend", upvotes: 10, downvotes: 2, artist: ObjectId("60366e3a38a2df0ddbd794f8") },
  { title: "Nine Lives", upvotes: 7, downvotes: 0, artist: ObjectId("60366e3a38a2df0ddbd79526") },
  { title: "Star Bright", upvotes: 19, downvotes: 3, artist: ObjectId("60366e3a38a2df0ddbd795a9") },
  { title: "Why Like This?", upvotes: 1, downvotes: 5, artist: ObjectId("60366e3a38a2df0ddbd7952f") },
  { title: "Non Sequitur", upvotes: 11, downvotes: 1, artist: ObjectId("60366e3a38a2df0ddbd794f6") }
])
db.submissions.insertMany([
  { title: "The River Bend", upvotes: 10, downvotes: 2,
      artist: db.people.findOne({ first_name: "Anna", last_name: "Howard" })._id },
  { title: "Nine Lives", upvotes: 7, downvotes: 0,
      artist: db.people.findOne({ first_name: "Scott", last_name: "Henderson" })._id },
  { title: "Star Bright", upvotes: 19, downvotes: 3, 
      artist: db.people.findOne({ first_name: "Andrea", last_name: "Burke" })._id },
  { title: "Why Like This?", upvotes: 1, downvotes: 5, 
      artist: db.people.findOne({ first_name: "Steven", last_name: "Marshall" })._id },
  { title: "Non Sequitur", upvotes: 11, downvotes: 1, 
      artist: db.people.findOne({ first_name: "Gerald", last_name: "Bailey" })._id }
])
// #10 Add 2 upvotes for "The River Bend".
db.submissions.updateOne({ title: 'The River Bend' }, { $inc: { upvotes: 2 } })
// #11 Add a field round2 = true to all submissions with at least 10 upvotes. (expect 3 matches)
db.submissions.updateMany({ upvotes: { $gte: 10 } }, { $set: { round2: true } })

// #12 Update Helen Clark. She had a baby! Add a child, name: Melanie, age: 0.
db.people.updateOne({ first_name: "Helen", last_name: "Clark" }, { $push: { children: { name: "Melanie", age: 0 } } })
// #13 Joan Bishop has a child named Catherine. She just had a birthday and prefers to go by "Cat". In one query update the child's name to "Cat" and increment her age by one.
db.people.updateOne({ first_name: "Joan", last_name: "Bishop" }, { $set: { 'children.3.name': "Cat" }, $inc: {'children.3.age': 1 } })
// #14 List all submissions with more downvotes than upvotes.
db.submissions.find({ $expr: { $gt: ["$downvotes", "$upvotes"] } })