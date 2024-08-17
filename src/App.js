import React, { useState, useEffect, useRef } from 'react';
import DesktopIcon from './components/DesktopIcon';
import './App.css';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [dateTime, setDateTime] = useState(getCurrentDateTime());
  const [showStartMenu, setShowStartMenu] = useState(false); 
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });
  const [isCardDragging, setIsCardDragging] = useState(false);
  const [cardOffset, setCardOffset] = useState({ x: 0, y: 0 });
  const [avatarPosition, setAvatarPosition] = useState({ x: 250, y: 0 });
  const [isAvatarDragging, setIsAvatarDragging] = useState(false);
  const [avatarOffset, setAvatarOffset] = useState({ x: 0, y: 0 });
  const [isAvatarVisible, setIsAvatarVisible] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [isSkillsWindowVisible, setIsSkillsWindowVisible] = useState(true);


  const skills = [
    {
      name: "HTML", level: "Proficient",
      description: "The standard markup language for documents designed to be displayed in a web browser.",
    },
    {
      name: "CSS", level: "Proficient",
      description: "A language for describing the presentation of web pages.",
    },
    {
      name: "React", level: "Advanced",
      description: "A JavaScript library for building user interfaces.",
    },
    {
      name: "Node.js", level: "Proficient",
      description: "A JavaScript runtime built on Chrome's V8 engine.",
    },
    {
      name: "Next.js", level: "Intermediate",
      description: "A React framework for production.",
    },
    {
      name: "JavaScript", level: "Advanced",
      description: "A high-level, just-in-time compiled programming language.",
    },
    {
      name: "TypeScript", level: "Intermediate",
      description: "A strongly typed programming language that builds on JavaScript.",
    },
    {
      name: "SQL", level: "Entry",
      description: "A domain-specific language used in programming for managing relational databases.",
    }
  ];

  const handlePrevious = () => {
    setCurrentSkillIndex((prevIndex) =>
      prevIndex === 0 ? skills.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentSkillIndex((prevIndex) =>
      prevIndex === skills.length - 1 ? 0 : prevIndex + 1
    );
  };

  function getCurrentDateTime() {
    const now = new Date();
    const options = { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    return now.toLocaleString('en-US', options);
  }

  const handleSkillClick = (index) => {
    setCurrentSkillIndex(index);
  };

  const startMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (startMenuRef.current && !startMenuRef.current.contains(event.target)) {
        setShowStartMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [startMenuRef]);

  const toggleStartMenu = () => {
    setShowStartMenu((prevState) => !prevState);
  };

  const handleCardMouseDown = (e) => {
    setIsCardDragging(true);
    setCardOffset({
      x: e.clientX - cardPosition.x,
      y: e.clientY - cardPosition.y,
    });
  };

  const handleCardMouseMove = (e) => {
    if (isCardDragging) {
      setCardPosition({
        x: e.clientX - cardOffset.x,
        y: e.clientY - cardOffset.y,
      });
    }
  };

  const handleCardMouseUp = () => {
    setIsCardDragging(false);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - modalPosition.x,
      y: e.clientY - modalPosition.y,
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setModalPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

const handleAvatarMouseDown = (e) => {
  setIsAvatarDragging(true);
  setAvatarOffset({
    x: e.clientX - avatarPosition.x,
    y: e.clientY - avatarPosition.y,
  });
};

const handleAvatarMouseMove = (e) => {
  if (isAvatarDragging) {
    setAvatarPosition({
      x: e.clientX - avatarOffset.x,
      y: e.clientY - avatarOffset.y,
    });
  }
};

const handleAvatarMouseUp = () => {
  setIsAvatarDragging(false);
};

  return (
    <div className="App">
      <div className="main-content">
      {isAvatarVisible && (
        <div
          className="avatar-window"
          style={{
            transform: `translate(${avatarPosition.x}px, ${avatarPosition.y}px)`,
            cursor: isAvatarDragging ? 'grabbing' : 'grab',
            position: 'fixed',
            zIndex: 1000,
          }}
          onMouseDown={handleAvatarMouseDown}
          onMouseMove={handleAvatarMouseMove}
          onMouseUp={handleAvatarMouseUp}
          onMouseLeave={handleAvatarMouseUp}
        >
          <div className="window-header">
            <span className="window-title">avatar.png</span>
            <button className="btn-close" onClick={() => setIsAvatarVisible(false)}>X</button>
          </div>
          <div className="avatar-container">
            <img src="/assets/avatar/avatar.png" alt="Avatar" className="avatar" />
          </div>
        </div>
      )}

        {/* Card Body */}
        <div className="container mt-4">
        {isCardVisible && (
          <div
            className="card mt-4"
            style={{
              transform: `translate(${cardPosition.x}px, ${cardPosition.y}px)`,
              cursor: isCardDragging ? 'grabbing' : 'grab',
              position: 'fixed',
              zIndex: 999,
              left: '0px',
            }}
            onMouseDown={handleCardMouseDown}
            onMouseMove={handleCardMouseMove}
            onMouseUp={handleCardMouseUp}
            onMouseLeave={handleCardMouseUp}
          >
            <div className="card-header">
              Hayden Janes's Intro
              <button className="btn btn-secondary btn-close" onClick={() => setIsCardVisible(false)}>X</button>
            </div>
            <div className="card-body">
              <p>
                I am Hayden Janes, a Jr. Web Developer. <br />
                I have experience in React, Node, Next, JavaScript, TypeScript, CSS.
              </p>
              <div className="card-footer">
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                  More Details
                </button>
              </div>
            </div>
          </div>
        )}

          {showModal && (
            <div
              className="modal-content"
              style={{
                transform: `translate(${modalPosition.x}px, ${modalPosition.y}px)`,
                cursor: isDragging ? "grabbing" : "grab",
                position: "fixed",
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              <div className="modal-header">
                <h5 className="modal-title">More Details</h5>
                <button className="btn" onClick={() => setShowModal(false)}>
                  X
                </button>
              </div>
              <div className="modal-body">
                <p>I am a Jr. Web Developer and UI/UX Designer.</p>
                <p>I love making professional-looking pages for people to help their business.</p>

                <p>I learned initially from:</p>
                <ul>
                  <li>Bay Valley Tech</li>
                  <li>Scrimba Lessons</li>
                  <li>CodeAcademy</li>
                </ul>

                <p>I continued learning by doing personal projects such as:</p>
                <ul>
                  <li>This Portfolio!</li>
                  <li>Google Jobs API Web Scraper</li>
                  <li>Personal Chat Messenger</li>
                  <li>3D Printing Website</li>
                  <li>Remaking my favorite websites</li>
                  <li>Making updated business pages for local businesses for practice</li>
                </ul>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {isSkillsWindowVisible && (
        <div className="skills-window">
          <div className="window-header">
            <span className="window-title">Skills</span>
            <button className="btn-close" onClick={() => setIsSkillsWindowVisible(false)}>X</button>
          </div>
          <div className="window-content">
            {/* Skills List on the Left */}
            <div className="skills-list">
              <ul>
                {skills.map((skill, index) => (
                  <li
                    key={index}
                    className={currentSkillIndex === index ? 'active-skill' : ''}
                    onClick={() => handleSkillClick(index)}
                  >
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>

            {/* Skill Details on the Right */}
            <div className="skill-details">
              <h2>{skills[currentSkillIndex].name}</h2>
              <p><strong>Level:</strong> {skills[currentSkillIndex].level}</p>
              <p>{skills[currentSkillIndex].description}</p>

              <div className="navigation-buttons">
                <button className="btn btn-primary" onClick={handlePrevious}>Previous</button>
                <button className="btn btn-primary" onClick={handleNext}>Next</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop icons */}
      <div className="desktop-icons">
        <div className="desktop-icon-github">
          <DesktopIcon 
            icon="/assets/desktop/github.png" 
            label="My GitHub" 
            onClick={() => window.open('https://github.com/haydencohort233', '_blank')} 
          />
        </div>

        <div className="desktop-icon-linkedin">
          <DesktopIcon 
            icon="/assets/desktop/linkedin.png" 
            label="LinkedIn" 
            onClick={() => window.open('https://linkedin.com/in/haydenjanes', '_blank')} 
          />
        </div>
        <div className="desktop-icon-discord">
          <DesktopIcon 
            icon="/assets/desktop/music.png" 
            label="Music" 
            onClick={() => window.open('https://linkedin.com/in/haydenjanes', '_blank')} 
          />
        </div>
        <div className="desktop-icon-projects">
          <DesktopIcon 
            icon="/assets/desktop/projects.png" 
            label="Intro Card" 
            onClick={() => setIsCardVisible(true)} 
          />
        </div>
        <div className="desktop-icon-projects">
          <DesktopIcon 
            icon="/assets/avatar/avatar.png" 
            label="avatar.png" 
            onClick={() => setIsAvatarVisible(true)} 
          />
        </div>
        <div className="desktop-icon-projects">
          <DesktopIcon
            icon="/assets/desktop/calculator.png"
            label="Skills"
            onClick={() => setIsSkillsWindowVisible(true)}
          />
        </div>
      </div>

      {/* Taskbar with Start button */}
      <div className="taskbar">
        <img
          src="/assets/start_menu/button.png"
          alt="Start Menu"
          className={`start-menu-image ${showStartMenu ? 'active' : ''}`}
          onClick={toggleStartMenu}
        />
        <div className="time">{dateTime}</div>
      </div>

    {/* Start Menu */}
    {showStartMenu && (
      <div className="start-menu" ref={startMenuRef}>
        <div className="start-menu-header">
          <img src="/assets/avatar/avatar.png" alt="Avatar" className="start-menu-avatar" />
          Hayden Janes
        </div>
        <div className="start-menu-content">
        <div className="menu-item">
          <img src="/assets/desktop/email.png" alt="Email" className="menu-icon" />
          <p>
            <span className="menu-text">Email</span>
            <span className="menu-arrow">🡆</span>
          </p>
          <div
            className="dropdown-content"
            onClick={() => navigator.clipboard.writeText('haydencjanes@gmail.com')}
            title="Click to copy to clipboard"
          >
            <p>haydencjanes@gmail.com</p>
          </div>
        </div>
        <div className="menu-item">
          <img src="/assets/desktop/discord.png" alt="Discord" className="menu-icon" />
          <p>
            <span className="menu-text">Discord</span>
            <span className="menu-arrow">🡆</span>
          </p>
          <div
            className="dropdown-content"
            onClick={() => navigator.clipboard.writeText('Hayden#0420')}
            title="Click to copy to clipboard"
          >
            <p>Hayden#0420</p>
          </div>
        </div>
          <div className="menu-item">
            <img src="/assets/desktop/calculator.png" alt="Calculator" className="menu-icon" />
            <p>
              <span className="menu-text">Calculator</span>
            </p>
          </div>
          <div className="menu-item">
            <img src="/assets/desktop/clock.png" alt="Stopwatch" className="menu-icon" />
            <p>
              <span className="menu-text">Stopwatch</span>
            </p>
          </div>
          <div className="menu-item">
            <img src="/assets/desktop/coffee.png" alt="GitHub" className="menu-icon" />
            <span className="menu-text">Buy Me a Coffee</span>
          </div>
        </div>
      </div>
    )}
    </div>
  );
}

export default App;
