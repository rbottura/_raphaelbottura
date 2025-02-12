import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

// Resolve __dirname in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectsFilePath = path.join(__dirname, '../store/projects.json');

// Setup readline for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Helper function to prompt user input
const askQuestion = (query) => new Promise(resolve => rl.question(query, resolve));

// Function to get images from a folder
const getImagesFromFolder = (folderName) => {
    const mediaPath = path.join(__dirname, '../public/medias', folderName);
    return fs.existsSync(mediaPath)
        ? fs.readdirSync(mediaPath)
            .filter(file => /\.(png|jpg|jpeg|webp|gif)$/i.test(file))
            .map(file => `./${folderName}/${file}`)
        : [];
};

// Function to read existing projects
const getExistingProjects = () => {
    if (!fs.existsSync(projectsFilePath)) {
        console.log("⚠️ projects.json not found. Creating a new one...");
        return [];
    }
    return JSON.parse(fs.readFileSync(projectsFilePath, 'utf8'));
};

// Function to update projects.json
const updateProjectsFile = (newProject, projects) => {
    const updatedProjects = [newProject, ...projects]; // New project goes first

    fs.writeFileSync(projectsFilePath, JSON.stringify(updatedProjects, null, 4), 'utf8');
    console.log("✅ projects.json updated successfully!");
};

// Main function
const createProject = async () => {
    const title = await askQuestion("Project Title: ");
    const type = await askQuestion("Project Type (creative/it): ");
    const tags = await askQuestion("Tags (comma-separated): ");
    const description = await askQuestion("Description: ");
    const link = await askQuestion("Project Link (or leave empty): ");
    const repoLink = await askQuestion("Repo Link (or leave empty): ");
    const folderName = await askQuestion("Folder Name for Images: ");
    const beginDate = await askQuestion("begin Date: ");
    const endDate = await askQuestion("end Date: ");

    // Fetch image list
    const images = getImagesFromFolder(folderName);

    // Create the new project object
    const newProject = {
        title,
        type,
        tags: tags.split(',').map(tag => tag.trim()),
        description,
        link: link || null,
        repoLink: repoLink || null,
        images,
        beginDate,
        endDate
    };

    // Get existing projects
    const existingProjects = getExistingProjects();

    // Update the projects.json file
    updateProjectsFile(newProject, existingProjects);

    rl.close();
};

// Run the script
createProject();
