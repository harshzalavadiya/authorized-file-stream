import React from "react";

export default function Home() {
  return (
    <div>
      <h1>Authorized</h1>
      <video id="videoPlayer" width="650" controls autoplay>
        <source
          src="/api/serve/example.mp4?token=signed-jwt-token"
          type="video/mp4"
        />
      </video>

      <h1>Unauthorized</h1>
      <video id="videoPlayer" width="650" controls autoPlay>
        <source src="/api/serve/example.mp4" type="video/mp4" />
      </video>

      <a href="https://github.com/harshzalavadiya/authorized-file-stream">
        Source on GitHub
      </a>
    </div>
  );
}
