const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "647f26a258d351c00e51f599",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod asperiores suscipit ratione aut. Quam laudantium, voluptate unde similique, earum quibusdam nam minima facilis labore a, eos molestias veniam. Aperiam, beatae.",
      price,
      images: [
        {
          url: "https://res.cloudinary.com/dgrmm4kce/image/upload/v1686655326/YelpCamp/ryjdm550pei4zd3ewicw.jpg",
          filename: "YelpCamp/ryjdm550pei4zd3ewicw",
        },
        {
          url: "https://res.cloudinary.com/dgrmm4kce/image/upload/v1686576379/YelpCamp/k1jp6rxwsvl8xcgygexf.jpg",
          filename: "YelpCamp/k1jp6rxwsvl8xcgygexf",
        },
      ],
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
