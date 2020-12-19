
    
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
    setDinos = (dinos) => {
       this.dinos = dinos;       
    }

    /**
    * @description Getter for dinos   
    * @returns {array} this.dinos - Array of dinos 
    */
    getDinos = () => {       
        return this.dinos;        
    }    

    /**
    * @description Set human object to global variable, so i can access it later with getHuman();   
    * @param {Object} human - human object
    */
    setHuman = (human) => {
        this.human = human;
    }

    /**
    * @description Getter for human   
    * @returns {array} this.human - human object
    */
    getHuman = (human) => {
        return this.human;
    }

    // Create Human Object

    /**
    * @description Creates Human object with data returned from form
    * @returns {object} - Human
    */
    getHumanData = () => {
                        
        const name = document.querySelector("#name").value;
        const feet = document.querySelector("#feet").value;
        const inches = document.querySelector("#inches").value;
        const weight = document.querySelector("#weight").value;
        const diet = document.querySelector("#diet").value;     
        const location = document.querySelector("#location").value;     
        const height = feet;      

        return new Human(name, weight, height, diet, location);    
    }

    // Use IIFE to get human data from form    

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
    handleFormSubmit = () => {
                
        let gridData = getDinos();        
        const human = getHumanData();
        setHuman(human);
                
        gridData = gridData.sort(() => Math.random() - 0.5);
        gridData.insert(4, human);

        //hide form
        const form = document.querySelector(".form-container");
        toggleForm(form);

        //create tiles                        
        generateGrid(gridData);        
    }
        
    /**
    * @description Generate html grid, append tiles and populate with data
    */
    generateGrid = (tileContent) => {     

        const grid = document.querySelector("#grid");                     

        // Generate Tiles for each Dino in Array
        tileContent.forEach((content) => {

            let tile = document.createElement("div");            
            tile.classList.add("grid-item");          

            const tileTitle = content instanceof Dino ? content.species : content.name;            
        
            
            tile.innerHTML = `
                <h3> ${tile.innerHTML = tileTitle}</h3>
                <img src="images/${content.species}.png" alt="Dinosaur or Human">                                            
                ${getFact(content)}                                               
            `;                                

            // Add tiles to DOM
            grid.appendChild(tile);

        });
       
    } 

    /**
    * @description manage how facts are displayed in UI
    * @returns {String} - random fact for dinos | nothing for human | pigeon fact for pigeon
    */
    getFact = (content) => {        

        if (content instanceof Dino && content.species !== "Pigeon") {
            return "<p>" + compareFacts(content) + "</p>";
        } else if (content instanceof Dino && content.species === "Pigeon") {
            return "<p>" + content.fact + "</p>";      
        } else {
            return "";
        }
          
    }
   
    /**
    * @description compare dino data with user input
    * @returns {String} - single random fact
    */
    compareFacts = (dino) => {

        const human = getHuman();   
        const dietFact = compareDiet(dino);        
        const weightFact = compareWeight(dino);
        const locationFact = compareLocation(dino);

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
    compareLocation = (dino) => {    

        const humanLocation = getHumanData().location;        
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
    compareWeight = (dino) => {

        const humanWeight = getHumanData().weight;
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
    compareDiet = (dino) => {     

        const humanDiet = getHuman().diet;        
        
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
     * @description Hide or show form depending on it's state.
     * @param {HTMLElement} elem 
    */
    toggleForm = (elem) => {
        
        // If the element is visible, hide it
        if (window.getComputedStyle(elem).display === 'block') {
            hide(elem);
            return;
        }
    
        // Otherwise, show it
        show(elem);    
    };
