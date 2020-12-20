    
    const dinos = [];
    let human = {};

    // Create Dino Constructor

    /**
    * @description Represents a dinosaur
    * @constructor   
    */
    function Dino(species, weight, height, diet, where, when, fact) {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.fact = fact;
    }

    // Create Dino Constructor

    /**
    * @description Represents a human
    * @constructor   
    */
    function Human(name, weight, height, diet, location) {
        this.name = name,
        this.weight = weight,
        this.height = height,
        this.diet = diet;
        this.location = location;
        this.species = 'Human';
    }

    /**
    * @description Creates Dino objects from the data provided in dino.json
    */
    fetch('./dino.json')
        .then(response => response.json())
        .then(data => {            
                
                //Create Dino Objects
                const dinos = data.Dinos.map((dino) => {
                    return new Dino(dino.species, dino.weight, dino.height, dino.diet, dino.where, dino.when, dino.fact);
                });         
                
                setDinos(dinos);                   

            }).catch(err => console.log(err)
        );
    
    /**
    * @description Set array of dinos to global variable, so i can access it later with getDinos();   
    * @param {array} dinos - Array of dinos
    */
    const setDinos = (dinos) => {
       this.dinos = dinos;       
    }

    /**
    * @description Getter for dinos   
    * @returns {array} this.dinos - Array of dinos 
    */
    const getDinos = () => {       
        return this.dinos;        
    }       

    /**
    * @description Add eventListener to btn
    * @returns {function} - handleFormSubmit()
    */
    (() => {
    
        const button = document.querySelector("#btn");
        
        button.addEventListener('click', () => {
            return handleFormSubmit();
        });

    })();

    /**
    * @description Get data from form, hide form, compare data, create and append tiles
    */
    const handleFormSubmit = () => {
                
        let gridData = getDinos();    

        // Use IIFE to get human data from form      
        // Create Human Object
        
        const human = (() => {         
            const name = document.querySelector("#name").value;
            const feet = document.querySelector("#feet").value;
            const inches = document.querySelector("#inches").value;
            const weight = document.querySelector("#weight").value;
            const diet = document.querySelector("#diet").value;     
            const location = document.querySelector("#location").value;     
            const height = feet;      
    
            return new Human(name, weight, height, diet, location);    
        })();
                
        gridData = gridData.sort(() => Math.random() - 0.5);
        gridData.insert(4, human);

        //hide form
        const form = document.querySelector(".form-container");        
        changeElemVisibility(form);

        //create tiles                        
        generateGrid(gridData, human);        

    }
        
    /**
    * @description Generate html grid, append tiles and populate with data
    */
    const generateGrid = (tileContent, human) => {     

        const grid = document.querySelector("#grid");                     

        // Generate Tiles for each Dino in Array
        tileContent.forEach((content) => {

            const tile = document.createElement("div");            
            const tileTitle = content instanceof Dino ? content.species : content.name;          
            tile.classList.add("grid-item");          
            
            tile.innerHTML = `
                <h3> ${tile.innerHTML = tileTitle}</h3>
                <img src="images/${content.species}.png" alt="Dinosaur or Human">                                            
                ${getFact(content, human)}                                               
            `;                                

            // Add tiles to DOM
            grid.appendChild(tile);

        });
       
    } 

    /**
    * @description manage how facts are displayed in UI
    * @returns {String} - random fact for dinos | nothing for human | pigeon fact for pigeon
    */
    const getFact = (content, human) => {      

        if (content instanceof Dino && content.species !== "Pigeon") {
            return "<p>" + compareFacts(content, human) + "</p>";
        }

        if (content instanceof Dino && content.species === "Pigeon") {
            return "<p>" + content.fact + "</p>";      
        }

        return "";
          
    }
   
    /**
    * @description compare dino data with user input
    * @returns {String} - single random fact
    */
    const compareFacts = (dino, human) => {

        const dietFact = compareDiet(dino, human);        
        const weightFact = compareWeight(dino, human);
        const locationFact = compareLocation(dino, human);

        const facts = [];
        facts.push(weightFact, dino.fact);
        if (dietFact !== undefined) facts.push(dietFact);
        if (locationFact !== undefined) facts.push(locationFact);   
        
        const randomFact = facts[Math.floor(Math.random()*facts.length)];       

        return randomFact;
    }

    // Create Dino Compare Method 1

    /**
    * @description compare dino and human location
    * @returns {String} - location fact
    */
    const compareLocation = (dino, human) => {    

        const humanLocation = human.location;        
        const dinoLocation = dino.where.split(",").map((eachLocation) => {
            return eachLocation.trim();
        });               

        if (dinoLocation.includes(humanLocation)) return `You and ${dino.species} are from the same location!`;

    }

    // Create Dino Compare Method 2
    
    /**
    * @description compare dino and human weight
    * @returns {String} - weight fact
    */
    const compareWeight = (dino, human) => {

        const humanWeight = human.weight;
        const dinoWeight = dino.weight;

        if (humanWeight > dinoWeight) {            
            const weightDiff = humanWeight - dinoWeight;
            return `You are ${weightDiff} lbs heavier than ${dino.species}`;
        } else {
            const weightDiff = dinoWeight - humanWeight;
            return `You are ${weightDiff} lbs lighter than ${dino.species}`;
        }      

    }

    // Create Dino Compare Method 3    
    
    /**
    * @description compare dino and human diet
    * @returns {String} - diet fact
    */
    const compareDiet = (dino, human) => {     

        const humanDiet = human.diet;        
        
        if (humanDiet.toLowerCase() == dino.diet) {
            return `You and ${dino.species} have the same diet!`
        } 

    }    

    //adds insert function to array prototype
    Array.prototype.insert = function (index, item) {
        this.splice(index, 0, item);
    };  

    // Show an element
    const show = function (elem) {
        elem.style.display = 'block';
    };
    
    // Hide an element
    const hide = function (elem) {
        elem.style.display = 'none';
    };

    /**
     * @description Hide or show elements depending on it's current visibility
     * @param {HTMLElement} - any number of HTML elements 
    */
    const changeElemVisibility = (...args) => {
        
        // If the element is visible, hide it

        args.forEach((elem) => {
            if (window.getComputedStyle(elem).display === 'block') {
                hide(elem);
                return;
            }
        
            // Otherwise, show it
            show(elem);    
        });

    };