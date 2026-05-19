# 🚗 Toyota Motor Europe - Holiday Calendar

> A modern, full-stack web application for managing team holiday planning with real-time updates and Toyota branding.

---

## 🎯 **What is This?**

The Toyota Motor Europe Holiday Calendar is a web application that helps our team manage and view holiday schedules. Simply add your holidays through the calendar interface, and they're automatically saved for everyone to see. No Excel sheets, no manual updates - just click, add, and done!

---

## ✨ **Key Features**

### 📅 **Interactive Calendar**
- Month/year navigation with intuitive controls
- Visual holiday display with color-coded entries
- Weekend and current day highlighting
- Click-to-add holiday functionality

### 👥 **Team Management**
- Pre-configured TME team members:
  - Alexander Joossens (Data & AI Engineer)
  - Alvaro Pena (Data Engineer)
  - Edwin Brinza (Business Transformation Consultant)
  - Iulia Caravasile
  - Jairaj Kumar (Solution Architect)
  - Monica Besleaga (Solution Architect)

### 🔍 **Smart Filtering**
- Filter calendar by individual team member
- View all holidays or specific person's schedule
- Real-time calendar updates

### 💾 **Automatic Saving**
- All changes save instantly to `holidays.json`
- No manual file management needed
- Changes persist across sessions
- Everyone sees the same data

### 🎨 **Toyota Branding**
- Official Toyota red (#eb0a1e) color scheme
- Professional gradient design
- Corporate styling throughout
- Responsive mobile-friendly layout

### 📊 **Dashboard Statistics**
- Total holidays this month
- Team members currently on leave
- Days until next holiday

---

## 💡 **How to Use the App**

### **Adding a Holiday**
1. Click the **"➕ Add Holiday"** button (or click any day on calendar)
2. Select your name from dropdown
3. Choose start date
4. Choose end date
5. Select holiday type (Annual Leave, Sick Leave, etc.)
6. Click **"Add Holiday"**
7. ✅ Done! Holiday is saved automatically

### **Viewing Holidays**
- **All Team**: Select "All Team Members" from filter
- **Specific Person**: Select name from filter dropdown
- **Navigate Months**: Use ◀ Previous / Next ▶ buttons
- **Jump to Today**: Click 📅 Today button

### **Exporting Data**
- Click **"📥 Export"** button
- Downloads JSON file with all holidays
- Can be imported into Excel or other tools

---

## 🎯 **Use Cases**

- **Team Planning**: View entire team's holiday schedule
- **Conflict Detection**: Identify overlapping absences
- **Personal Tracking**: Manage your own holiday requests
- **Statistics**: Monitor team availability
- **Export**: Download holiday data as JSON

---

## 🚀 **How to Run**

### **Step 1: Open Terminal**
- Press `Cmd + Space`, type "Terminal", press Enter
- Or find Terminal in Applications → Utilities

### **Step 2: Navigate to Project**
```bash
cd /Users/alexanderjoossens/Desktop/toyota-holiday-calendar
```

### **Step 3: Install Dependencies** (First time only)
```bash
npm install
```
*This downloads all required packages. Takes about 30 seconds.*

### **Step 4: Start the Server**
```bash
npm start
```

You'll see this beautiful banner:
```
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🚗 TOYOTA MOTOR EUROPE - Holiday Calendar Server       ║
║                                                            ║
║   Server running on: http://localhost:3000                ║
║                                                            ║
║   📅 Open in browser: http://localhost:3000              ║
║   📊 API endpoint: http://localhost:3000/api/holidays    ║
║                                                            ║
║   Press Ctrl+C to stop the server                         ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

### **Step 5: Open in Browser**
- The app will automatically open in Safari
- Or manually visit: **http://localhost:3000**

**That's it! You're ready to use the app! 🎉**

---

## 🛑 **How to Stop**

In the Terminal window where the server is running:
- Press `Ctrl + C`
- The server will shut down gracefully

---

## 🔄 **Daily Usage**

**Every time you want to use the app:**

1. Open Terminal
2. Run: `cd /Users/alexanderjoossens/Desktop/toyota-holiday-calendar`
3. Run: `npm start`
4. Open browser to http://localhost:3000
5. When done, press `Ctrl+C` in Terminal

---

## 🏗️ **Technical Architecture**

### **Backend (Node.js + Express)**
- RESTful API endpoints for CRUD operations
- JSON file-based database
- CORS enabled for local development
- Automatic file persistence

### **Frontend (Vanilla JavaScript)**
- No framework dependencies
- Clean separation: HTML, CSS, JS
- Async/await API calls
- Real-time UI updates

### **Database**
- `holidays.json` - Single source of truth
- Automatic updates via API
- Version controlled with Git

---

## 📁 **Project Structure**

```
toyota-holiday-calendar/
├── server.js          # Express server & API endpoints
├── app.js             # Frontend JavaScript logic
├── styles.css         # Toyota-branded styling
├── index.html         # Main HTML structure
├── holidays.json      # JSON database
├── package.json       # Node.js dependencies
├── .gitignore         # Git exclusions
└── README.md          # This file
```

---

## 🔌 **API Endpoints**

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/holidays` | Fetch all holidays |
| `POST` | `/api/holidays` | Add new holiday |
| `PUT` | `/api/holidays/:id` | Update holiday |
| `DELETE` | `/api/holidays/:id` | Delete holiday |

---

## 🔧 **Troubleshooting**

### **"Command not found: npm"**
- Node.js is not installed
- Download from https://nodejs.org/
- Restart Terminal after installation

### **"Port 3000 already in use"**
- Another app is using port 3000
- Stop other server or change port in `server.js`

### **"Cannot connect to server"**
- Make sure server is running (`npm start`)
- Check Terminal for error messages
- Try restarting: `Ctrl+C` then `npm start`

### **"Changes not saving"**
- Check Terminal for errors
- Ensure `holidays.json` file exists
- Restart server if needed

---

## 🛠️ **Development Mode**

For developers who want auto-reload on code changes:

```bash
npm run dev
```

Uses `nodemon` to automatically restart server when files change.

---

## 🌐 **Browser Support**

- ✅ Chrome/Edge (latest)
- ✅ Safari (latest)
- ✅ Firefox (latest)
- ✅ Mobile browsers

---

## 🔒 **Security Notes**

**Current Setup (Development):**
- No authentication required
- All team members can add holidays for anyone
- Suitable for trusted team environments

**Production Recommendations:**
- Add user authentication (SSO/Azure AD)
- Implement role-based access control
- Users can only edit their own holidays
- Add audit logging
- Use HTTPS only

---

## 📝 **Future Enhancements**

- [ ] Email notifications for new holidays
- [ ] Monthly reminder automation
- [ ] Box API integration
- [ ] User authentication
- [ ] Approval workflow
- [ ] iCal export
- [ ] Mobile app (PWA)

---

## 📋 **Prerequisites**

Before running the app, make sure you have:

### **Node.js** (Required)
- **What**: JavaScript runtime to run the server
- **Version**: 14.0 or higher
- **Check if installed**: Open Terminal and type `node --version`
- **Download**: https://nodejs.org/ (choose LTS version)

### **npm** (Comes with Node.js)
- **What**: Package manager for installing dependencies
- **Check if installed**: Open Terminal and type `npm --version`

### **Web Browser** (Required)
- Safari, Chrome, Firefox, or Edge
- Any modern browser works!

---

## 📦 **Dependencies**

- **express** - Web server framework
- **cors** - Cross-origin resource sharing
- **body-parser** - JSON request parsing
- **nodemon** - Development auto-reload (dev only)

---

## 🤝 **Support**

**Having issues?**
1. Check the Troubleshooting section above
2. Restart the server (`Ctrl+C` then `npm start`)
3. Contact the development team

---

## 👨‍💻 **Built For**

**Toyota Motor Europe Team**  
Data & AI Engineering Department

---

## 📄 **License**

Internal use only - Toyota Motor Europe

---

**🚗 Drive your holiday planning forward with Toyota!**