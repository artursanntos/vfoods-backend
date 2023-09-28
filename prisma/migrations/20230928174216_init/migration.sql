-- CreateTable
CREATE TABLE "MetasMesIndicador" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "mes_ano" DATETIME NOT NULL,
    "totalColabBateramMeta" INTEGER NOT NULL,
    "totalColabBateramSuperMeta" INTEGER NOT NULL,
    "totalColabBateramDesafio" INTEGER NOT NULL,
    "totalColab" INTEGER NOT NULL,
    "idIndicador" TEXT NOT NULL,
    CONSTRAINT "MetasMesIndicador_idIndicador_fkey" FOREIGN KEY ("idIndicador") REFERENCES "Indicador" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
