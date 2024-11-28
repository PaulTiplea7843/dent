"use client";

import { useEffect, useState } from "react";
import { Button, Card, Typography } from "@material-tailwind/react";
import { CreateModalPacient } from "./createModal";

const TABLE_HEAD = ["Nume", "Prenume", "Telefon", ""];

export function PacientTable() {
  const [tableRows, setTableRows] = useState([]);

  useEffect(() => {
    fetch("/api/pacient")
      .then((response) => response.json())
      .then((data) => setTableRows(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const deletePacient = (id) => {
    fetch(`/api/pacient/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setTableRows((prevRows) => prevRows.filter((row) => row.id !== id));
        } else {
          console.error("Error deleting pacient:", response.statusText);
        }
      })
      .catch((error) => console.error("Error deleting pacient:", error));
  };

  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableRows.map(({ nume, prenume, telefon, id }, index) => {
            const isLast = index === tableRows.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={index}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {nume}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {prenume}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {telefon}
                  </Typography>
                </td>
                <td className={classes}>
                  <div className="flex- justify-between">
                    <CreateModalPacient method="update" id={id} />
                    <Button
                      variant=""
                      size="md"
                      onClick={() => deletePacient(id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
