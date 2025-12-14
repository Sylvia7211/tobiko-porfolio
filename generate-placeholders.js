const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Function to create a placeholder image
function createPlaceholderImage(width, height, text, bgColor, textColor, outputPath) {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    // Draw background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);
    
    // Add text
    ctx.fillStyle = textColor;
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Handle multi-line text
    const lines = text.split('\n');
    const lineHeight = 30;
    const startY = (height - (lines.length * lineHeight)) / 2;
    
    lines.forEach((line, index) => {
        ctx.fillText(line, width / 2, startY + (index * lineHeight));
    });
    
    // Save to file
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);
}

// Create project placeholders
const projectsDir = path.join(__dirname, 'assets', 'images', 'projects');
const projects = [
    { name: 'analytics-dashboard.jpg', text: 'Analytics\nDashboard' },
    { name: 'bi-project.jpg', text: 'BI\nProject' },
    { name: 'ml-project.jpg', text: 'Machine\nLearning' },
    { name: 'nlp-project.jpg', text: 'NLP\nProject' },
    { name: 'risk-dashboard.jpg', text: 'Risk\nDashboard' },
    { name: 'ml-model.jpg', text: 'ML\nModel' }
];

// Create profile placeholder
const profileDir = path.join(__dirname, 'assets', 'images', 'profile');
createPlaceholderImage(800, 800, 'Profile\nPhoto', '#3b82f6', '#ffffff', 
    path.join(profileDir, 'profile.jpg'));

// Create university placeholders
const universityDir = path.join(__dirname, 'assets', 'images', 'university');
const universityImages = [
    { name: 'analytics-building.jpg', text: 'Analytics\nBuilding' },
    { name: 'computer-science-building.jpg', text: 'Computer\nScience' },
    { name: 'mathematics-building.jpg', text: 'Mathematics\nBuilding' }
];

// Create directories if they don't exist
[projectsDir, profileDir, universityDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Generate project placeholders
projects.forEach(project => {
    createPlaceholderImage(800, 600, project.text, '#4f46e5', '#ffffff', 
        path.join(projectsDir, project.name));
});

// Generate university placeholders
universityImages.forEach(img => {
    createPlaceholderImage(800, 600, img.text, '#1e40af', '#ffffff', 
        path.join(universityDir, img.name));
});

console.log('Placeholder images generated successfully!');
