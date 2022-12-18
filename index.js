const { parse } = require("csv-parse");

const fs = require("fs");
const results = [];
const variablePLent= []

// Function filter the kind of planet we want 
function isItPlanet( Planet ) {
    return Planet[ "koi_disposition" ] === "CONFIRMED" && Planet[ "koi_insol" ] > 0.36 && Planet[ "koi_insol" ] < 1.11 && Planet['koi_prad'] <1.6 ;
}


fs.createReadStream("kepler_data.csv")
	// The pipe  method  connects two methods together .it take readable file to writeable file
	.pipe(
		parse({
			comment: "#",
			columns:true
		})
	)
	// Pushing the date to  the  results array
    .on( "data", ( data ) => {
        // Adding data to the results array only if the data match's  the isItPlanet function 
        if ( isItPlanet( data ) ) {
          variablePLent.push(data);
        }
          
	})

	// Printing  any arros that may occur
	.on("error", (err) => {
		console.error(err);
	})

	// printing the end result
    .on( "end", () => {
        // Printing the name of the planet 
        console.log( variablePLent.map( ( Planet ) => {
            return Planet["kepoi_name"];
        }));
		console.log(` ${variablePLent.length} plant found  `);
		console.log("Done");
	});
