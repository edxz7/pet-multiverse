require('../db')

const Pet = require('../models/Pet.model');
const mongoose = require('mongoose');

const pets = [
    {
        name: 'Mr. Wolf',
        gender: 'male',
        kind: 'wolf',
        price: 10000,
        description: 'Mr. Wolf is a wolf enjoys using sunglasses while eating a cheeseburger by the pool',
        picture: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-XzAccf1OFBH8yZQCIaS4QEHT/user-rT898uTKdoQraDPTF1mYVLYd/img-coz9tHjQC2Zo1FEDDYvpYsNL.png?st=2023-06-10T19%3A45%3A34Z&se=2023-06-10T21%3A45%3A34Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-06-10T20%3A42%3A33Z&ske=2023-06-11T20%3A42%3A33Z&sks=b&skv=2021-08-06&sig=1hunXpyMcWPVS7U220Z5LZkE9gJrecPNsGgfk1tJts4%3D'
    },
    {
        name: 'Firefi',
        gender: 'male',
        kind: 'red panda of fire',
        price: 45000,
        description: 'like the Firefox browser logo was a real animated fox',
        picture: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-XzAccf1OFBH8yZQCIaS4QEHT/user-rT898uTKdoQraDPTF1mYVLYd/img-bOmcttHptTQe2G1Qmz7BTl19.png?st=2023-06-10T19%3A49%3A47Z&se=2023-06-10T21%3A49%3A47Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-06-10T20%3A40%3A23Z&ske=2023-06-11T20%3A40%3A23Z&sks=b&skv=2021-08-06&sig=T1WwrnJjNseHK9Q03HZ84y8FFUSEKjt0ZyBQ51fD4v0%3D'
    },
    {
        name: 'Ibi',
        gender: 'female',
        kind: 'ibis',
        price: 3000,
        description: 'Ibi is an ibis in the wild',
        picture: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-XzAccf1OFBH8yZQCIaS4QEHT/user-rT898uTKdoQraDPTF1mYVLYd/img-iY4j6yqThLzL6crOF5EJbcGw.png?st=2023-06-10T19%3A51%3A09Z&se=2023-06-10T21%3A51%3A09Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-06-10T20%3A41%3A42Z&ske=2023-06-11T20%3A41%3A42Z&sks=b&skv=2021-08-06&sig=76H1ZyDfMjtNumuGxANurUdfl/OfZYNlmbQzFO/0FNU%3D'
    },
    {
        name: 'Firery',
        gender: 'female',
        kind: 'fox',
        price: 30000,
        description: 'Firery is an artistic render of a fox made of fire',
        picture: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-XzAccf1OFBH8yZQCIaS4QEHT/user-rT898uTKdoQraDPTF1mYVLYd/img-Hk8d43bQItfJIxUrs6o9v1Re.png?st=2023-06-10T19%3A53%3A22Z&se=2023-06-10T21%3A53%3A22Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-06-10T13%3A40%3A55Z&ske=2023-06-11T13%3A40%3A55Z&sks=b&skv=2021-08-06&sig=nNdRc8b02Z2LXnMB0X1Pz0wohqzTkfplRGPA%2Bna1Toc%3D',
    },
    {
        name: 'Feli',
        gender: 'female',
        kind: 'cat',
        price: 5000,
        description: 'Feli is a cat that usually flies out to space as an astronaut, digital art, photo',
        picture: 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-XzAccf1OFBH8yZQCIaS4QEHT/user-rT898uTKdoQraDPTF1mYVLYd/img-Byc5lu5fjRHP5mio6VeKwwyi.png?st=2023-06-10T20%3A47%3A39Z&se=2023-06-10T22%3A47%3A39Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-06-10T20%3A51%3A30Z&ske=2023-06-11T20%3A51%3A30Z&sks=b&skv=2021-08-06&sig=88Mt8DpTyEcBA53uUQBr5uEWGjnkWC9TQEYc0ejcYmI%3D'
    }
]

Pet.insertMany(pets)
.then(dbPets => {
    console.log('se crearon ', dbPets.length, 'mythical pets')
    mongoose.connection.close()
})
.catch(error => console.log('error during seeding: ', error))