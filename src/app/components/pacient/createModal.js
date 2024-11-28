"use client";

import { React, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { FormPacient } from "./formPacient";

export function CreateModalPacient({ method, id }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        {method == "create" ? "Creeaza" : "Modifica"} Client
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogBody className="flex justify-center">
          <FormPacient setOpen={setOpen} method={method} id={id} />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
