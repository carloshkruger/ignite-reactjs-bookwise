import { books } from './constants/books'
import { categories } from './constants/categories'
import { ratings } from './constants/ratings'
import { users } from './constants/users'
import { prismaClient } from '@/lib/prismaClient'

async function main() {
  await prismaClient.rating.deleteMany()
  await prismaClient.user.deleteMany()
  await prismaClient.categoriesOnBooks.deleteMany()
  await prismaClient.category.deleteMany()
  await prismaClient.book.deleteMany()

  const usersSeed = users.map((user) => {
    return prismaClient.user.create({
      data: {
        id: user.id,
        name: user.name,
        avatarUrl: user.avatarUrl,
        email: user.email!
      },
    })
  })

  const categoriesSeed = categories.map((category) => {
    return prismaClient.category.create({
      data: {
        name: category.name,
        id: category.id,
      },
    })
  })

  const booksSeed = books.map((book) => {
    return prismaClient.book.create({
      data: {
        id: book.id,
        name: book.name,
        author: book.author,
        summary: book.summary,
        coverUrl: book.coverUrl,
        totalPages: book.totalPages,
        categories: {
          create: [
            ...book.categories.map((category) => {
              return {
                category: {
                  connect: {
                    id: category.id,
                  },
                },
              }
            }),
          ],
        },
      },
    })
  })

  const ratingsSeed = ratings.map((rating) => {
    return prismaClient.rating.create({
      data: {
        id: rating.id,
        rate: rating.rate,
        description: rating.description,
        user: {
          connect: { id: rating.userId },
        },
        book: {
          connect: { id: rating.bookId },
        },
      },
    })
  })

  await prismaClient.$transaction([
    ...categoriesSeed,
    ...booksSeed,
    ...usersSeed,
    ...ratingsSeed,
  ])
}

main()
  .then(async () => {
    await prismaClient.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prismaClient.$disconnect()
    process.exit(1)
  })
