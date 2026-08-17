import {Table} from "@heroui/react";
import Image from "next/image";

export function ProductTable({products}) {
    console.log(products)
  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Team members" className="min-w-[600px]">
          <Table.Header>
            <Table.Column isRowHeader>Image</Table.Column>
            <Table.Column>Title</Table.Column>
            <Table.Column>Quantity</Table.Column>
            <Table.Column>Price</Table.Column>
          </Table.Header>
          <Table.Body>
            {
                products.map(product=><Table.Row key={product._id}>
                    <Table.Cell>
                        <Image height={50} width={50} className="object-cover h-10 w-10" src={product.image || "/placeholder.png"} alt={product.title}/>
                    </Table.Cell>
              <Table.Cell>{product.name}</Table.Cell>
              <Table.Cell>{product.quantity}</Table.Cell>
              <Table.Cell>{product.price}</Table.Cell>
              
            </Table.Row>)
            }
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}