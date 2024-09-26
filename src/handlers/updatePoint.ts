import prisma from '../db';

/**
 * Get All Update Points
 */

export const getUpdatePoints = async (req, res) => {
  const updatePoints = await prisma.updatePoint.findMany({
    where: {
      update: {
        product: {
          belongsToId: req.user.id,
        },
      },
    },
  });

  res.json({ data: updatePoints });
};

/**
 * Get One Update Point
 */
export const getOneUpdatePoint = async (req, res) => {
  const { id } = req.params;
  const updatePoint = await prisma.updatePoint.findUnique({
    where: {
      id,
    },
  });

  res.json({ data: updatePoint });
};

/**
 * Create Update point
 */

export const createUpdatePoint = async (req, res) => {
  try {
    const { name, description, updateId } = req.body;

    const updatePoint = await prisma.updatePoint.create({
      data: {
        name,
        description,
        updateId,
      },
    });

    res.status(201).json(updatePoint);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

/**
 * Update a updatePoint
 */

export const updateUpdatePoint = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const updatePoint = await prisma.updatePoint.update({
    where: { id },
    data: {
      name,
      description,
    },
  });
  res.json({ data: updatePoint });
};

/**
 * Delete an updatePoint
 */
export const deleteUpdatePoint = async (req, res) => {
  const { id } = req.params;
  const deleteUpdatePoint = await prisma.updatePoint.delete({
    where: {
      id,
    },
  });
  res.status(204).send();
  res.json({ data: deleteUpdatePoint + "deleted" });
};
