import "./footer.scss"

const Footer = () => {
  return (
    <div className="footer">
      <div className="socials">
        <span>
          <i className="fa-brands fa-facebook-f"></i>
        </span>
        <span>
          <i className="fa-brands fa-instagram"></i>
        </span>
        <span>
          <i className="fa-brands fa-twitter"></i>
        </span>
        <span>
          <i className="fa-brands fa-youtube"></i>
        </span>
      </div>
      <div className="footerColumns">
        <div className="footerCol footerCol-1">
          <ul>
            <li>
              <a href="/#">Audio Description</a>
            </li>
            <li>
              <a href="/#">Investor Relations</a>
            </li>
            <li>
              <a href="/#">Legal Notices</a>
            </li>
          </ul>
        </div>
        <div className="footerCol footerCol-2">
          <ul>
            <li>
              <a href="/#">Help Centre</a>
            </li>
            <li>
              <a href="/#">Jobs</a>
            </li>
            <li>
              <a href="/#">Cookie Preference</a>
            </li>
          </ul>
        </div>
        <div className="footerCol footerCol-3">
          <ul>
            <li>
              <a href="/#">Gift Cards</a>
            </li>
            <li>
              <a href="/#">Terms of Use</a>
            </li>
            <li>
              <a href="/#">Corporate Information</a>
            </li>
          </ul>
        </div>
        <div className="footerCol footerCol-4">
          <ul>
            <li>
              <a href="/#">Media Centre</a>
            </li>
            <li>
              <a href="/#">Privacy</a>
            </li>
            <li>
              <a href="/#">Contact Us</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footerEnd">
        <select
          name="language"
          id="language"
        >
          <option value="english">English</option>
        </select>
        <p>&copy;{new Date().getFullYear()} Flixxit, Inc.</p>
      </div>
    </div>
  )
}

export default Footer
