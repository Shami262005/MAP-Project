// backend/Controllers/announcementController.js

const pool = require('../database');
const fs   = require('fs');
const path = require('path');

// Helper to build a public URL given a folder and filename
function buildPublicUrl(req, folder, filename) {
  return `${req.protocol}://${req.get('host')}/${folder}/${filename}`;
}

async function createAnnouncement(req, res, next) {
  try {
    const { heading, description } = req.body;
    const posted_by = req.user.user_id;

    // 1) Insert without image_url
    const { rows } = await pool.query(
      `INSERT INTO announcements
         (heading, description, posted_by)
       VALUES ($1,$2,$3)
       RETURNING *`,
      [heading, description, posted_by]
    );
    const announcement = rows[0];

    // 2) If an image was uploaded, rename & update DB
    if (req.file) {
      const ext       = path.extname(req.file.originalname);
      const newName   = `announcement-${announcement.announcement_id}${ext}`;
      const uploadDir = path.join(__dirname, '../uploads/announcementspic');
      const oldPath   = path.join(uploadDir, req.file.filename);
      const newPath   = path.join(uploadDir, newName);

      // remove any existing file for this announcement
      const files = await fs.promises.readdir(uploadDir);
      for (const file of files) {
        if (file.startsWith(`announcement-${announcement.announcement_id}.`)) {
          await fs.promises.unlink(path.join(uploadDir, file));
        }
      }

      // rename
      await fs.promises.rename(oldPath, newPath);

      // build URL and persist
      const imageUrl = buildPublicUrl(req, 'uploads/announcementspic', newName);
      await pool.query(
        'UPDATE announcements SET image_url = $1 WHERE announcement_id = $2',
        [imageUrl, announcement.announcement_id]
      );
      announcement.image_url = imageUrl;
    }

    res.status(201).json(announcement);
  } catch (err) {
    next(err);
  }
}

async function getAllAnnouncements(req, res, next) {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM announcements ORDER BY published_at DESC'
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function deleteAnnouncement(req, res, next) {
  try {
    const { id } = req.params;

    // 1) Fetch image_url so we can delete the file
    const { rows } = await pool.query(
      'SELECT image_url FROM announcements WHERE announcement_id = $1',
      [id]
    );
    if (!rows.length) {
      return res.status(404).json({ error: 'Announcement not found' });
    }
    const { image_url } = rows[0];

    // 2) If there's an image URL, delete the file
    if (image_url) {
      const filename = path.basename(image_url);
      const filePath = path.join(__dirname, '../uploads/announcementspic', filename);
      try { await fs.promises.unlink(filePath); } catch {}
    }

    // 3) Delete the DB row
    await pool.query(
      'DELETE FROM announcements WHERE announcement_id = $1',
      [id]
    );

    res.json({ message: 'Announcement deleted' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createAnnouncement,
  getAllAnnouncements,
  deleteAnnouncement
};
