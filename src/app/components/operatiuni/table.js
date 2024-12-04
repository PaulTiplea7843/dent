"use client";

import { useEffect, useState } from "react";
import { Button, Card, Typography } from "@material-tailwind/react";
import { CreateModalOperatiuni } from "./createModal";

const TABLE_HEAD = ["Nume", "Descriere", "Data", ""];

export function OperatiuniTable() {
  const [tableRows, setTableRows] = useState([]);

  useEffect(() => {
    fetch("/api/operatiuni")
      .then((response) => response.json())
      .then((data) => setTableRows(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const deletePacient = (id) => {
    fetch(`/api/operatiuni`, {
      method: "DELETE",
      body: JSON.stringify({ id: id }),
    })
      .then((response) => {
        if (response.status === 204) {
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
          {tableRows.map(({ nume, descriere, data }, index) => {
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
                    {descriere}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {data}
                  </Typography>
                </td>
                <td className={classes}>
                  <div className="flex- justify-between">
                    <CreateModalOperatiuni method="update" id={id} />
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
