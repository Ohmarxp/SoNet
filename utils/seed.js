const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomUser, getRandomThoughts, getRandomReactions } = require('./data');

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', async () => {
  console.log('Connected to MongoDB database.');


  // Clear existing data
  await User.deleteMany({});
  await Thought.deleteMany({});

  // Create users
  const users = [];
  const thoughts = [];

  // Loop 3 times -- add thoughts to the thoughts array
  for (let i = 0; i < 3; i++) {
    // Get some random Reaction objects using a helper function that we imported from ./data
    const reactions = getRandomReactions(3);

    const thoughtText = getRandomThoughts();

    thoughts.push({
      thoughtText,
      reactions
    });
  }


  // Loop 10 times -- add users to the users array
  for (let i = 0; i < 10; i++) {
    // // Get some random thought objects using a helper function that we imported from ./data
    // const thoughts = getRandomThoughts(10);

    const getFriends = getRandomUser(3)

    const username = getRandomUser();
    const email = `${username}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}@email.com`;
    const friends = getFriends

    users.push({
      username,
      email,
      thoughts,
      friends
    });
  }

  // Add users to the collection and await the results
  await User.collection.insertMany(users);


  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});