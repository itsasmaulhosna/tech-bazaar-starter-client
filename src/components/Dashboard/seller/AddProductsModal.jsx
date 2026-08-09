"use client";

import { addProduct } from "@/lib/actions/product";
import {Envelope} from "@gravity-ui/icons";
import {Button, Input, Label, Modal, Surface, TextField} from "@heroui/react";

export function AddProductsModal() {
  const onSubmit = async(event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
const result=await addProduct(data);
console.log(result);
  };
  return (
    <Modal>
      <Button variant="secondary">Add Product</Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>

                Add Product
              
              
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                  <TextField className="w-full" name="name" type="text" variant="secondary">
                    <Label>Title</Label>
                    <Input placeholder="Enter product title" />
                  </TextField>
                  <TextField className="w-full" name="description" type="text" variant="secondary">
                    <Label>Description</Label>
                    <Input placeholder="Enter product description" />
                  </TextField>
                  <TextField className="w-full" name="price" type="text" variant="secondary">
                    <Label>Price</Label>
                    <Input placeholder="Enter product price" />
                  </TextField>
                  <TextField className="w-full" name="quantity" variant="secondary">
                    <Label>Quantity</Label>
                    <Input placeholder="Enter product quantity" />
                  </TextField>
                              <Modal.Footer>
  <Button slot="close" variant="secondary">
    Cancel
  </Button>

  <Button type="submit">
    Add Product
  </Button>
</Modal.Footer>
                </form>
              </Surface>
            </Modal.Body>

          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}