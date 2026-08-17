import {Table} from "@heroui/react";

export function ProductTable({products}) {
    console.log(products)
  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Team members" className="min-w-[600px]">
          <Table.Header>
            <Table.Column isRowHeader>Image</Table.Column>
            <Table.Column>Price</Table.Column>
            <Table.Column>Quantity</Table.Column>
            <Table.Column>Title</Table.Column>
            
          </Table.Header>
          <Table.Body>
            {
                products.map(product=><Table.Row key={product._id}>
              <Table.Cell>{product.title}</Table.Cell>
              <Table.Cell>{product.price}</Table.Cell>
              <Table.Cell>{product.quantity}</Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>)
            }
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}