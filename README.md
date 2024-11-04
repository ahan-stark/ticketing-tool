Run json server : npx json-server db.json

Since we are using json server it will run in port : localhost:3000

So we have used localhost:3001 for react application

we can access endpoints of json server as http://localhost:3000/users, http://localhost:3000/tickets, http://localhost:3000/resolved-tickets

Since we are using json server do the following configuration

Create file "db.json" in root level

copy below contents inside "db.json"

{
"users":[],
"tickets":[],
"resolved-tickets":[]
}
