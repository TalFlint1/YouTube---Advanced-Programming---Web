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
  console.log(pid)
  console.log(id)
  try {
     const updatedVideo = await Video.findOne({id: pid }); // Example MongoDB query
     updatedVideo.comments = comments;
     console.log("comments:");
     console.log(comments);
     console.log(comments[0]);
    //  console.log(comments[3]);
          console.log("updatedVideo:");
     console.log(updatedVideo);
     await updatedVideo.save();
     // Assuming Video model and updating based on userId and videoId
    // const updatedVideo = await Video.findOneAndUpdate(
    //   { id: pid },
    //   { pid,title, description, videoUrl, thumbnailUrl, likes, comments, liked },
    //   { new: true ,useFindAndModify: false} // Return updated video object
    // );

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
