import {Container,Row,Col} from "react-bootstrap"

const Footer=() =>{
    const currentYear=new Date().getFullYear()

return(
  <Footer>
  <Container>
       <Row>
          <Col classname='text-center py-3'>
            <p>ProShop &copy;{currentYear}</p>
           </Col>
        </Row>
     </Container>
    </Footer>
)


}
export default Footer