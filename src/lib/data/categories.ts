import { prismaClient } from "../prismaClient";

export const getCategories = async () => {
  return prismaClient.category.findMany({
    orderBy: {
      name: 'asc'
    }
  });
}