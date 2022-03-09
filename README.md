# Helping hands App

## Client routes
| Path                        | Component         | Permissions             | Behavior                                                                                                             |
|-----------------------------|-------------------|-------------------------|----------------------------------------------------------------------------------------------------------------------|
|"/"                          |HomePage           | public `<Route>`        | Home Page                                                                                                            |
|"/signup"                    |SignupPage         | anon only `<AnonRoute>` | Choose if you are a host or a NGO, sign up form, link to login, navigate to Homepage after signup                    |
|"/login"                     |LoginPage          | anon only `<AnonRoute>` | Login form, link to signup, navigate to Homepage after login                                                         |
|"/feed"(Host)                |HostFeedPage       | private `<Route>`       | Check NGOs that are currently looking for hosts, see if you got any hosting request                                  |
|"/users/:id"                 |UserProfilePage    | private `<Route>`       | See a user's profile. If it's yours, edit it or create a new accommodation                                           |
|"/users/:id/edit"            |UserEditPage       | private `<Route>`       | Edit your host profile.                                                                                              |
|"/ngo/:id"                   |NgoProfilePage     | private `<Route>`       | See an NGO profile. If it's yours, edit it or create a new pax                                                       |
|"/ngo/:id/edit"              |NgoEditPage        | private `<Route>`       | Edit your NGO profile.                                                                                               |
|"/accommodations/:id"        |AccDetailsPage     | private `<Route>`       | See an accommodation's details. If it's yours, edit it and check hosting requests. If you are an NGO, request hosting|
|"/request-hosting/:id"       |HostReqPage        | private `<Route>`       | Choose between your current pax to assign them to the chosen accommodation                                           |
|"/accommodations/create"     |AccCreatePage      | private `<Route>`       | Create a new accommodation that you can host                                                                         |
|"/accommodations/:id/edit"   |AccEditPage        | private `<Route>`       | Edit one of your accommodations                                                                                      |
|"/pax/create"                |PaxCreatePage      | private `<Route>`       | Create a new pax as an NGO                                                                                           |
|"/pax/:id/edit"              |PaxEditPage        | private `<Route>`       | Edit one of your pax                                                                                                 |




## API endpoints

| URL                      | HTTP verb | Request body| Action                     |
|--------------------------|-----------|-------------|----------------------------|
|"/api/users"              |get        |Empty        |Returns all users           |
|"/api/users"              |post       |Json         |Creates a new user          |
|"/api/users/:id"          |get        |Empty        |Returns one user            |
|"/api/users/:id"          |put        |Json         |Updates user                |
|"/api/ngo"                |get        |Empty        |Returns all ngo             |
|"/api/ngo"                |post       |Json         |Creates a new ngo           |
|"/api/ngo/:id"            |get        |Empty        |Returns one ngo             |
|"/api/ngo/:id"            |put        |Json         |Updates ngo                 |
|"/api/pax"                |get        |Empty        |Returns all pax             |
|"/api/pax"                |post       |Json         |Creates a new pax           |
|"/api/pax/:id"            |get        |Empty        |Returns one pax             |
|"/api/pax/:id"            |put        |Json         |Updates pax                 |
|"/api/accommodations"     |get        |Empty        |Returns all accommodation   |
|"/api/accommodations"     |post       |Json         |Creates a new accommodation |
|"/api/accommodations/:id" |get        |Empty        |Returns one accommodation   |
|"/api/accommodations/:id" |put        |Json         |Updates accommodation       |


## Models
```javascript
Host={
    firstName: {type: string, required:true},
    lastName: {type: string, required:true},
    email: {type: string, required:true},
    accommodations: [{type: Schema.Types.ObjectId, ref:'Accommodation'}]
}
```

```javascript
Accommodation={
    capacity: {type: number, required: true},
    rooms: {type: number, required: true},
    pics: [{type: string, required: true}],
    description: {type: string, required:true},
    resquests: [{type: Schema.Types.ObjectId, ref:'Pax'}],
    isHosting: {type: boolean, required:true},
    currentGuests: {type: Schema.Types.ObjectId, ref:'Pax'}
}
```

```javascript
NGO={
    name: {type: string, required:true},
    email: {type: string, required:true},
    cif: {type: string, required:true},
    paxToHost:{type: Schema.Types.ObjectId, ref:'Pax'}
}
```

```javascript
Pax={
    adults: {type: number, required: true}
    children: {type: number}
    ngo: {type: Schema.Types.ObjectId, ref:'Ngo'}
}
```
