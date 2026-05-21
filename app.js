// Toyota Motor Europe Holiday Calendar - JavaScript

// TME Team Members
const teamMembers = [
    'Alexander Joossens',
    'Alvaro Pena',
    'Edwin Brinza',
    'Iulia Caravasile',
    'Jairaj Kumar',
    'Monica Besleaga'
];

// Current logged-in user (in production, this would come from authentication)
let currentUser = 'Alexander Joossens';

// Holidays data - loaded from server API
let holidays = [];

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let selectedFilter = 'all';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                   'July', 'August', 'September', 'October', 'November', 'December'];
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// API base URL
const API_URL = 'http://localhost:3000/api/holidays';

// Load holidays from server API
async function loadHolidays() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        holidays = data.holidays || [];
        renderCalendar();
    } catch (error) {
        console.error('Error loading holidays:', error);
        alert('⚠️ Could not connect to server. Please make sure the server is running:\n\nnpm start');
        holidays = [];
        renderCalendar();
    }
}

// Save holiday to server API
async function saveHolidayToServer(holiday) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(holiday)
        });
        
        if (!response.ok) {
            throw new Error('Failed to save holiday');
        }
        
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error saving holiday:', error);
        throw error;
    }
}

function renderCalendar() {
    const calendar = document.getElementById('calendar');
    const monthDisplay = document.getElementById('currentMonth');
    
    monthDisplay.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    
    // Clear calendar
    calendar.innerHTML = '';
    
    // Add day headers
    dayNames.forEach(day => {
        const header = document.createElement('div');
        header.className = 'day-header';
        header.textContent = day;
        calendar.appendChild(header);
    });
    
    // Get first day of month and number of days
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
    
    // Add previous month's days
    for (let i = firstDay - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        const cell = createDayCell(day, true, false);
        calendar.appendChild(cell);
    }
    
    // Add current month's days
    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = day === currentDate.getDate() && 
                       currentMonth === currentDate.getMonth() && 
                       currentYear === currentDate.getFullYear();
        const cell = createDayCell(day, false, isToday);
        calendar.appendChild(cell);
    }
    
    // Add next month's days
    const totalCells = calendar.children.length - 7; // Subtract headers
    const remainingCells = 42 - totalCells; // 6 rows * 7 days
    for (let day = 1; day <= remainingCells; day++) {
        const cell = createDayCell(day, true, false);
        calendar.appendChild(cell);
    }
    
    updateStats();
}

function createDayCell(day, isOtherMonth, isToday) {
    const cell = document.createElement('div');
    cell.className = 'day-cell';
    
    if (isOtherMonth) cell.classList.add('other-month');
    if (isToday) cell.classList.add('today');
    
    const dateObj = new Date(currentYear, currentMonth, day);
    const dayOfWeek = dateObj.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) cell.classList.add('weekend');
    
    const dayNumber = document.createElement('div');
    dayNumber.className = 'day-number';
    dayNumber.textContent = day;
    cell.appendChild(dayNumber);
    
    if (!isOtherMonth) {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayHolidays = getHolidaysForDate(dateStr);
        
        if (dayHolidays.length > 0) {
            const holidaysList = document.createElement('div');
            holidaysList.className = 'holidays-list';
            
            dayHolidays.forEach(holiday => {
                const item = document.createElement('div');
                item.className = 'holiday-item';
                item.innerHTML = `
                    <span class="holiday-name">${holiday.type}</span>
                    <span class="holiday-person">${holiday.person}</span>
                    <button class="delete-holiday-btn" onclick="deleteHoliday(${holiday.id}, event)" title="Delete holiday">✕</button>
                `;
                holidaysList.appendChild(item);
            });
            
            cell.appendChild(holidaysList);
        }
    }
    
    cell.onclick = () => {
        if (!isOtherMonth) {
            document.getElementById('startDate').value = 
                `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            document.getElementById('endDate').value = 
                `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            openAddModal();
        }
    };
    
    return cell;
}

function getHolidaysForDate(dateStr) {
    return holidays.filter(holiday => {
        const start = new Date(holiday.startDate);
        const end = new Date(holiday.endDate);
        const current = new Date(dateStr);
        const dateMatch = current >= start && current <= end;
        
        // Apply team member filter
        if (selectedFilter === 'all') {
            return dateMatch;
        } else {
            return dateMatch && holiday.person === selectedFilter;
        }
    });
}

function filterByTeamMember() {
    selectedFilter = document.getElementById('teamFilter').value;
    renderCalendar();
}

function updateStats() {
    // Filter holidays that overlap with current month
    const monthHolidays = holidays.filter(h => {
        const start = new Date(h.startDate);
        const end = new Date(h.endDate);
        const monthStart = new Date(currentYear, currentMonth, 1);
        const monthEnd = new Date(currentYear, currentMonth + 1, 0);
        
        // Check if holiday overlaps with current month
        return (start <= monthEnd && end >= monthStart);
    });
    
    document.getElementById('totalHolidays').textContent = monthHolidays.length;
    
    const uniquePeople = new Set(monthHolidays.map(h => h.person));
    document.getElementById('teamMembers').textContent = uniquePeople.size;
    
    // Calculate next holiday
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day
    const futureHolidays = holidays.filter(h => new Date(h.startDate) > today)
        .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    
    if (futureHolidays.length > 0) {
        const nextDate = new Date(futureHolidays[0].startDate);
        nextDate.setHours(0, 0, 0, 0);
        const daysUntil = Math.ceil((nextDate - today) / (1000 * 60 * 60 * 24));
        document.getElementById('nextHoliday').textContent = daysUntil;
    } else {
        document.getElementById('nextHoliday').textContent = '-';
    }
}

function previousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
}

function goToToday() {
    currentDate = new Date();
    currentMonth = currentDate.getMonth();
    currentYear = currentDate.getFullYear();
    renderCalendar();
}

function openAddModal() {
    document.getElementById('addModal').classList.add('active');
    // Pre-select current user in dropdown
    document.getElementById('personName').value = currentUser;
}

function closeModal() {
    document.getElementById('addModal').classList.remove('active');
}

async function addHoliday(event) {
    event.preventDefault();
    
    const selectedPerson = document.getElementById('personName').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const type = document.getElementById('holidayType').value;
    
    // In production: Only allow users to add their own holidays
    // For demo purposes, we'll allow adding for any team member
    // Uncomment below for production:
    // if (selectedPerson !== currentUser) {
    //     alert('You can only add holidays for yourself!');
    //     return;
    // }
    
    // Check for overlapping holidays for the same person
    const newStart = new Date(startDate);
    const newEnd = new Date(endDate);
    
    const hasOverlap = holidays.some(h => {
        if (h.person !== selectedPerson) return false;
        
        const existingStart = new Date(h.startDate);
        const existingEnd = new Date(h.endDate);
        
        // Check if dates overlap
        return (newStart <= existingEnd && newEnd >= existingStart);
    });
    
    if (hasOverlap) {
        alert(`❌ Cannot add holiday!\n\n${selectedPerson} already has a holiday booked during this period.\n\nPlease choose different dates.`);
        return;
    }
    
    const holiday = {
        person: selectedPerson,
        startDate: startDate,
        endDate: endDate,
        type: type
    };
    
    try {
        // Save to server
        await saveHolidayToServer(holiday);
        
        // Reload holidays from server
        await loadHolidays();
        
        closeModal();
        
        // Reset form
        event.target.reset();
        
        alert(`✅ Holiday added successfully for ${selectedPerson}!`);
    } catch (error) {
        alert('❌ Failed to add holiday. Please try again.');
    }
}

function exportCalendar() {
    const dataStr = JSON.stringify(holidays, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `toyota-holidays-${currentYear}-${currentMonth + 1}.json`;
    link.click();
}

// Load holidays from server on startup
window.onload = function() {
    loadHolidays();
};

// Delete holiday function
async function deleteHoliday(holidayId, event) {
    event.stopPropagation(); // Prevent day cell click event
    
    const holiday = holidays.find(h => h.id === holidayId);
    if (!holiday) {
        alert('❌ Holiday not found!');
        return;
    }
    
    // Confirm deletion
    const confirmDelete = confirm(`Are you sure you want to delete this holiday?\n\nPerson: ${holiday.person}\nDates: ${holiday.startDate} to ${holiday.endDate}\nType: ${holiday.type}`);
    
    if (!confirmDelete) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/${holidayId}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete holiday');
        }
        
        // Reload holidays from server
        await loadHolidays();
        
        alert(`✅ Holiday deleted successfully!`);
    } catch (error) {
        console.error('Error deleting holiday:', error);
        alert('❌ Failed to delete holiday. Please try again.');
    }
}

// Simulate monthly email reminder (would be server-side in production)
function checkMonthlyReminder() {
    const today = new Date();
    if (today.getDate() === 1) {
        console.log('📧 Monthly reminder: Please update your holiday planning!');
        // In production: trigger email via backend
    }
}

// Made with Bob
