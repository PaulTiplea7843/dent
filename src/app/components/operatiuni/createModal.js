"use client";

import { React, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Form } from "./form";

export function CreateModalOperatiuni({ method, id }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        {method == "create" ? "Creeaza" : "Modifica"} Operatiune
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogBody className="flex justify-center">
          <Form setOpen={setOpen} method={method} id={id} />
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
