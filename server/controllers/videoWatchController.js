const VideoWatch = require('../models/VideoWatch');
const Video = require('../models/Video');

// Data structures to manage video watches and user history
const videoPopularityMap = new Map();
const videoViewersMap = new Map();
const userWatchHistoryMap = new Map();

// Function to get video recommendations based on user history
const getVideoRecommendations = async (req, res) => {
  try {
    const allVideoWatches = await VideoWatch.find(); // Fetch video watch records
    allVideoWatches.forEach(record => {
      updateUserWatchHistory(record.userId, record.videoId);
    });

    const userId = req.params.id;
    const recommendedVideoIds = generateRecommendations(userId);

    const allAvailableVideos = await Video.find();
    const recommendedVideoIdsSet = new Set(recommendedVideoIds);

    // Separate recommended and non-recommended videos
    const recommendedVideosList = [];
    const otherVideosList = [];

    for (const video of allAvailableVideos) {
      const videoId = video.id;
      if (recommendedVideoIdsSet.has(videoId)) {
        recommendedVideosList.push(video);
      } else {
        otherVideosList.push(video);
      }
    }

    // Combine recommended videos with additional videos if needed
    const combinedVideoList = [...recommendedVideosList];
    if (recommendedVideosList.length < 10) {
      const additionalVideosNeeded = 10 - recommendedVideosList.length;
      const additionalVideos = otherVideosList.slice(0, additionalVideosNeeded);
      combinedVideoList.push(...additionalVideos);
    }

    // Ensure uniqueness of videos
    const uniqueVideoList = Array.from(new Set(combinedVideoList.map(video => video._id.toString())))
      .map(id => combinedVideoList.find(video => video._id.toString() === id));

    res.json(uniqueVideoList);
  } catch (error) {
    console.error('Error fetching videos with recommendations:', error);
    res.status(500).json({ message: 'Failed to fetch videos with recommendations' });
  }
};

// Function to get video recommendations for a specific user
const fetchRecommendationsForUser = async (req, res) => {
  try {
    const allVideoWatches = await VideoWatch.find(); // Fetch video watch records
    allVideoWatches.forEach(record => {
      updateUserWatchHistory(record.userId, record.videoId);
    });

    const recommendedVideoIds = generateRecommendations("Shiradeu12");
    const allAvailableVideos = await Video.find();

    const recommendedVideos = allAvailableVideos.filter(video => recommendedVideoIds.includes(video._id.toString()));
    const otherVideos = allAvailableVideos.filter(video => !recommendedVideoIds.includes(video._id.toString()));

    const combinedVideos = [...recommendedVideos];
    if (recommendedVideos.length < 10) {
      const additionalVideos = otherVideos.slice(0, 10 - recommendedVideos.length);
      combinedVideos.push(...additionalVideos);
    }

    res.json(combinedVideos);
  } catch (error) {
    console.error('Error fetching recommendations for user:', error);
    res.status(500).json({ message: 'Failed to fetch recommendations for user' });
  }
};

// Function to get all video watch records
const retrieveAllVideoWatches = async (req, res) => {
  try {
    const allVideoWatches = await VideoWatch.find(); // Fetch video watch records
    allVideoWatches.forEach(record => {
      updateUserWatchHistory(record.userId, record.videoId);
    });

    const recommendations = generateRecommendations("Shiradeu12");
    res.json(recommendations);
  } catch (error) {
    console.error('Error retrieving video watch records:', error);
    res.status(500).json({ message: 'Failed to retrieve video watch records' });
  }
};

// Function to update the watch history and popularity maps
function updateUserWatchHistory(userId, videoId) {
  if (!userWatchHistoryMap.has(userId)) {
    userWatchHistoryMap.set(userId, []);
  }
  if (!videoViewersMap.has(videoId)) {
    videoViewersMap.set(videoId, []);
    videoPopularityMap.set(videoId, 0);
  }
  userWatchHistoryMap.get(userId).push(videoId);
  videoViewersMap.get(videoId).push(userId);
  videoPopularityMap.set(videoId, videoPopularityMap.get(videoId) + 1);
}

// Function to generate video recommendations based on user watch history
function generateRecommendations(userId) {
  const recommendationList = [];
  const potentialVideos = new Map();

  const watchedVideos = userWatchHistoryMap.get(userId) || [];
  const watchedVideosSet = new Set(watchedVideos);

  watchedVideos.forEach(videoId => {
    videoViewersMap.get(videoId).forEach(otherUserId => {
      if (otherUserId === userId) return;
      userWatchHistoryMap.get(otherUserId).forEach(otherVideoId => {
        if (!watchedVideosSet.has(otherVideoId)) {
          potentialVideos.set(otherVideoId, (potentialVideos.get(otherVideoId) || 0) + 1);
        }
      });
    });
  });

  const sortedPotentialVideos = Array.from(potentialVideos).sort((a, b) => b[1] - a[1]);
  sortedPotentialVideos.slice(0, 10).forEach(([videoId, _]) => {
    recommendationList.push(videoId);
  });

  return recommendationList;
}

// Function to get videos owned by a specific user
const fetchUserVideos = async (req, res) => {
  const userId = req.params.id;
  try {
    const userVideos = await Video.find({ owner: userId });
    res.json(userVideos);
  } catch (error) {
    console.error('Error fetching user videos:', error);
    res.status(500).json({ message: 'Failed to fetch user videos' });
  }
};

// Function to create a new video watch record
const recordVideoWatch = async (req, res) => {
  const { userId, videoId, date } = req.body;
  try {
    const newVideoWatch = await VideoWatch.create({ videoId, userId, date });
    res.status(201).json(newVideoWatch);
  } catch (error) {
    console.error('Error creating video watch record:', error);
    res.status(500).json({ message: 'Failed to create video watch record' });
  }
};

// Function to get a specific video by its ID
const fetchVideoById = async (req, res) => {
  const videoId = req.params.pid;
  try {
    const video = await Video.findOne({ id: videoId });
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json(video);
  } catch (error) {
    console.error('Error fetching video by ID:', error);
    res.status(500).json({ message: 'Failed to fetch video by ID' });
  }
};

// Function to get a specific video based on user ID and video ID
const fetchVideo = async (req, res) => {
  const { id: userId, pid: videoId } = req.params;
  try {
    const video = await Video.findOne({ userId, _id: videoId });
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json(video);
  } catch (error) {
    console.error('Error fetching video:', error);
    res.status(500).json({ message: 'Failed to fetch video' });
  }
};

// Function to update video details
const modifyVideo = async (req, res) => {
  const { pid: videoId } = req.params;
  const { title, description, videoUrl, thumbnailUrl, likes, comments, liked } = req.body;

  try {
    const video = await Video.findOne({ id: videoId });
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    video.title = title;
    video.description = description;
    video.videoUrl = videoUrl;
    video.thumbnailUrl = thumbnailUrl;
    video.likes = likes;
    video.comments = comments;
    video.liked = liked;

    await video.save();
    res.json(video);
  } catch (error) {
    console.error('Error updating video:', error);
    res.status(500).json({ message: 'Failed to update video' });
  }
};

// Function to delete a specific video
const removeVideo = async (req, res) => {
  const videoId = req.params.pid;
  try {
    const deletedVideo = await Video.findOneAndDelete({ id: videoId });
    if (!deletedVideo) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json({ message: 'Video deleted successfully' });
  } catch (error) {
    console.error('Error deleting video:', error);
    res.status(500).json({ message: 'Failed to delete video' });
  }
};

module.exports = {
  recordVideoWatch,
  fetchVideoById,
  fetchUserVideos,
  fetchVideo,
  modifyVideo,
  removeVideo,
  retrieveAllVideoWatches,
  getVideoRecommendations,
  fetchRecommendationsForUser
};
