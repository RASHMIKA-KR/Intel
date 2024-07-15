import { Link } from 'react-router-dom';

function PdfHome() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/pdfs">PDFs List</Link>
          </li>
          <li>
            <Link to="/upload">Upload PDF</Link>
          </li>
        </ul>
      </nav>
      <div>
        <h1>Welcome to the PDF Management App</h1>
        <p>Select an option from the navigation menu.</p>
      </div>
    </div>
  );
}

export default PdfHome;
