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
|USER routes               |           |             |                            |
|"/api/users"              |GET        |(empty)      |Returns all users           |
|"/api/users"              |POST       |Json         |Creates a new user          |
|"/api/users/:id"          |GET        |(empty)      |Returns one user            |
|"/api/users/:id"          |PUT        |Json         |Updates user                |
|"/api/users/:id"          |DELETE     |(empty)      |Deletes user                |
|"/api/ngo"                |GET        |(empty)      |Returns all ngo             |
|NGO routes                |           |             |                            |
|"/api/ngo"                |POST       |Json         |Creates a new ngo           |
|"/api/ngo/:id"            |GET        |(empty)      |Returns one ngo             |
|"/api/ngo/:id"            |PUT        |Json         |Updates ngo                 |
|"/api/ngo/:id"            |DELETE     |(empty)      |Deletes ngo                 |
|PAX routes                |           |             |                            |
|"/api/pax"                |GET        |(empty)      |Returns all pax             |
|"/api/pax"                |POST       |Json         |Creates a new pax           |
|"/api/pax/:id"            |GET        |(empty)      |Returns one pax             |
|"/api/pax/:id"            |PUT        |Json         |Updates pax                 |
|"/api/pax/:id"            |DELETE     |(empty)      |Deletes pax                 |
|ACCOMMODATION routes      |           |             |                            |
|"/api/accommodations"     |GET        |(empty)      |Returns all accommodation   |
|"/api/accommodations"     |POST       |Json         |Creates a new accommodation |
|"/api/accommodations/:id" |GET        |(empty)      |Returns one accommodation   |
|"/api/accommodations/:id" |PUT        |Json         |Updates accommodation       |
|"/api/accommodations/:id" |DELETE     |(empty)      |Deletes accommodation       |


## Models

# Host model
```javascript
{
    firstName: {type: string, required:true},
    lastName: {type: string, required:true},
    email: {type: string, required:true},
    accommodations: [{type: Schema.Types.ObjectId, ref:'Accommodation'}]
}
```

# Accommodation model
```javascript
{
    capacity: {type: number, required: true},
    rooms: {type: number, required: true},
    pics: [{type: string, required: true}],
    description: {type: string, required:true},
    resquests: [{type: Schema.Types.ObjectId, ref:'Pax'}],
    isHosting: {type: boolean, required:true},
    currentGuests: {type: Schema.Types.ObjectId, ref:'Pax'}
}
```

# NGO model
```javascript
{
    name: {type: string, required:true},
    email: {type: string, required:true},
    cif: {type: string, required:true},
    paxToHost:{type: Schema.Types.ObjectId, ref:'Pax'}
}
```

# Pax model
```javascript
{
    adults: {type: number, required: true}
    children: {type: number}
    ngo: {type: Schema.Types.ObjectId, ref:'Ngo'}
}
```
