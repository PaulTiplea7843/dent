"use client";

import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";

export function Form({ setOpen, method, id }) {
  const [formState, setFormState] = useState({
    nume: "",
    data: "",
    descriere: "",
    pacientId: 1, // craeate a select for choosing pacients
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
        const response = await fetch("/api/operatiuni", {
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
        const response = await fetch("/api/operatiuni", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ id, ...formState }),
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
      data: "",
      descriere: "",
      pacientId: 1,
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
            Descriere
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
        </div>
        <Button className="mt-6" fullWidth onClick={saveUser}>
          {method == "create" ? "Creeaza" : "Modifica"} Client
        </Button>
      </form>
    </Card>
  );
}
