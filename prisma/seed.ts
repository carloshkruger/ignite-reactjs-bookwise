import { PrismaClient } from '@prisma/client'
import { books } from './constants/books'
import { categories } from './constants/categories'
import { ratings } from './constants/ratings'
import { users } from './constants/users'

const prisma = new PrismaClient()

async function main() {
  await prisma.rating.deleteMany()
  await prisma.user.deleteMany()
  await prisma.categoriesOnBooks.deleteMany()
  await prisma.category.deleteMany()
  await prisma.book.deleteMany()

  const usersSeed = users.map((user) => {
    return prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
    })
  })

  const categoriesSeed = categories.map((category) => {
    return prisma.category.create({
      data: {
        name: category.name,
        id: category.id,
      },
    })
  })

  const booksSeed = books.map((book) => {
    return prisma.book.create({
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
    return prisma.rating.create({
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

  await prisma.$transaction([
    ...categoriesSeed,
    ...booksSeed,
    ...usersSeed,
    ...ratingsSeed,
  ])
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
