import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const screens = await prisma.screen.findMany();
  res.json(screens);
});

router.post("/", async (req, res) => {
  const { name, location, content } = req.body;
  const screen = await prisma.screen.create({
    data: { name, location, content },
  });
  res.json(screen);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, location, content } = req.body;
  const screen = await prisma.screen.update({
    where: { id: Number(id) },
    data: { name, location, content },
  });
  res.json(screen);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.screen.delete({ where: { id: Number(id) } });
  res.json({ message: "Deleted" });
});

export default router;
