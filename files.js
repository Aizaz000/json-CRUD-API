const fs = require('fs').promises;
const dataFile = 'data.json';

// Helper function to read data from the JSON file
async function readData() {
    try {
        const data = await fs.readFile(dataFile, 'utf8');
        return JSON.parse(data); // Return parsed data
    } catch (err) {
        console.error("Error reading data:", err); // Log the error if there's an issue reading the file
        return []; // Return an empty array if there's an error
    }
}

// Helper function to write data to the JSON file
async function writeData(data) {
    try {
        await fs.writeFile(dataFile, JSON.stringify(data, null, 2)); // Write the formatted data back to the file
        console.log("Data saved successfully.");
    } catch (err) {
        console.error("Error writing data:", err); // Log the error if writing fails
    }
}

// Create a new item
async function createItem(newItem) {
    const data = await readData(); // Read current data
    data.push(newItem); // Add the new item to the data array
    await writeData(data); // Save the updated data back to the file
    console.log("Item created:", newItem); // Log the creation
}

// Read all items (updated to return the data properly)
async function readItems() {
    const data = await readData(); // Read the data from the file
    return data; // Return the data to the caller
}

// Update an item by ID
async function updateItem(id, updatedFields) {
    const data = await readData(); // Read the current data
    const index = data.findIndex(item => item.id === id); // Find the item by ID
    if (index !== -1) {
        data[index] = { ...data[index], ...updatedFields }; // Update the item with the new fields
        await writeData(data); // Save the updated data
        console.log("Item updated:", data[index]); // Log the update
    } else {
        console.log(`Item with ID ${id} not found.`); // Log if the item was not found
    }
}

// Delete an item by ID
async function deleteItem(id) {
    const data = await readData(); // Read the current data
    const newData = data.filter(item => item.id !== id); // Filter out the item with the given ID
    if (newData.length !== data.length) {
        await writeData(newData); // Save the updated data if an item was deleted
        console.log(`Item with ID ${id} deleted.`); // Log the deletion
    } else {
        console.log(`Item with ID ${id} not found.`); // Log if the item was not found
    }
}

// Export the functions that are needed by the server
module.exports = { createItem, readItems, updateItem, deleteItem };
