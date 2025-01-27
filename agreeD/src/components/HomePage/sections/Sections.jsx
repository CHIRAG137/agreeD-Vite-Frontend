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
      <section id="setup-section" className="section-container">
        <h2>Iterative deployment</h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel, totam
          perspiciatis dicta quae sed modi eaque animi aspernatur molestias
          nobis nisi, id eos facilis dolorem ea odio laudantium itaque saepe?
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel, totam
          perspiciatis dicta quae sed modi eaque animi aspernatur molestias
          nobis nisi, id eos facilis dolorem ea odio laudantium itaque saepe?
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel, totam
          perspiciatis dicta quae sed modi eaque animi aspernatur molestias
          nobis nisi, id eos facilis dolorem ea odio laudantium itaque saepe?
        </p>
      </section>

      <section id="features" className="section-container">
        <h2>Features</h2>
        <div className="para-with-img right-side">
          <h3>Personalised Email and Call Reminders</h3>
          <div>
            <div
              style={{ display: "flex", gap: "10px", flexDirection: "column" }}
            >
              <p>
                Tired of missing important dates buried in agreements? Say
                goodbye to the agreement trap! Never miss a deadline again! My
                solution auto-reminds you of agreement dates and tasks—zero
                intervention needed. Stay ahead, stress-free, and in control of
                all your commitments effortlessly.
              </p>
              <p>
                Imagine a world where agreements don’t become forgotten
                commitments. Ditch the hassle of tracking agreements! My
                innovation auto-notifies you of critical dates and actions. No
                manual effort, no missed deadlines—just peace of mind, every
                single time.
              </p>
            </div>
            <img id="email-img" className="image" src="./Emails.png" alt="" height="300px" />
          </div>
        </div>
        <div className="para-with-img left-side">
          <h3>Contract Signing</h3>
          <div>
            <img
              height="260px"
              id="template-creation-img"
              className="image"
              src="./template creation.png"
              alt=""
            />
            <div
              style={{ display: "flex", gap: "10px", flexDirection: "column" }}
            >
              <p>
                Transform the way you sign contracts! My solution simplifies
                contract signing by streamlining deadlines and tasks into
                automated notifications. Sign, relax, and let the system handle
                the rest seamlessly!
              </p>
              <p>
                Say goodbye to contract chaos! With my system, signing
                agreements comes with built-in reminders for critical tasks and
                deadlines. Stay compliant, stress-free, and ahead of every
                commitment!
              </p>
            </div>
          </div>
        </div>
        <div className="para-with-img right-side">
          <h3>Talk to your Contract, what?</h3>
          <div>
            <div
              style={{ display: "flex", gap: "10px", flexDirection: "column" }}
            >
              <p>
                Introducing your real-time contract expert! This video call
                assistant answers all your questions instantly, whether it’s
                about clauses, deadlines, or obligations. Navigate agreements
                with confidence, ensuring clarity and understanding every step
                of the way, hassle-free!
              </p>
              <p>
                Simplify contracts with my innovative video call assistant! It
                provides instant, real-time answers to any contract-related
                queries. From tricky clauses to deadlines, gain expert-level
                clarity and navigate agreements effortlessly—your personal
                contract guide is just a call away!
              </p>
            </div>
            <video
              height="220px"
              id="ai-calls-video"
              className="video"
              autoPlay
              loop
              muted
              src="./AI Calls.mp4"
            ></video>
          </div>
        </div>
        <div className="para-with-img left-side">
          <h3>Contract Bot, Facing Issues Understanding Contract?</h3>
          <div>
            <video
              height="220px"
              id="video-stream-video"
              className="video"
              autoPlay
              loop
              muted
              src="./video stream.mp4"
            ></video>
            <div
              style={{ display: "flex", gap: "10px", flexDirection: "column" }}
            >
              <p>
                Revolutionize contract management with a smart text-based bot!
                Instantly answer your contract questions, clarify clauses, and
                track deadlines effortlessly. Your contract assistant is always
                ready to simplify agreements, providing accurate guidance
                anytime, anywhere!
              </p>
              <p>
                Say hello to hassle-free contracts! My text-based bot delivers
                real-time answers to your contract queries. From terms to
                timelines, it’s your go-to assistant for instant clarity and
                seamless agreement management. Stay informed and in control!
              </p>
            </div>
          </div>
        </div>
        <div className="para-with-img right-side">
          <h3>Payment Gateway</h3>
          <div>
            <div
              style={{ display: "flex", gap: "10px", flexDirection: "column" }}
            >
              <p>
                Streamline your transactions with my secure payment gateway!
                Effortlessly manage payments, track records, and ensure seamless
                financial flows. Safe, fast, and reliable—transform how you
                handle payments with just a few clicks.
              </p>
              <p>
                Say goodbye to payment hassles! My payment gateway simplifies
                transactions with smooth processing, real-time tracking, and
                robust security. Whether it’s for businesses or individuals,
                experience stress-free payments like never before!
              </p>
            </div>
            <video
              height="220px"
              id="ask-questions-video"
              className="video"
              autoPlay
              loop
              muted
              src="./Ask questions.mp4"
            ></video>
          </div>
        </div>
        <div className="para-with-img left-side">
          <h3>Templates-Contract Management Made Easy!</h3>
          <div>
            <video
              height="220px"
              id="signing-contract-video"
              className="video"
              autoPlay
              loop
              muted
              src="./Signing a contract.mp4"
            ></video>
            <div
              style={{ display: "flex", gap: "10px", flexDirection: "column" }}
            >
              <p>
                Simplify agreements with ready-to-use contract templates!
                Professionally crafted and customizable, they save time and
                eliminate confusion. From business deals to personal agreements,
                find the perfect template for every need—quick, clear, and
                reliable.
              </p>
              <p>
                No more drafting from scratch! Access a library of expertly
                designed contract templates tailored to every requirement. Easy
                to edit, legally sound, and time-saving—create agreements that
                work for you in minutes!
              </p>
            </div>
          </div>
        </div>
        <div className="para-with-img right-side">
          <h3>Schedule In Calender</h3>
          <div>
            <div
              style={{ display: "flex", gap: "10px", flexDirection: "column" }}
            >
              <p>
                Effortlessly manage your commitments with automated calendar
                scheduling! Set important dates and tasks, and let the system
                handle reminders, ensuring nothing slips through the cracks.
                Stay organized and on track—your calendar, simplified!
              </p>
              <p>
                Never miss a deadline again! Automatically schedule tasks and
                events in your calendar, with timely reminders and seamless
                integration. Stay ahead of your obligations, stress-free, and
                keep your schedule organized with ease.
              </p>
            </div>
            <video
              height="220px"
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
          </div>
        </div>
      </section>
    </div>
  );
}

export default Sections;
