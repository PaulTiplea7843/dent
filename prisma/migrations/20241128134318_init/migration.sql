-- CreateTable
CREATE TABLE "Pacient" (
    "id" SERIAL NOT NULL,
    "nume" TEXT NOT NULL,
    "prenume" TEXT NOT NULL,
    "cnp" TEXT NOT NULL,
    "adresa" TEXT NOT NULL,
    "telefon" TEXT NOT NULL,
    "consimtamantDate" BOOLEAN NOT NULL,
    "anamneza" BOOLEAN NOT NULL,

    CONSTRAINT "Pacient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Operatiuni" (
    "id" SERIAL NOT NULL,
    "pacientId" INTEGER NOT NULL,
    "nume" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "descriere" TEXT NOT NULL,

    CONSTRAINT "Operatiuni_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Restante" (
    "id" SERIAL NOT NULL,
    "pacientId" INTEGER NOT NULL,
    "nume" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "descriere" TEXT NOT NULL,

    CONSTRAINT "Restante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fisiere" (
    "id" SERIAL NOT NULL,
    "pacientId" INTEGER NOT NULL,
    "fisier" TEXT NOT NULL,
    "nume" TEXT NOT NULL,

    CONSTRAINT "Fisiere_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Semnaturi" (
    "id" SERIAL NOT NULL,
    "pacientId" INTEGER NOT NULL,
    "fisier" TEXT NOT NULL,

    CONSTRAINT "Semnaturi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Programari" (
    "id" SERIAL NOT NULL,
    "pacientId" INTEGER NOT NULL,
    "ora" TIMESTAMP(3) NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "numePacient" TEXT NOT NULL,

    CONSTRAINT "Programari_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Operatiuni" ADD CONSTRAINT "Operatiuni_pacientId_fkey" FOREIGN KEY ("pacientId") REFERENCES "Pacient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restante" ADD CONSTRAINT "Restante_pacientId_fkey" FOREIGN KEY ("pacientId") REFERENCES "Pacient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fisiere" ADD CONSTRAINT "Fisiere_pacientId_fkey" FOREIGN KEY ("pacientId") REFERENCES "Pacient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Semnaturi" ADD CONSTRAINT "Semnaturi_pacientId_fkey" FOREIGN KEY ("pacientId") REFERENCES "Pacient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Programari" ADD CONSTRAINT "Programari_pacientId_fkey" FOREIGN KEY ("pacientId") REFERENCES "Pacient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
