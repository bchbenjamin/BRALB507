import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" width="200px" height="200px"/>

        <h1>Student Registration Form</h1>

        <div className="registration-box">
          <form>
            <label>Full Name</label>
            <input type="text" placeholder="Enter your name" />

            <label>Email</label>
            <input type="email" placeholder="Enter your email" />

            <label>Password</label>
            <input type="password" placeholder="Enter your password" />

            <label>Phone Number</label>
            <input type="tel" placeholder="Enter your phone number" />

            <label>Course</label>
            <select>
              <option value="">Select a course</option>
              <option value="cse">Computer Science</option>
              <option value="ise">Information Science</option>
              <option value="ece">Electronics & Communication</option>
              <option value="me">Mechanical Engineering</option>
            </select>

            <button type="submit">Register</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;