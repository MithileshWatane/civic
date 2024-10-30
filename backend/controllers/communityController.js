const Community = require('../models/Community');

// Create a new community for collaboration
exports.createCommunity = async (req, res) => {
  const { name, description } = req.body;

  try {
    const community = new Community({
      name,
      description,
      createdBy: req.user.id,
    });

    await community.save();
    res.status(201).json({ community });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a discussion to the community
exports.addDiscussion = async (req, res) => {
  const { communityId, discussion } = req.body;

  try {
    const community = await Community.findById(communityId);
    if (!community) return res.status(404).json({ message: 'Community not found' });

    community.discussions.push({
      text: discussion,
      user: req.user.id,
    });

    await community.save();
    res.status(200).json({ community });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Start crowdfunding for an issue
exports.startCrowdfunding = async (req, res) => {
  const { communityId, targetAmount } = req.body;

  try {
    const community = await Community.findById(communityId);
    if (!community) return res.status(404).json({ message: 'Community not found' });

    community.crowdfunding = {
      active: true,
      targetAmount,
      raisedAmount: 0,
    };

    await community.save();
    res.status(200).json({ community });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
