import React from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";

export interface IAuthContainerProps {
    cardHeader: string;
    children: any;
}

const AuthContainer: React.FunctionComponent<IAuthContainerProps> = props => {
    const { cardHeader, children } = props;

    return (
        <Container>
            <Row>
                <Col
                    xs={{ size: 10, offset: 1 }}
                    sm={{ size: 8, offset: 2 }}
                    lg={{ size: 6, offset: 3 }}
                    xl={{ size: 4, offset: 4 }}
                >
                    <Card className="mt-5">
                        <CardHeader className="bg-primary text-white">
                            {cardHeader}
                        </CardHeader>
                        <CardBody>
                            {children}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>  
    );
}

export default AuthContainer;