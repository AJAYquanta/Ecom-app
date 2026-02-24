import { useEffect, useState } from "react";

function Footer() {
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateLiveDateTime = () => {
      const now = new Date();
      setCurrentDate(
        now.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        })
      );
      setCurrentTime(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        })
      );
    };

    updateLiveDateTime();
    const timer = setInterval(updateLiveDateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="app-footer">
      <div className="footer-live">
        <span>{currentDate}</span>
        <span>{currentTime}</span>
      </div>
      <p className="footer-copy"> @ 2026 MyShop. All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;
