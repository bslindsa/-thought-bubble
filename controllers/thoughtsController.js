const { User, Thoughts } = require('../models');

module.exports = {
getThoughts(req, res) {
    Thoughts.find()
        .then(async (thoughts) => {
            const thoughtObj = {
                thoughts,
                headCount: await headCount(),
            };
            return res.json(thoughtObj);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
},
getSingleThought(req, res) {
    Thoughts.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then(async (thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with that ID' })
                : res.json({
                    thought,
                    grade: await grade(req.params.thoughtId),
                })
        )
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
},
createThought(req, res) {
    Thoughts.create(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
},
updateThought(req, res) {
    Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
    )
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with this id' })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
},
deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No such thought exists' })
                : Thoughts.findOneAndUpdate(
                    { thoughts: req.params.thoughtId },
                    { $pull: { thoughts: req.params.thoughtId } },
                    { new: true }
                )
        )
        .then((thought) =>
            !thought
                ? res.status(404).json({
                    message: 'Thought deleted, but no thoughts found',
                })
                : res.json({ message: 'Thought successfully deleted' })
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
},
createReaction(req, res) {
    console.log(req.body);
    Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
    )
        .then((thought) =>
            !thought
                ? res
                    .status(404)
                    .json({ message: 'No thought found with that ID' })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
},
deleteReaction(req, res) {
    Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.assignmentId } } },
        { runValidators: true, new: true }
    )
        .then((thought) =>
            !thought
                ? res
                    .status(404)
                    .json({ message: 'No thought found with that ID' })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
},
};