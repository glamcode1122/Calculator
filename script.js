// script.js
document.addEventListener('DOMContentLoaded', function() {
    const provinceSelect = document.getElementById('province');
    const suburbInput = document.getElementById('suburb');
    const searchBtn = document.getElementById('searchBtn');
    const stageElement = document.getElementById('stage');
    const nextChangeElement = document.getElementById('nextChange');
    const scheduleContainer = document.getElementById('scheduleContainer');
    const applianceTips = document.getElementById('applianceTips');
    
    // Mock data for demonstration (in a real app, use EskomSePush API)
    const mockSchedule = [
        { start: "08:00", end: "10:30", stage: 2, power: false },
        { start: "12:00", end: "14:30", stage: 2, power: false },
        { start: "16:00", end: "18:30", stage: 3, power: false },
        { start: "20:00", end: "22:30", stage: 4, power: false }
    ];
    
    // Appliance recommendations
    const applianceSuggestions = [
        { 
            name: "Washing Machine", 
            icon: "fas fa-washing-machine",
            tip: "Run during daytime power windows to maximize solar efficiency" 
        },
        { 
            name: "Electric Oven", 
            icon: "fas fa-fire-burner",
            tip: "Cook during off-peak power windows to save electricity" 
        },
        { 
            name: "Water Heater", 
            icon: "fas fa-water",
            tip: "Heat water 1 hour before load shedding starts" 
        },
        { 
            name: "Computers", 
            icon: "fas fa-laptop",
            tip: "Save work frequently and use UPS during shedding" 
        },
        { 
            name: "EV Charging", 
            icon: "fas fa-car-battery",
            tip: "Schedule charging during Stage 1 periods only" 
        }
    ];
    
    // Initialize appliance tips
    function renderApplianceTips() {
        applianceTips.innerHTML = '';
        applianceSuggestions.forEach(appliance => {
            const card = document.createElement('div');
            card.className = 'appliance-card';
            card.innerHTML = `
                <i class="${appliance.icon}"></i>
                <div>
                    <h3>${appliance.name}</h3>
                    <p>${appliance.tip}</p>
                </div>
            `;
            applianceTips.appendChild(card);
        });
    }
    
    // Display schedule
    function renderSchedule(schedule) {
        scheduleContainer.innerHTML = '';
        
        schedule.forEach(period => {
            const item = document.createElement('div');
            item.className = `schedule-item ${period.power ? 'power-on' : ''}`;
            
            item.innerHTML = `
                <div>
                    <strong>${period.start} - ${period.end}</strong>
                    <div>Stage ${period.stage}</div>
                </div>
                <div class="power-status">
                    ${period.power ? 
                        '<span class="power-on"><i class="fas fa-plug-circle-check"></i> Power ON</span>' : 
                        '<span class="power-off"><i class="fas fa-plug-circle-xmark"></i> Power OFF</span>'}
                </div>
            `;
            
            scheduleContainer.appendChild(item);
        });
    }
    
    // Update current status
    function updateCurrentStatus() {
        // In a real app, this would come from API
        const currentStage = Math.floor(Math.random() * 4) + 1;
        const nextChangeHours = new Date().getHours() + 2;
        
        stageElement.textContent = `Stage: ${currentStage}`;
        nextChangeElement.textContent = `Next change: ${nextChangeHours}:00`;
    }
    
    // Event listeners
    searchBtn.addEventListener('click', function() {
        const suburb = suburbInput.value.trim();
        const province = provinceSelect.value;
        
        if (!suburb) {
            alert("Please enter your suburb");
            return;
        }
        
        // Show loading state
        scheduleContainer.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Fetching schedule...</div>';
        
        // Simulate API delay
        setTimeout(() => {
            updateCurrentStatus();
            renderSchedule(mockSchedule);
        }, 1500);
    });
    
    // Initialize
    renderApplianceTips();
    updateCurrentStatus();
});