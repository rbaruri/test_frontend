import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Transform Your Learning Journey</h1>
          <p>
            Upload your syllabus and get a personalized learning path with smart progress tracking
            and interactive quizzes.
          </p>
          <div className="hero-buttons">
            <Link to="/signup" className="cta-button">
              Get Started
            </Link>
            <Link to="/login" className="secondary-button">
              Sign In
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="/hero-illustration.svg" alt="Learning illustration" />
        </div>
      </section>

      <section className="features-section">
        <h2>Why Choose Our Platform?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-magic"></i>
            </div>
            <h3>Smart Learning Path</h3>
            <p>
              Our AI analyzes your syllabus and creates a personalized learning schedule
              that adapts to your pace.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3>Progress Tracking</h3>
            <p>
              Monitor your learning progress with detailed analytics and stay motivated
              with achievement badges.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-brain"></i>
            </div>
            <h3>Interactive Learning</h3>
            <p>
              Engage with interactive quizzes and focus timers designed to maximize
              your learning efficiency.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-clock"></i>
            </div>
            <h3>Time Management</h3>
            <p>
              Optimize your study schedule with smart time allocation and reminder
              systems.
            </p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Upload Syllabus</h3>
            <p>Simply upload your course syllabus in PDF or Word format.</p>
          </div>

          <div className="step-arrow">
            <i className="fas fa-arrow-right"></i>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <h3>Get Learning Path</h3>
            <p>Our AI generates a personalized learning schedule.</p>
          </div>

          <div className="step-arrow">
            <i className="fas fa-arrow-right"></i>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <h3>Start Learning</h3>
            <p>Follow your path and track your progress.</p>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>
                "This platform has completely transformed how I study. The personalized
                learning path helped me stay organized and focused."
              </p>
            </div>
            <div className="testimonial-author">
              <img src="/avatar1.jpg" alt="Sarah" className="author-avatar" />
              <div className="author-info">
                <h4>Sarah Johnson</h4>
                <p>Computer Science Student</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>
                "The interactive quizzes and progress tracking features make learning
                more engaging and help me stay motivated."
              </p>
            </div>
            <div className="testimonial-author">
              <img src="/avatar2.jpg" alt="Michael" className="author-avatar" />
              <div className="author-info">
                <h4>Michael Chen</h4>
                <p>Engineering Student</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Transform Your Learning Experience?</h2>
        <p>Join thousands of students who have already improved their study habits.</p>
        <Link to="/signup" className="cta-button">
          Get Started Now
        </Link>
      </section>
    </div>
  );
};

export default Landing;
