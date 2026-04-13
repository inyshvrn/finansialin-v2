import Image from "next/image";
import "../style/settings.css";

export default function SettingsPage() {
  return (
    <div className="settings-container">
      {/* Sidebar bisa dipisah jadi komponen sendiri nanti */}
      <aside className="sidebar">
        <div className="logo-section">
          <Image src="/logo.svg" alt="Logo" width={60} height={60} />
          <span>FINANSIALIN</span>
        </div>
        <nav className="menu">
          <div className="menu-item">Dashboard</div>
          <div className="menu-item">Transactions</div>
          <div className="menu-item">Budgeting</div>
          <div className="menu-item">Statistics</div>
          <div className="menu-item active">Settings</div>
        </nav>
        <div className="logout">Logout</div>
      </aside>

      <main className="main-content">
        <header className="top-bar">
          <h2>Settings</h2>
          <div className="search-notif">
            <input type="text" placeholder="Type to search" className="search-input" />
            <div className="icon-bell"></div>
            <div className="user-avatar-small"></div>
          </div>
        </header>

        <div className="tabs">
          <button className="tab active">Edit Profile</button>
          <button className="tab">Preferences</button>
        </div>

        <section className="profile-card">
          <div className="profile-photo-section">
            <div className="photo-wrapper">
              <Image src="/profile-user.jpg" alt="Profile" width={120} height={120} className="main-photo" />
              <button className="btn-edit-photo">📷</button>
            </div>
          </div>

          <form className="settings-form">
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input type="text" defaultValue="Zafira" />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" defaultValue="Noerr" />
              </div>
            </div>

            <div className="form-group">
              <label>Email</label>
              <div className="input-with-icon">
                <input type="email" defaultValue="ZafiraNackKeche@gmail.com" />
                <span className="lock-icon">🔒</span>
              </div>
            </div>

            <div className="form-group">
              <label>Occupation</label>
              <input type="text" defaultValue="Student" />
            </div>

            <div className="form-group">
              <label>Bio</label>
              <textarea defaultValue="Target: Hemat buat beli MacBook Air M3"></textarea>
            </div>

            <button type="submit" className="btn-save">
              Save Change
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
