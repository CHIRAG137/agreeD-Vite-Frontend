import React, { useState } from "react";
import { teamMembers } from "../../data";

function Sections() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // Add form submission logic here (e.g., sending data to a server)
  };
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
      <section id="features-section" className="section-container">
        <h2>Features</h2>
        <div className="para-with-img right-side">
          <h3>Personalised Email and Call Reminders</h3>
          <div>
            <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
              <p>
                Tired of missing important dates buried in agreements? Say goodbye to the agreement
                trap! Never miss a deadline again! My solution auto-reminds you of agreement dates
                and tasks—zero intervention needed. Stay ahead, stress-free, and in control of all
                your commitments effortlessly.
              </p>
              <p>
                Imagine a world where agreements don’t become forgotten commitments. Ditch the
                hassle of tracking agreements! My innovation auto-notifies you of critical dates and
                actions. No manual effort, no missed deadlines—just peace of mind, every single
                time.
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
            <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
              <p>
                Transform the way you sign contracts! My solution simplifies contract signing by
                streamlining deadlines and tasks into automated notifications. Sign, relax, and let
                the system handle the rest seamlessly!
              </p>
              <p>
                Say goodbye to contract chaos! With my system, signing agreements comes with
                built-in reminders for critical tasks and deadlines. Stay compliant, stress-free,
                and ahead of every commitment!
              </p>
            </div>
          </div>
        </div>
        <div className="para-with-img right-side">
          <h3>Talk to your Contract, what?</h3>
          <div>
            <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
              <p>
                Introducing your real-time contract expert! This video call assistant answers all
                your questions instantly, whether it’s about clauses, deadlines, or obligations.
                Navigate agreements with confidence, ensuring clarity and understanding every step
                of the way, hassle-free!
              </p>
              <p>
                Simplify contracts with my innovative video call assistant! It provides instant,
                real-time answers to any contract-related queries. From tricky clauses to deadlines,
                gain expert-level clarity and navigate agreements effortlessly—your personal
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
            <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
              <p>
                Revolutionize contract management with a smart text-based bot! Instantly answer your
                contract questions, clarify clauses, and track deadlines effortlessly. Your contract
                assistant is always ready to simplify agreements, providing accurate guidance
                anytime, anywhere!
              </p>
              <p>
                Say hello to hassle-free contracts! My text-based bot delivers real-time answers to
                your contract queries. From terms to timelines, it’s your go-to assistant for
                instant clarity and seamless agreement management. Stay informed and in control!
              </p>
            </div>
          </div>
        </div>
        <div className="para-with-img right-side">
          <h3>Payment Gateway</h3>
          <div>
            <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
              <p>
                Streamline your transactions with my secure payment gateway! Effortlessly manage
                payments, track records, and ensure seamless financial flows. Safe, fast, and
                reliable—transform how you handle payments with just a few clicks.
              </p>
              <p>
                Say goodbye to payment hassles! My payment gateway simplifies transactions with
                smooth processing, real-time tracking, and robust security. Whether it’s for
                businesses or individuals, experience stress-free payments like never before!
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
            <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
              <p>
                Simplify agreements with ready-to-use contract templates! Professionally crafted and
                customizable, they save time and eliminate confusion. From business deals to
                personal agreements, find the perfect template for every need—quick, clear, and
                reliable.
              </p>
              <p>
                No more drafting from scratch! Access a library of expertly designed contract
                templates tailored to every requirement. Easy to edit, legally sound, and
                time-saving—create agreements that work for you in minutes!
              </p>
            </div>
          </div>
        </div>
        <div className="para-with-img right-side">
          <h3>Schedule In Calender</h3>
          <div>
            <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
              <p>
                Effortlessly manage your commitments with automated calendar scheduling! Set
                important dates and tasks, and let the system handle reminders, ensuring nothing
                slips through the cracks. Stay organized and on track—your calendar, simplified!
              </p>
              <p>
                Never miss a deadline again! Automatically schedule tasks and events in your
                calendar, with timely reminders and seamless integration. Stay ahead of your
                obligations, stress-free, and keep your schedule organized with ease.
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

      <section id="team-section" className="section-container">
        <div style={{ padding: "50px 20px", textAlign: "center" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "30px" }}>Meet Our Team</h2>
          <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
            {teamMembers.map((member, index) => (
              <div
                key={index}
                style={{
                  width: "250px",
                  marginBottom: "30px",
                  padding: "20px",
                  borderRadius: "8px",
                  backgroundColor: "transparent",
                  border: "1px solid #313131",
                }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  style={{
                    width: "50%",
                    height: "auto",
                    borderRadius: "50%",
                    marginBottom: "15px",
                  }}
                />
                <h3 style={{ color: "#333", fontSize: "1.2rem" }}>{member.name}</h3>
                <p style={{ color: "#777", fontStyle: "italic" }}>{member.role}</p>
                <p style={{ color: "#555", fontSize: "14px" }}>{member.description}</p>
                <div style={{ marginTop: "10px" }}>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginRight: "10px", backgroundColor: "#fff", borderRadius: "100px" }}
                  >
                    <img
                      src="https://img.icons8.com/ios-filled/50/000000/linkedin.png"
                      alt="LinkedIn"
                      style={{ width: "24px", height: "24px" }}
                    />
                  </a>
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginRight: "10px", backgroundColor: "#fff", borderRadius: "100px" }}
                  >
                    <img
                      src="https://img.icons8.com/ios-filled/50/000000/instagram-new.png"
                      alt="Instagram"
                      style={{ width: "24px", height: "24px" }}
                    />
                  </a>
                  <a href={member.github} target="_blank" rel="noopener noreferrer">
                    <img
                      src="https://img.icons8.com/ios-filled/50/000000/github.png"
                      alt="GitHub"
                      style={{
                        width: "24px",
                        height: "24px",
                        backgroundColor: "#fff",
                        borderRadius: "100px",
                      }}
                    />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact-us-section" className="section-container">
        <div
          style={{
            padding: "20px",
            margin: "0 auto",
            borderRadius: "8px",
          }}
        >
          <h2 style={{ textAlign: "center", color: "#333" }}>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="name" style={{ display: "block", marginBottom: "5px" }}>
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #313131",
                  background: "transparent",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="email" style={{ display: "block", marginBottom: "5px" }}>
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #313131",
                  background: "transparent",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="message" style={{ display: "block", marginBottom: "5px" }}>
                Message:
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #313131",
                  background: "transparent",
                  borderRadius: "4px",
                  fontSize: "14px",
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: "orange",
                color: "#000",
                padding: "10px 20px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "16px",
                display: "block",
                width: "100%",
                marginTop: "10px",
              }}
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Sections;
