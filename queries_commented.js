// 1. Escriu una consulta per mostrar tots els documents en la col·lecció Restaurants.

db.restaurants                                          // inside restaurants collection
    .find({})                                           // find all documents
    .pretty()                                           // show them pretty

// 2. Escriu una consulta per mostrar el restaurant_id, name, borough i cuisine per tots els documents en la col·lecció Restaurants.

db.restaurants                                          // inside restaurants collection
    .find(
        {},                                             // find all documents
        {                                               // show only restaurant_id, name, borough & cuisine fields
            restaurant_id: 1, 
            name: 1, 
            borough: 1, 
            cuisine: 1
        }
    )
    .pretty()                                           // show them pretty

// 3. Escriu una consulta per mostrar el restaurant_id, name, borough i cuisine, però exclou el camp _id 
// per tots els documents en la col·lecció Restaurants.

db.restaurants                                          // inside restaurants collection
    .find(  
        {},                                             // find all documents 
        {                                               // show only restaurant_id, name, borough & cuisine fields
            _id: 0,                                     // assuring to not show _id field
            restaurant_id: 1, 
            name: 1, 
            borough: 1, 
            cuisine: 1
        }
    )
    .pretty()                                           // show them pretty

// 4. Escriu una consulta per mostrar restaurant_id, name, borough i zip code, però exclou el camp _id 
// per tots els documents en la col·lecció Restaurants.

db.restaurants                                          // inside restaurants collection
    .find(
        {},                                             // find all documents 
        {                                               // show only restaurant_id, name, borough & zipcode fields
            _id: 0,                                     // assuring to not show _id field
            restaurant_id: 1, 
            name: 1, 
            borough: 1, 
            "address.zipcode": 1                        // (need to access zipcode from address since it is a subobject)
        }
    )
    .pretty()                                           // show them pretty

// 5. Escriu una consulta per mostrar tots els restaurants que estan en el Bronx.

db.restaurants                                          // inside restaurants collection
    .find({borough: "Bronx"})                           // find all documents on which borough is "Bronx"
    .pretty()                                           // show them pretty

// 6. Escriu una consulta per mostrar els primers 5 restaurants que estan en el Bronx.

db.restaurants                                          // inside restaurants collection
    .find({borough: "Bronx"})                           // find all documents on which borough is "Bronx"
    .limit(5)                                           // limit to 5 documents
    .pretty()                                           // show them pretty

// 7. Escriu una consulta per mostrar el pròxim 5 restaurants després de saltar els primers 5 del Bronx.

db.restaurants                                          // inside restaurants collection
    .find({borough: "Bronx"})                           // find all documents on which borough is "Bronx"
    .skip(5)                                            // skip 5 documents
    .limit(5)                                           // limit to 5 documents (show documents 6-10 because we skipped 5 docs before)
    .pretty()                                           // show them pretty

// 8. Escriu una consulta per trobar els restaurants que tenen un score de més de 90.

db.restaurants                                          // inside restaurants collection
    .find({"grades.score": {$gt: 90}})                  // find all documents on which score is greater than 90
    .pretty()                                           // show them pretty

// 9. Escriu una consulta per trobar els restaurants que tenen un score de més de 80 però menys que 100.

db.restaurants                                          // inside restaurants collection
    .find(                                              // find all documents
        {                                               
            "grades":                                   //  on which an element inside grades
            {
                $elemMatch: 
                {
                    score:                              // matches a score greater than 80 and less than 100
                    {
                        $gt: 80, 
                        $lt: 100
                    }
                }
            }
        }
    )
    .pretty()                                           // show them pretty

// 10. Escriu una consulta per trobar els restaurants que es localitzen en valor de latitud menys de -95.754168.

db.restaurants                                          // inside restaurants collection
    .find({"address.coord.0": {$lt: -95.754168}})       // find all documents on which latitud is less than -95.754168
    .pretty()                                           // show them pretty

// 11. Escriu una consulta de MongoDB per a trobar els restaurants que no preparen cap cuisine de 'American' 
// i la seva qualificació és superior a 70 i longitud inferior a -65.754168.

db.restaurants                                          // inside restaurants collection
    .find(                                              // find all documents
        {                                               
            $and:                                       // accomplishing these 3 conditions:
            [
                {cuisine: {$nin: ["American "]}},       // cuisine not "American "
                {"grades.score": {$gt: 70}},            // some score greater than 70
                {"address.coord.1": {$lt: -65.754168}}  // longitude less than -65.754168
            ]
        }
    )
    .pretty()                                           // show them pretty

// 12. Escriu una consulta per trobar els restaurants que no preparen cap cuisine de 'American' 
// i van aconseguir un marcador més de 70 i localitzat en la longitud menys que -65.754168. 
// Nota: Fes aquesta consulta sense utilitzar $and operador.

db.restaurants                                          // inside restaurants collection
    .find(                                              // find all documents accomplishing these 3 conditions:
        {
            cuisine: {$nin: ["American "]},             // cuisine not "American "
            "grades.score": {$gt: 70},                  // some score greater than 70
            "address.coord.1": {$lt: -65.754168}        // longitude less than -65.754168
        }
    )
    .pretty()                                           // show them pretty

// 13. Escriu una consulta per trobar els restaurants que no preparen cap cuisine de 'American' 
// i van obtenir un punt de grau 'A' no pertany a Brooklyn. 
// S'ha de mostrar el document segons la cuisine en ordre descendent.

db.restaurants                                          // inside restaurants collection
    .find(                                              // find all documents accomplishing these 3 conditions:
        {
            cuisine: {$nin: ["American "]},             // cuisine not "American "
            "grades.grade": "A",                        // some grade "A"
            borough: {$nin: ["Brooklyn"]}               // "Brooklyn" borough
        }
    )
    .sort({"cuisine": -1})                              // order by cuisine descendent
    .pretty()                                           // show them pretty

// 14. Escriu una consulta per trobar el restaurant_id, name, borough i cuisine per a aquells 
// restaurants que contenen 'Wil' com les tres primeres lletres en el seu nom.

db.restaurants                                          // inside restaurants collection
    .find(                                              // find all documents
        {name: /^Wil/},                                 // on which name starts as "Wil"
        {                                               // show only restaurant_id, name, borough & cuisine fields
            _id:0,                                      // assuring to not show _id field
            restaurant_id: 1, 
            name: 1, 
            borough: 1, 
            cuisine: 1
        }
    )
    .pretty()                                           // show them pretty

// 15. Escriu una consulta per trobar el restaurant_id, name, borough i cuisine per a aquells 
// restaurants que contenen 'ces' com les últimes tres lletres en el seu nom.

db.restaurants                                          // inside restaurants collection
    .find(                                              // find all documents
        {name: /ces+$/},                                // on which name ends as "ces" 
        {                                               // show only restaurant_id, name, borough & cuisine fields
            _id:0,                                      // assuring to not show _id field
            restaurant_id: 1, 
            name: 1, 
            borough: 1, 
            cuisine: 1
        }
    )
    .pretty()                                           // show them pretty

// 16. Escriu una consulta per trobar el restaurant_id, name, borough i cuisine per a aquells restaurants 
// que contenen 'Reg' com tres lletres en algun lloc en el seu nom.

db.restaurants                                          // inside restaurants collection
    .find(                                              // find all documents
        {name: /Reg/},                                  // on which name has "Reg" somewhere  
        {                                               // show only restaurant_id, name, borough & cuisine fields
            _id:0,                                      // assuring to not show _id field
            restaurant_id: 1, 
            name: 1, 
            borough: 1, 
            cuisine: 1
        }
    )
    .pretty()                                           // show them pretty

// 17. Escriu una consulta per trobar els restaurants que pertanyen al Bronx i van preparar qualsevol plat americà o xinès.

db.restaurants                                          // inside restaurants collection
    .find(                                              // find all documents accomplishing these 2 conditions:
        {
            borough: "Bronx",                           // "Bronx" borough
            cuisine: {$in: ["American ", "Chinese"]}    // cuisine "American " or "Chinese"
        }
    )
    .pretty()                                           // show them pretty

// 18. Escriu una consulta per trobar el restaurant_id, name, borough i cuisine per a aquells restaurants 
// que pertanyen a Staten Island o Queens o Bronx o Brooklyn.

db.restaurants                                          // inside restaurants collection
    .find(                                              // find all documents at "Staten Island", "Queens", "Bronx" or "Brooklyn" borough 
        {borough: {$in: ["Staten Island", "Queens", "Bronx", "Brooklyn"]}}, 
        {                                               // show only restaurant_id, name, borough & cuisine fields
            _id:0,                                      // assuring to not show _id field
            restaurant_id: 1, 
            name: 1, 
            borough: 1, 
            cuisine: 1
        }
    )
    .pretty()                                           // show them pretty

// 19. Escriu una consulta per trobar el restaurant_id, name, borough i cuisine per a aquells restaurants 
// que no pertanyen a Staten Island o Queens o Bronx o Brooklyn.

db.restaurants                                          // inside restaurants collection
    .find(                                              // find all documents not at "Staten Island", "Queens", "Bronx" or "Brooklyn" borough 
        {borough: {$nin: ["Staten Island", "Queens", "Bronx", "Brooklyn"]}}, 
        {                                               // show only restaurant_id, name, borough & cuisine fields
            _id:0,                                      // assuring to not show _id field
            restaurant_id: 1, 
            name: 1, 
            borough: 1, 
            cuisine: 1
        }
    )
    .pretty()                                             // show them pretty

// 20. Escriu una consulta per trobar el restaurant_id, name, borough i cuisine per a aquells restaurants 
// que aconsegueixin un marcador que no és més de 10.

db.restaurants                                          // inside restaurants collection
    .find(                                              // find all documents
        {"grades.score": {$lte: 10}},                   // on which some score is less or equal than 10 (not greater than 10)
        {                                               // show only restaurant_id, name, borough & cuisine fields
            _id:0,                                      // assuring to not show _id field
            restaurant_id: 1, 
            name: 1, 
            borough: 1, 
            cuisine: 1
        }
    )
    .pretty()                                           // show them pretty

// 21. Escriu una consulta per trobar el restaurant_id, name, borough i cuisine per a aquells restaurants 
// que preparen peix excepte 'American' i 'Chinees' o el name del restaurant comença amb lletres 'Wil'.

db.restaurants                                          // inside restaurants collection
    .find(                                              // find all documents
        {
            $or:                                        // accomplishing ONE of these 2 conditions:
            [
                {cuisine: {$nin: ["American ", "Chinese"]}},    // cuisine not "American " or "Chinese"
                {name: {$regex: /^Wil/}}                        // name starting "Wil"
            ]
        }, 
        {                                               // show only restaurant_id, name, borough & cuisine fields
            _id:0,                                      // assuring to not show _id field
            restaurant_id: 1, 
            name: 1, 
            borough: 1, 
            cuisine: 1
        }
    )
    .pretty()                                           // show them pretty

// 22. Escriu una consulta per trobar el restaurant_id, name, i grades per a aquells restaurants 
// que aconsegueixin un grau "A" i un score 11 en dades d'estudi ISODate "2014-08-11T00:00:00Z".

db.restaurants                                          // inside restaurants collection
    .find(                                              // find all documents
        {grades: 
            {$elemMatch:                                // on which one element in grades accomplish these 3 conditions
                {
                date: ISODate("2014-08-11T00:00:00Z"),
                grade: "A",                             
                score: 11
                }
            }
        }, 
        {                                               // show only restaurant_id, name, grades fields
            _id:0,                                      // assuring to not show _id field
            restaurant_id: 1, 
            name: 1, 
            grades: 1
        }
    )
    .pretty()                                           // show them pretty

// 23. Escriu una consulta per trobar el restaurant_id, name i grades per a aquells restaurants 
// on el 2n element de varietat de graus conté un grau de "A" i marcador 9 sobre un ISODate "2014-08-11T00:00:00Z".

db.restaurants                                          // inside restaurants collection
    .find(
        {"grades.1":                                    // on which the 2nd element in grades accomplish these 3 conditions
            {
                date: ISODate("2014-08-11T00:00:00Z"), 
                grade: "A", 
                score: 9
            }
        }, 
        {                                               // show only restaurant_id, name, grades fields
            _id:0,                                      // assuring to not show _id field
            restaurant_id: 1, 
            name: 1, 
            grades: 1
        }
    )
    .pretty()                                           // show them pretty

// 24. Escriu una consulta per trobar el restaurant_id, name, adreça i ubicació geogràfica per a aquells restaurants 
// on el segon element del array coord conté un valor que és més de 42 i fins a 52.

db.restaurants                                          // inside restaurants collection
    .find(                                              // find all documents
        {"address.coord.1": {$gt: 42, $lte: 52}},       // on which the 2nd element on coordinates is bigger than 42 and less or equa than 52
        {                                               // show only restaurant_id, name, address fields
            _id:0,                                      // assuring to not show _id field
            restaurant_id: 1, 
            name: 1, 
            address: 1
        }
    )
    .pretty()                                           // show them pretty

// 25. Escriu una consulta per organitzar el nom dels restaurants en ordre ascendent juntament amb totes les columnes.
db.restaurants                                          // inside restaurants collection
    .find()                                             // find all documents
    .sort({name: 1})                                    // order by name ascendent
    .pretty()                                           // show them pretty

// 26. Escriu una consulta per organitzar el nom dels restaurants en ordre descendent juntament amb totes les columnes.
db.restaurants                                          // inside restaurants collection
    .find()                                             // find all documents
    .sort({name: -1})                                   // order by name descendent
    .pretty()                                           // show them pretty

// 27. Escriu una consulta per organitzar el nom de la cuisine en ordre ascendent i pel mateix barri de cuisine. Ordre descendent.
db.restaurants                                          // inside restaurants collection
    .find()                                             // find all documents
    .sort({cuisine: 1, borough: -1})                    // order by cusisine ascendent and borough descendent
    .pretty()                                           // show them pretty

// 28. Escriu una consulta per saber totes les direccions que no contenen el carrer.
db.restaurants                                          // inside restaurants collection
    .find({"address.street": {$exists: false}})         // find all documents on which there is no street data
    .pretty()                                           // show them pretty

// 29. Escriu una consulta que seleccionarà tots els documents en la col·lecció de restaurants on el valor del camp coord és Double.
db.restaurants                                          // inside restaurants collection
    .find({"address.coord": {$elemMatch: {$type: 1}}})  // find all documents on which each coordinate type is double
    .pretty()                                           // show them pretty

// 30. Escriu una consulta que seleccionarà el restaurant_id, name i grade per a aquells restaurants que retornin 0 
// com a resta després de dividir el marcador per 7.

db.restaurants                                          // inside restaurants collection
    .find(                                              // find all documents
        {"grades.score": {$mod: [7,0]}},                // on which there is a score with score mod 7 equal to 0
        {                                               // show only restaurant_id, name, address fields
            _id:0,                                      // assuring to not show _id field
            restaurant_id: 1, 
            name: 1, 
            "grades.grade": 1
        }
    )
    .pretty()                                           // show them pretty

// 31. Escriu una consulta per trobar el name de restaurant, borough, longitud i altitud i cuisine 
// per a aquells restaurants que contenen 'mon' com tres lletres en algun lloc del seu nom.

db.restaurants                                          // inside restaurants collection
    .find(                                              // find all documents
        {name: /mon/},                                  // on which the name has the string "mon" somewhere
        {                                               // show only name, borough, coordinates and cuisine fields
            _id:0,                                      // assuring to not show _id field
            name: 1, 
            borough: 1, 
            "address.coord": 1, 
            cuisine: 1
        }
    )
    .pretty()                                           // show them pretty

// 32. Escriu una consulta per trobar el name de restaurant, borough, longitud i latitud i cuisine 
// per a aquells restaurants que contenen 'Mad' com primeres tres lletres del seu nom.

db.restaurants                                          // inside restaurants collection
    .find(                                              // find all documents
        {name: /^Mad/},                                 // on which the name starts with "Mad"
        {                                               // show only name, borough, coordinates and cuisine fields
            _id:0,                                      // assuring to not show _id field
            name: 1, 
            borough: 1, 
            "address.coord": 1, 
            cuisine: 1
        }
    )
    .pretty()                                           // show them pretty
