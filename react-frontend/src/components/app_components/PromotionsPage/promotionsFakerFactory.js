
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
discountType: faker.lorem.sentence(1),
couponId: faker.lorem.sentence(1),
expiryDate: faker.lorem.sentence(1),
code: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
