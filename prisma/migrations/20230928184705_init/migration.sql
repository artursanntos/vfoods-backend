-- CreateTable
CREATE TABLE "Gestor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "imagem" TEXT,
    "email" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Colaborador" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cargo" TEXT,
    "data_admissao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "imagem" TEXT,
    "idGestor" TEXT NOT NULL,
    CONSTRAINT "Colaborador_idGestor_fkey" FOREIGN KEY ("idGestor") REFERENCES "Gestor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Indicador" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "unidade_medida" TEXT NOT NULL,
    "data_deadline" DATETIME NOT NULL,
    "descricao" TEXT,
    "idGestor" TEXT NOT NULL,
    CONSTRAINT "Indicador_idGestor_fkey" FOREIGN KEY ("idGestor") REFERENCES "Gestor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "NotaMensalColaborador" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "mesAno" DATETIME NOT NULL,
    "notaMensal" REAL,
    "idColaborador" TEXT NOT NULL,
    CONSTRAINT "NotaMensalColaborador_idColaborador_fkey" FOREIGN KEY ("idColaborador") REFERENCES "Colaborador" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ColaboradorIndicador" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "mes_ano" DATETIME NOT NULL,
    "meta" INTEGER NOT NULL,
    "superMeta" INTEGER NOT NULL,
    "desafio" INTEGER NOT NULL,
    "peso" REAL NOT NULL,
    "resultado" REAL,
    "notaIndicador" REAL,
    "idColaborador" TEXT NOT NULL,
    "idIndicador" TEXT NOT NULL,
    CONSTRAINT "ColaboradorIndicador_idColaborador_fkey" FOREIGN KEY ("idColaborador") REFERENCES "Colaborador" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ColaboradorIndicador_idIndicador_fkey" FOREIGN KEY ("idIndicador") REFERENCES "Indicador" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

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

-- CreateIndex
CREATE UNIQUE INDEX "Gestor_email_key" ON "Gestor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Colaborador_email_key" ON "Colaborador"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Colaborador_telefone_key" ON "Colaborador"("telefone");
