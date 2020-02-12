import {
  Factory,
  faker,
} from '@bigtest/mirage';

export default Factory.extend({
  id: () => faker.random.uuid(),
  tags: { tagList: [faker.random.arrayElement(['tag1', 'tag2', 'tag3'])] },
  name: i => `Name ${i}`,
  parentProfiles: [],
  childProfiles: [],
  metadata: { updatedDate: faker.date.past(0.1, faker.date.past(0.1)).toString() },
  userInfo: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    userName: faker.name.lastName(),
  },
});
