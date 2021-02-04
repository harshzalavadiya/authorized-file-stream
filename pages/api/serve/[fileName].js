import fs from "fs";
import path from "path";

/* Reference
 * https://dev.to/abdisalan_js/how-to-code-a-video-streaming-server-using-nodejs-2o0
 */

export default (req, res) => {
  const range = req.headers.range;
  if (!range) {
    res.status(400).send();
    return;
  }

  // This Can be changed with dynamic token logic like JWT or something!
  if (req.query.token !== process.env.FILE_ACCESS_KEY) {
    res.status(401).send();
    return;
  }

  // get video stats (about 61MB)
  const fPath = `files/${req.query.fileName}`;
  const videoPath = path.resolve(fPath);
  const videoSize = fs.statSync(fPath).size;

  // Parse Range
  // Example: "bytes=32324-"
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);
};
