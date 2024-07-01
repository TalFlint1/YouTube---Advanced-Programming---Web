const Video = require('../models/Video');

// Fetch all videos


const getVideos = async (req, res) => {
  try {
    // Step 1: Fetch 10 most viewed videos
    const mostViewedVideos = await Video.find()
      .sort({ views: -1 }) // Sort by views descending (most viewed first)
      .limit(10); // Limit to 10 videos

    // Step 2: Fetch remaining videos excluding most viewed
    const remainingVideos = await Video.find({
      _id: { $nin: mostViewedVideos.map(video => video._id) }
    });
    console.log("remainingVideos:",remainingVideos)
    // Step 3: Randomly select 10 videos from remainingVideos
    const randomVideos = getRandomElements(remainingVideos, 10);

    // Step 4: Combine most viewed videos with randomly selected videos
    const allVideos = [...mostViewedVideos, ...randomVideos];

    // Step 5: Shuffle allVideos
    const shuffledVideos = shuffle(allVideos);

    res.json(shuffledVideos); // Send JSON response containing shuffled videos array
  } catch (err) {
    console.error('Error fetching videos:', err);
    res.status(500).json({ message: 'Failed to fetch videos' }); // Handle error
  }
};

// Function to randomly select 'count' elements from an array
function getRandomElements(array, count) {
  const shuffled = array.sort(() => 0.5 - Math.random()); // Shuffle array
  return shuffled.slice(0, count); // Get first 'count' elements
}

// Function to shuffle array elements
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const getUserVideos = async (req, res) => {
  const user_str = req.params.id;
  try {
    console.log(user_str)
    let user =user_str.substring(1)
    console.log(user)
      // Assuming you have a Video model and you fetch videos based on userId
      const userVideos = await Video.find({ owner: user });
      console.log(userVideos)

      res.json(userVideos);
  } catch (err) {
      console.error('Error fetching user videos:', err);
      res.status(500).json({ message: 'Failed to fetch user videos' });
  }
};

const createVideo = async (req, res) => {
  const userId = req.params.id;
  const { pid } = req.params; // Optional, if you need to handle video id in URL
  const { title, description, videoUrl, thumbnailUrl } = req.body;

  try {
      // Assuming you have a Video model to create a new video entry
      const newVideo = await Video.create({
          userId,
          title,
          description,
          videoUrl,
          thumbnailUrl
      });

      res.status(201).json(newVideo);
  } catch (err) {
      console.error('Error creating video:', err);
      res.status(500).json({ message: 'Failed to create video' });
  }
};
const getVideoById = async (req, res) => {
  const { pid } = req.params; // User id and video id
  try {
    console.log("here!!!")
      // Assuming Video model and fetching based on userId and videoId
      const video = await Video.findOne({  id: pid }); // Example MongoDB query
      if (!video) {
          return res.status(404).json({ message: 'Video not found' });
      }
      res.json(video);
  } catch (err) {
      console.error('Error fetching video:', err);
      res.status(500).json({ message: 'Failed to fetch video' });
  }
};
const getVideo = async (req, res) => {
  const { id, pid } = req.params; // User id and video id
  try {
      // Assuming Video model and fetching based on userId and videoId
      const video = await Video.findOne({ userId: id, _id: pid }); // Example MongoDB query
      if (!video) {
          return res.status(404).json({ message: 'Video not found' });
      }
      res.json(video);
  } catch (err) {
      console.error('Error fetching video:', err);
      res.status(500).json({ message: 'Failed to fetch video' });
  }
};

const updateVideo = async (req, res) => {
  const { id, pid } = req.params; // User id and video id
  const { title, description, videoUrl, thumbnailUrl, likes, comments, liked } = req.body;

  try {
    // Find the video by id
    const video = await Video.findOne({ id: pid });

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Update the video properties
    video.title = title;
    video.description = description;
    video.videoUrl = videoUrl;
    video.thumbnailUrl = thumbnailUrl;
    video.likes = likes;
    video.comments = comments;
    video.liked = liked;

    // Save the updated video
    await video.save();

    res.json(video);
  } catch (err) {
    console.error('Error updating video:', err);
    res.status(500).json({ message: 'Failed to update video' });
  }
};




const deleteVideo = async (req, res) => {
  console.log("delete is here");
  const { pid, id } = req.params; 

  console.log( req.params);
  console.log(pid);
  console.log(id);
  // User id and video id
  try {
      // Assuming Video model and deleting based on userId and videoId
      const deletedVideo = await Video.findOneAndDelete({  id: pid});

      if (!deletedVideo) {
          return res.status(404).json({ message: 'Video not found' });
      }
      res.json({ message: 'Video deleted successfully' });
  } catch (err) {
      console.error('Error deleting video:', err);
      res.status(500).json({ message: 'Failed to delete video' });
  }
};

module.exports = {
  getVideos,
  getVideoById,
  getUserVideos,
  createVideo,
  getVideo,
  updateVideo,
  deleteVideo,
};
