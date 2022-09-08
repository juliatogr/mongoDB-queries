db.restaurants.find({}).pretty()
db.restaurants.find({}, {restaurant_id: 1, name: 1, borough: 1, cuisine: 1}).pretty()
db.restaurants.find({}, {_id: 0, restaurant_id: 1, name: 1, borough: 1, cuisine: 1}).pretty()
db.restaurants.find({}, {_id: 0, restaurant_id: 1, name: 1, borough: 1, "address.zipcode": 1}).pretty()
db.restaurants.find({borough: "Bronx"}).pretty()
db.restaurants.find({borough: "Bronx"}).limit(5).pretty()
db.restaurants.find({borough: "Bronx"}).skip(5).limit(5).pretty()
db.restaurants.find({"grades.score": {$gt: 90}}).pretty()
db.restaurants.find({"grades": {$elemMatch: {score: {$gt: 80, $lt: 100}}}}).pretty()
db.restaurants.find({"address.coord.0": {$lt: -95.754168}}).pretty()
db.restaurants.find({$and: [{cuisine: {$nin: ["American "]}}, {"grades.score": {$gt: 70}}, {"address.coord.1": {$lt: -65.754168}}]}).pretty()
db.restaurants.find({cuisine: {$nin: ["American "]}, "grades.score": {$gt: 70}, "address.coord.1": {$lt: -65.754168}}).pretty()
db.restaurants.find({cuisine: {$nin: ["American "]}, "grades.grade": "A", borough: {$nin: ["Brooklyn"]}}).sort({"cuisine": -1}).pretty()
db.restaurants.find({name: /^Wil/}, {_id:0, restaurant_id: 1, name: 1, borough: 1, cuisine: 1}).pretty()
db.restaurants.find({name: /ces+$/}, {_id:0, restaurant_id: 1, name: 1, borough: 1, cuisine: 1}).pretty()
db.restaurants.find({name: /Reg/}, {_id:0, restaurant_id: 1, name: 1, borough: 1, cuisine: 1}).pretty()
db.restaurants.find({borough: "Bronx", cuisine: {$in: ["American ", "Chinese"]}}).pretty()
db.restaurants.find({borough: {$in: ["Staten Island", "Queens", "Bronx", "Brooklyn"]}}, {_id:0, restaurant_id: 1, name: 1, borough: 1, cuisine: 1}).pretty()
db.restaurants.find({borough: {$nin: ["Staten Island", "Queens", "Bronx", "Brooklyn"]}}, {_id:0, restaurant_id: 1, name: 1, borough: 1, cuisine: 1}).pretty()
db.restaurants.find({"grades.score": {$lte: 10}}, {_id:0, restaurant_id: 1, name: 1, borough: 1, cuisine: 1}).pretty()
db.restaurants.find({$or: [{cuisine: {$nin: ["American ", "Chinese"]}}, {name: {$regex: /^Wil/}}]}, {_id:0, restaurant_id: 1, name: 1, borough: 1, cuisine: 1}).pretty()
db.restaurants.find({grades: {$elemMatch: {date: ISODate("2014-08-11T00:00:00Z"), grade: "A", score: 11}}}, {_id:0, restaurant_id: 1, name: 1, grades: 1}).pretty()
db.restaurants.find({"grades.1": {date: ISODate("2014-08-11T00:00:00Z"), grade: "A", score: 9}}, {_id:0, restaurant_id: 1, name: 1, grades: 1}).pretty()
db.restaurants.find({"address.coord.1": {$gt: 42, $lte: 52}}, {_id:0, restaurant_id: 1, name: 1, address: 1}).pretty()
db.restaurants.find().sort({name: 1}).pretty()
db.restaurants.find().sort({name: -1}).pretty()
db.restaurants.find().sort({cuisine: 1, borough: -1}).pretty()
db.restaurants.find({"address.street": {$exists: false}}).pretty()
db.restaurants.find({"address.coord": {$elemMatch: {$type: 1}}}).pretty()
db.restaurants.find({"grades.score": {$mod: [7,0]}}, {_id:0, restaurant_id: 1, name: 1, "grades.grade": 1}).pretty()
db.restaurants.find({name: /mon/}, {_id:0, name: 1, borough: 1, "address.coord": 1, cuisine: 1}).pretty()
db.restaurants.find({name: /^Mad/}, {_id:0, name: 1, borough: 1, "address.coord": 1, cuisine: 1}).pretty()