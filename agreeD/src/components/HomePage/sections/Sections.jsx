import React from "react";

function Sections() {
  const codeExample = `resultWorkerErr := make(chan error)
defer close(resultWorkerErr)
go func() {
	defer cancel()
	resultWorkerErr <- b.resultWorker(ctx)
}()

err := b.worker(ctx)
cancel()
if err == nil {
	return <-resultWorkerErr
}
return multierror.Append(err, <-resultWorkerErr)`;
  return (
    <div className="sections-container">
      <div className="box-b-w">
        <h3>lorem</h3>
        <p>
          It’s difficult to say what’s wrong with the code without more context. Can you provide
          more information about what the code is supposed to do and what isn’t working as expected?
          Also, is this the entire code or just a part of it?
        </p>
        <pre>{codeExample}</pre>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae sed sequi neque quasi
          velit impedit! Voluptatum eos nobis totam quo.
        </p>
      </div>

      <div className="ctaBtns-group">
        <button className="ctaBtn-t active">Fix code</button>
        <button className="ctaBtn-t">Home security</button>
        <button className="ctaBtn-t">Fermat's Little Theorem</button>
      </div>

      <section id="limitations-section" className="section-container list-container">
        <h2>Limitations</h2>
        <ul>
          <li>ChatGPT sometimes writes plausible-sounding but incorrect or nonsensical answers.</li>
          <li>
            ChatGPT is sensitive to tweaks to the input phrasing or attempting the same prompt
            multiple times.
          </li>
          <li>The model is often excessively verbose and overuses certain phrases.</li>
        </ul>
      </section>

      <section id="iterative-deployment-section" className="section-container">
        <h2>Iterative deployment</h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel, totam perspiciatis dicta
          quae sed modi eaque animi aspernatur molestias nobis nisi, id eos facilis dolorem ea odio
          laudantium itaque saepe?
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel, totam perspiciatis dicta
          quae sed modi eaque animi aspernatur molestias nobis nisi, id eos facilis dolorem ea odio
          laudantium itaque saepe?
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel, totam perspiciatis dicta
          quae sed modi eaque animi aspernatur molestias nobis nisi, id eos facilis dolorem ea odio
          laudantium itaque saepe?
        </p>
      </section>

      <section id="setup-section" className="section-container">
        <h2>Iterative deployment</h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel, totam perspiciatis dicta
          quae sed modi eaque animi aspernatur molestias nobis nisi, id eos facilis dolorem ea odio
          laudantium itaque saepe?
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel, totam perspiciatis dicta
          quae sed modi eaque animi aspernatur molestias nobis nisi, id eos facilis dolorem ea odio
          laudantium itaque saepe?
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel, totam perspiciatis dicta
          quae sed modi eaque animi aspernatur molestias nobis nisi, id eos facilis dolorem ea odio
          laudantium itaque saepe?
        </p>
      </section>

      <section id="features" className="section-container">
        <h2>Features</h2>
        <div className="para-with-img right-side">
          <h3>email</h3>
          <div>
            <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit dolore sint
                consequatur totam ratione, quas quidem sit maiores est, et voluptatibus veritatis
                ducimus hic provident molestiae accusamus, optio soluta! Dolorem.
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit dolore sint
                consequatur totam ratione, quas quidem sit maiores est, et voluptatibus veritatis
                ducimus hic provident molestiae accusamus, optio soluta! Dolorem.
              </p>
            </div>
            <img id="email-img" className="image" src="./Emails.png" alt="" />
          </div>
        </div>
        <div className="para-with-img left-side">
          <h3>email</h3>
          <div>
            <img id="email-img" className="image" src="./Emails.png" alt="" />
            <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit dolore sint
                consequatur totam ratione, quas quidem sit maiores est, et voluptatibus veritatis
                ducimus hic provident molestiae accusamus, optio soluta! Dolorem.
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit dolore sint
                consequatur totam ratione, quas quidem sit maiores est, et voluptatibus veritatis
                ducimus hic provident molestiae accusamus, optio soluta! Dolorem.
              </p>
            </div>
          </div>
        </div>
      </section>

      <img
        height="auto"
        width="500px"
        id="template-creation-img"
        className="image"
        src="./template creation.png"
        alt=""
      />
      <video
        height="auto"
        width="500px"
        id="ai-calls-video"
        className="video"
        autoPlay
        loop
        muted
        src="./AI Calls.mp4"
      ></video>
      <video
        height="auto"
        width="500px"
        id="video-stream-video"
        className="video"
        autoPlay
        loop
        muted
        src="./video stream.mp4"
      ></video>
      <video
        height="auto"
        width="500px"
        id="signing-contract-video"
        className="video"
        autoPlay
        loop
        muted
        src="./Signing a contract.mp4"
      ></video>
      <video
        height="auto"
        width="500px"
        id="calender-video"
        className="video"
        autoPlay
        loop
        muted
        src="./calender.mp4"
        // ref={(e) => {
        //   e.playbackRate = e !== null && 0.5;
        // }}
      ></video>
      <video
        height="auto"
        width="500px"
        id="ask-questions-video"
        className="video"
        autoPlay
        loop
        muted
        src="./Ask questions.mp4"
      ></video>
    </div>
  );
}

export default Sections;
