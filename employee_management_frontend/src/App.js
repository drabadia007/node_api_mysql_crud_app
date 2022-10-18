import "./App.css";
import Employee from "./components/Employee";
import StudentList from "./components/StudentList";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyAlert from "./components/MyAlert";
import { useState } from "react";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (type, message) => {
    setAlert({
      type: type,
      message: message,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <MyAlert alert={alert} />
        <Container>
          <Routes>
            <Route
              path="employee"
              element={<Employee showAlert={showAlert} />}
            />
            <Route
              path="employee/:studentId"
              element={<Employee showAlert={showAlert} />}
            />
            <Route
              path="listEmployees"
              element={<StudentList showAlert={showAlert} />}
            />
          </Routes>
        </Container>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
