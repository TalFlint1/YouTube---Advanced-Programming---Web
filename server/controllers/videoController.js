const Video = require('../models/Video');

// Fetch all videos
const getVideos = async (req, res) => {
    try {
      const videos = await Video.find(); // Fetch all videos from the database
      res.json(videos); // Send JSON response containing videos array
    } catch (err) {
      console.error('Error fetching videos:', err);
      res.status(500).json({ message: 'Failed to fetch videos' }); // Handle error
    }
};

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
  const { title, description, videoUrl, thumbnailUrl } = req.body;

  try {
      // Assuming Video model and updating based on userId and videoId
      const updatedVideo = await Video.findOneAndUpdate(
          { userId: id, _id: pid },
          { title, description, videoUrl, thumbnailUrl },
          { new: true } // Return updated video object
      );

      if (!updatedVideo) {
          return res.status(404).json({ message: 'Video not found' });
      }
      res.json(updatedVideo);
  } catch (err) {
      console.error('Error updating video:', err);
      res.status(500).json({ message: 'Failed to update video' });
  }
};

const deleteVideo = async (req, res) => {
  const { id, pid } = req.params; // User id and video id
  try {
      // Assuming Video model and deleting based on userId and videoId
      const deletedVideo = await Video.findOneAndDelete({ userId: id, _id: pid });

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
  getUserVideos,
  createVideo,
  getVideo,
  updateVideo,
  deleteVideo,
};
