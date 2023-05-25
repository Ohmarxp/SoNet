const { ObjectId } = require('mongoose').Types;

const users = [
  'Jones',
  'Ze',
  'Zechariah',
  'Zeek',
  'Zeeshan',
  'Zeid',
  'Zein',
  'Zen',
  'Zendel',
  'Zenith',
  'Zennon',
  'Zeph',
  'Zerah',
  'Zhen',
  'Zhi',
  'Zhong',
  'Zhuo',
  'Zi',
  'Zidane',
  'Zijie',
  'Zinedine',
  'Zion',
  'Zishan',
  'Ziya',
  'Ziyaan',
  'Zohaib',
  'Zohair',
  'Zoubaeir',
  'Zubair',
  'Zubayr',
  'Zuriel',
  'Xander',
  'Jared',
  'Courtney',
  'Gillian',
  'Clark',
  'Jared',
  'Grace',
  'Kelsey',
  'Tamar',
  'Alex',
  'Mark',
  'Tamar',
  'Farish',
  'Sarah',
  'Nathaniel',
  'Parker',
];

const thoughts = [
  'This is a great thought!',
  "That's interesting.",
  'I love coding!',
  'Coding is fun.',
  'Nature is so beautiful.',
  'I love spending time in nature.',
  'Music makes me feel alive.',
  'Spending time with loved ones is precious.',
  'Family is everything.',
];

const reactions = [
  'This is great!',
  'I agree',
  'Tell me more!',
  'Absolutely!',
  'I love it too!',
  'It makes me feel alive'
]

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full user
const getRandomUser = () =>
  `${getRandomArrItem(users)}`;

// Function to generate random thoughts that we can add to the user object.
const getRandomThoughts = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtName: getRandomArrItem(thoughts)
    });
  }
  return results;
};

// Function to generate random reactions that we can add to the thought object.
const getRandomReactions = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionName: getRandomArrItem(reactions)
    });
  }
  return results;
};

module.exports = { getRandomUser, getRandomThoughts, getRandomReactions };