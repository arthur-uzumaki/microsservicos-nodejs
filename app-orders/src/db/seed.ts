import { faker } from '@faker-js/faker'
import { db } from './db.ts'
import { schema } from './schema/index.ts'

async function seedCustomers() {
  console.log('🌱 Inserindo clientes falsos...')

  await db.insert(schema.customers).values([
    {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      country: faker.location.country(),
      dataOfBirth: faker.date.birthdate({ min: 18, max: 70, mode: 'age' }),
    },
    {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      country: faker.location.country(),
      dataOfBirth: faker.date.birthdate({ min: 18, max: 70, mode: 'age' }),
    },
    {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      country: faker.location.country(),
      dataOfBirth: faker.date.birthdate({ min: 18, max: 70, mode: 'age' }),
    },
  ])

  console.log('✅ Clientes inseridos com sucesso!')
}

seedCustomers()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('❌ Erro ao rodar seed:', err)
    process.exit(1)
  })
