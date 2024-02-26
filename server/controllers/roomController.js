const { mongoose } = require('mongoose');
const Room = require('../models/RoomModel');
const User = require('../models/UserModel');

const adminRoomList = async (req, res , next) => {
    if (true) {
        try {
            const rooms = await Room.find().populate('mentor.user');
            const roomsWithMentors = await Promise.all(rooms.map(async (room) => {
                const mentor = room.mentor.user;
                const mentorDetails = await User.findById(mentor);

                return {
                    ...room.toObject(),
                    mentor: mentorDetails,
                };
            }));
            const users = await User.find();
            res.status(200).json({ Rooms: roomsWithMentors, users: users });
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Could not fetch rooms" });
            next(err);
        }
    } else {
        res.status(500).json({ error: "Not an admin" });
        return;
    }
};

const buyCourse = async (req, res,next) => {
    const userId = req.body.userId;
    const roomId = req.body.roomId;
    try {
        const room = await Room.findById(roomId);
        const user = await User.findById(userId);
        if (!room || !user) {
            res.status(404).json({ error: "Room or User not found" });
            return;
        }
        const userCourses = user.Joined_Room;
        const roomParticipants = room.participants;
        if (userCourses.includes(roomId) || roomParticipants.includes(userId)) {
            res.status(400).json({ error: "User already in course" });
            return;
        }

        userCourses.push(roomId);
        roomParticipants.push(userId);
        user.Joined_Room = userCourses;
        room.participants = roomParticipants;
        
        await user.save();
        await room.save();
        res.status(200).json({ message: "Course added successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Could not add course" });
        next(err);
    }
}

const getCourses = async (req, res,next) => {
    const { userId } = req.session.user;
    try {
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        const userCourses = user.Joined_Room;
        const courses = await Room.find({ _id: { $in: userCourses } });
        res.status(200).json({ courses: courses });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Could not fetch courses" });
        next(err);
    }
}
const getCourse = async (req, res,next) => {
    const courseId = req.query.courseId;
    try {
        const room = await Room.findById(courseId);
        if (!room) {
            res.status(404).json({ error: "Course not found" });
            return;
        }
        res.status(200).json({ course: room });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Could not fetch courses" });
        next(err);
    }
}

const getExploreCourses = async (req, res,next) => {
    try {
        const courses = await Room.find();
        res.status(200).json({ courses: courses });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Could not fetch courses" });
        next(err);
    }
}

const addRoom = async (req, res,next) => {
    const { roomTitle , price , meetLink , skills , description , userId } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        const room = new Room({
            title:roomTitle,
            price,
            meetlink:meetLink,
            skills,
            description,
            mentor: {
                user: userId
            }
        });
        await room.save();
        user.Created_Room.push(room._id);
        await user.save();
        res.status(200).json({ message: "Room added successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Could not add room" });
        next(err);
    }
}   

const getCreatedCourses = async (req, res,next) => {
    const  userId  = req.body.userId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        const userCourses = user.Created_Room;
        const courses = await Room.find({ _id: { $in: userCourses } });
        res.status(200).json({ courses: courses });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Could not fetch courses" });
        next(err);
    }
}

const getJoinedCourses = async (req, res,next) => {
    const  userId  = req.body.userId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        const userCourses = user.Joined_Room;
        const courses = await Room.find({ _id: { $in: userCourses } });
        res.status(200).json({ courses: courses });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Could not fetch courses" });
        next(err);
    }
}

module.exports = {
    adminRoomList,
    buyCourse,
    getCourses,
    getExploreCourses,
    addRoom,
    getCreatedCourses,
    getCourse,
    getJoinedCourses
};
