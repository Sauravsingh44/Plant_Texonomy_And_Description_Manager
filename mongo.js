const mongoose = require('mongoose');
const fs = require('fs');

// Connect to MongoDB
mongoose.connect("mongodb+srv://sauravsingh70035:xXutu0DOz1fHGfEO@cluster0.zpkhx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(() => {
        console.log('Error');
    });

// Define the schema for the plant details
const plantSchema = new mongoose.Schema({
    commonName: String,
    scientificName: String,
    family: String,
    genus: String,
    height: String,
    leafShape: String,
    leafColor: String,
    flowerShape: String,
    flowerColor: [String], // Array of colors
    bloomingPeriod: String,
    soilType: String,
    waterRequirements: String,
    sunlightRequirements: String,
    nativeRange: String,
    distribution: String,
    uses: [String] // Array of uses
});

// Create a model using the schema
const Plant = mongoose.model('Plant', plantSchema);

// Read the JSON file and insert data into MongoDB
fs.readFile('Description.json', 'utf8', (err, data) => {
    if (err) {
        console.log('Error reading file:', err);
        return;
    }

    // Parse the JSON data
    const plantsData = JSON.parse(data);

    // Loop through the data and insert each plant
    for (const plantName in plantsData) {
        if (plantsData.hasOwnProperty(plantName)) {
            const plantDetails = plantsData[plantName];
            
            // Create a new document based on the plant details
            const plant = new Plant({
                commonName: plantDetails.commonName,
                scientificName: plantDetails.scientificName,
                family: plantDetails.family,
                genus: plantDetails.genus,
                height: plantDetails.height,
                leafShape: plantDetails.leafShape,
                leafColor: plantDetails.leafColor,
                flowerShape: plantDetails.flowerShape,
                flowerColor: plantDetails.flowerColor,
                bloomingPeriod: plantDetails.bloomingPeriod,
                soilType: plantDetails.soilType,
                waterRequirements: plantDetails.waterRequirements,
                sunlightRequirements: plantDetails.sunlightRequirements,
                nativeRange: plantDetails.nativeRange,
                distribution: plantDetails.distribution,
                uses: plantDetails.uses
            });

            // Insert the plant document into the database
            plant.save()
                .then(() => {
                    console.log(`${plantName} inserted successfully`);
                })
                .catch((err) => {
                    console.log('Error inserting data for', plantName, ':', err);
                });
        }
    }
});
