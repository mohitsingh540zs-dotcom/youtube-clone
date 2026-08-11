import multer from "multer";
import os from "os";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, os.tmpdir());
  },

  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  // Image files
  if (
    file.fieldname === "avatar" ||
    file.fieldname === "banner" ||
    file.fieldname === "thumbnail"
  ) {
    if (file.mimetype.startsWith("image/")) {
      return cb(null, true);
    }

    return cb(new Error(`${file.fieldname} must be an image`), false);
  }

  // Video file
  if (file.fieldname === "video") {
    if (file.mimetype.startsWith("video/")) {
      return cb(null, true);
    }

    return cb(new Error("Uploaded file must be a video"), false);
  }

  // Unknown field
  return cb(new Error(`Unexpected file field: ${file.fieldname}`), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 500 * 1024 * 1024,
  },
});

export default upload;
