"use client";

import { addProduct } from "@/lib/actions/product";
import { imageUpload } from "@/lib/imageUpload";
import {Envelope} from "@gravity-ui/icons";
import {Button, Input, Label, Modal, Surface, TextField} from "@heroui/react";

export function AddProductsModal() {
  const onSubmit = async(event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    const imageFile=await imageUpload(data.image);
    
const result=await addProduct({...data,image: imageFile});
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
                  <TextField className="w-full" name="quantity" type="number" variant="secondary">
                    <Label>Quantity</Label>
                    <Input placeholder="Enter product quantity" />
                  </TextField>
                  
                  <div className="flex flex-col gap-2">
  <label>Product Image</label>

  <input
    type="file"
    name="image"
    // accept="image"
  />
</div>
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