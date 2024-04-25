import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {Sidebar} from "../components/Sidebar";
import MessageForm from "../components/MessageForm";
import Navigation from "../components/Navigation";

export function Chat() {
    return (
        <><Navigation />
        <Container>
            <Row>
                <Col md={4}>
                    <Sidebar />
                </Col>
                <Col md={8}>
                    <MessageForm />
                </Col>
            </Row>
        </Container></>
    );
}

