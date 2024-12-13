import React, { useState } from "react";
import instagramLogo from "./image/instagram.png"; // Instagram logo
import facebookLogo from "./image/facebook.png"; // Facebook logo
import pinterestLogo from "./image/pinterest.png"; // Pinterest logo
import twitterLogo from "./image/twitter.png"; // Twitter logo
import youtubeLogo from "./image/youtube.png"; // YouTube logo
import tiktokLogo from "./image/tik-tok.png"; // TikTok logo
import { Link } from "react-router-dom";

// this componeted i useed for my different project
const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    window.location.href = `mailto:Milad.Habibzada7@gmail.com?subject=Newsletter Subscription&body=Please add ${email} to your email list.`;
  };

  return (
    <footer id="unique-footer" className="unique-footer">
  <div className="unique-footer-container">
    {/* Help Section */}
    <div className="unique-footer-links">
      <div className="unique-footer-column">
        <h4>Help</h4>
        <ul>
          <li>
            <a href="https://wa.me/12896007457" target="_blank" rel="noopener noreferrer">
              Contact Us
            </a>
          </li>
          <li>
            <a  href="/LocationFinder/location.html">Find a Store</a>
          </li>
          <li>
          <Link to="/Try">About Us</Link> {/* Updated Link */}
          </li>
          <li>
            <a href="https://wa.me/12896007457" target="_blank" rel="noopener noreferrer">
              Careers
            </a>
          </li>
          <li>
            <a href="https://wa.me/12896007457" target="_blank" rel="noopener noreferrer">
              Give Us Feedback
            </a>
          </li>
        </ul>
      </div>
    </div>

    {/* Email Subscription Section */}
    <div className="unique-footer-subscribe">
      <h4>Join our email list</h4>
      <p>Get exclusive offers, the best in books, and more. You may <br /> unsubscribe at any time.</p>
      <form onSubmit={handleSubscribe} className="unique-subscribe-form">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Subscribe</button>
      </form>
      <div className="unique-footer-socials">
        <a
          href="https://www.instagram.com/milad.nazari42023?igsh=MTY2Mmx2d3h4dnU0eA%3D%3D&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <img src={instagramLogo} alt="Instagram" className="unique-social-logo" />
        </a>
        <a
          href="https://www.facebook.com/share/19aGmUkJye/?mibextid=LQQJ4d"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <img src={facebookLogo} alt="Facebook" className="unique-social-logo" />
        </a>
        <a
          href="https://pin.it/5QBoPw3VN"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Pinterest"
        >
          <img src={pinterestLogo} alt="Pinterest" className="unique-social-logo" />
        </a>
        <a
          href="https://x.com/Challenger77701"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
        >
          <img src={twitterLogo} alt="Twitter" className="unique-social-logo" />
        </a>
        <a
          href="https://www.youtube.com/@kinechallenger2205"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
        >
          <img src={youtubeLogo} alt="YouTube" className="unique-social-logo" />
        </a>
        <a
          href="https://www.tiktok.com/@kinechallenger"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TikTok"
        >
          <img src={tiktokLogo} alt="TikTok" className="unique-social-logo" />
        </a>
      </div>
    </div>
  </div>

  {/* Footer Bottom */}
  <div className="unique-footer-bottom">
    <p>© 2024 Your Bookstore. All rights reserved. | </p>
    <div>
      <a href="#">Privacy Policy</a> | <a href="#">Terms of Use</a>
    </div>
  </div>
</footer>

  );
};

export default Footer;
