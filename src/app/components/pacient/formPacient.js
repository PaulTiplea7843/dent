"use client";

import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";

export function FormPacient({ setOpen, method, id }) {
  const [formState, setFormState] = useState({
    nume: "",
    prenume: "",
    cnp: "",
    adresa: "",
    telefon: "",
    consimtamantDate: false,
    anamneza: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const saveUser = async () => {
    const { nume, prenume, cnp, adresa, telefon } = formState;
    if (!nume || !prenume || !cnp || !adresa || !telefon) {
      alert("Toate campurile trebuie completate!");
      return;
    }

    if (method == "create") {
      try {
        const response = await fetch("/api/pacient", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formState),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      try {
        const data = { id: id, formState, formState };
        const response = await fetch("/api/pacient", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    // Optionally, reset form state or show success message
    setFormState({
      nume: "",
      prenume: "",
      cnp: "",
      adresa: "",
      telefon: "",
      consimtamantDate: false,
      anamneza: false,
    });
    setOpen(false);
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        {method == "create" ? "Creeaza" : "Modifica"} Client
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        {method == "create" ? "Creeaza" : "Adauga"} un nou client in baza de
        date.
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Nume
          </Typography>
          <Input
            size="lg"
            placeholder="Nume"
            name="nume"
            value={formState.nume}
            onChange={handleInputChange}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Prenume
          </Typography>
          <Input
            size="lg"
            placeholder="Prenume"
            name="prenume"
            value={formState.prenume}
            onChange={handleInputChange}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            CNP
          </Typography>
          <Input
            size="lg"
            placeholder="CNP"
            name="cnp"
            value={formState.cnp}
            onChange={handleInputChange}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Adresa
          </Typography>
          <Input
            size="lg"
            placeholder="Adresa"
            name="adresa"
            value={formState.adresa}
            onChange={handleInputChange}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Telefon
          </Typography>
          <Input
            size="lg"
            placeholder="Telefon"
            name="telefon"
            value={formState.telefon}
            onChange={handleInputChange}
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <Button className="mt-6" fullWidth onClick={saveUser}>
          {method == "create" ? "Creeaza" : "Modifica"} Client
        </Button>
      </form>
    </Card>
  );
}
