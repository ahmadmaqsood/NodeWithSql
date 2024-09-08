const { faker } = require('@faker-js/faker');
// Generate Random User by faker package
export const getRandomUser = () => {
    return [
        faker.datatype.uuid(),
        faker.internet.userName(),
        faker.internet.email(),
        faker.internet.password(),
    ];
}