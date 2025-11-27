import express from "express";
import requireAuth from "../middleware/requireAuth.js";
import multer from "multer";
import path from "path";
import fs from "fs";

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/avatars";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, req.user._id + "-" + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  }
});

const router = express.Router();

// Get user profile
router.get("/profile", requireAuth, (req, res) => {
  res.json({
    message: "Protected data",
    user: req.user,
  });
});

// Update user profile
router.put("/profile", requireAuth, async (req, res) => {
  try {
    const { username, phoneNumber } = req.body;

    // Update user fields
    if (username) req.user.username = username;
    if (phoneNumber !== undefined) req.user.phoneNumber = phoneNumber;

    await req.user.save();

    res.json({
      message: "Profile updated successfully",
      user: req.user
    });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ message: "Server error during profile update" });
  }
});

// Upload profile picture
router.post("/upload-avatar", requireAuth, upload.single("avatar"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const avatarUrl = `/uploads/avatars/${req.file.filename}`;

    // Update user avatar in database
    req.user.avatar = avatarUrl;
    await req.user.save();

    res.json({
      message: "Avatar uploaded successfully",
      avatar: avatarUrl,
      user: req.user
    });
  } catch (error) {
    console.error("Avatar upload error:", error);
    res.status(500).json({ message: "Server error during avatar upload" });
  }
});

// Delete profile picture
router.delete("/avatar", requireAuth, async (req, res) => {
  try {
    if (req.user.avatar && req.user.avatar.startsWith("/uploads/")) {
      const avatarPath = path.join(process.cwd(), req.user.avatar);
      if (fs.existsSync(avatarPath)) {
        fs.unlinkSync(avatarPath);
      }
    }

    req.user.avatar = null;
    await req.user.save();

    res.json({
      message: "Avatar deleted successfully",
      user: req.user
    });
  } catch (error) {
    console.error("Avatar deletion error:", error);
    res.status(500).json({ message: "Server error during avatar deletion" });
  }
});
export default router;