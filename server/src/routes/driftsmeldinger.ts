import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const meldinger = await prisma.driftsMelding.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(meldinger);
});

router.post("/", async (req, res) => {
  const { tittel, melding } = req.body;
  const ny = await prisma.driftsMelding.create({
    data: { tittel, melding },
  });
  res.json(ny);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { tittel, melding } = req.body;
  const oppdatert = await prisma.driftsMelding.update({
    where: { id: Number(id) },
    data: { tittel, melding },
  });
  res.json(oppdatert);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.driftsMelding.delete({ where: { id: Number(id) } });
  res.json({ message: "Slettet" });
});

export default router;
